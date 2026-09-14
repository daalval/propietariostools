#!/usr/bin/env node
/**
 * Descarga el IRAV (tabla INE 72975) y actualiza assets/zona-tensionada-shared.js.
 *
 *   node scripts/update-irav.js
 *
 * No toca las páginas de municipio: el copy visible se hidrata desde el objeto IRAV.
 * Si no hay mes nuevo ni revisión de un valor, el archivo no cambia (exit 0).
 *
 * Fuente: https://servicios.ine.es/wstempus/js/ES/DATOS_TABLA/72975
 */

const fs = require('fs');
const path = require('path');

const INE_URL = 'https://servicios.ine.es/wstempus/js/ES/DATOS_TABLA/72975?nult=48';
const JS_PATH = path.join(__dirname, '..', 'assets', 'zona-tensionada-shared.js');
const MIN = 0;
const MAX = 15;

function pad2(n) {
  return String(n).padStart(2, '0');
}

function mesSiguiente(yyyyMm) {
  const [y, m] = yyyyMm.split('-').map(Number);
  return m === 12 ? `${y + 1}-01` : `${y}-${pad2(m + 1)}`;
}

function formatIravObject(map, unpublishedComment) {
  const keys = Object.keys(map).sort();
  const byYear = {};
  for (const k of keys) {
    (byYear[k.slice(0, 4)] ||= []).push(`"${k}": ${Number(map[k]).toFixed(2)}`);
  }
  const yearBlocks = Object.keys(byYear).sort().map(year => {
    const entries = byYear[year];
    const lines = [];
    for (let i = 0; i < entries.length; i += 4) {
      lines.push('  ' + entries.slice(i, i + 4).join(', '));
    }
    return lines.join(',\n');
  });
  return [
    'const IRAV = {',
    yearBlocks.join(',\n') + ',',
    `  ${unpublishedComment}`,
    '};',
  ].join('\n');
}

async function fetchIrav() {
  const res = await fetch(INE_URL, {
    headers: {
      'User-Agent': 'propietariostools.es IRAV updater (https://propietariostools.es/)',
      Accept: 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error(`INE API ${res.status} ${res.statusText}`);
  }
  const payload = await res.json();
  const series = payload.find(s => s.COD === 'IRAV1')
    || payload.find(s => /variaci[oó]n anual/i.test(s.Nombre || ''));
  if (!series || !Array.isArray(series.Data) || !series.Data.length) {
    throw new Error('La API del INE no devolvió la serie IRAV1 (variación anual)');
  }

  const map = {};
  for (const row of series.Data) {
    if (row.Secreto || row.Valor == null || !row.Anyo || !row.FK_Periodo) continue;
    const valor = Number(row.Valor);
    if (!Number.isFinite(valor) || valor < MIN || valor > MAX) {
      throw new Error(`Valor IRAV fuera de rango: ${row.Anyo}-${row.FK_Periodo} = ${row.Valor}`);
    }
    map[`${row.Anyo}-${pad2(row.FK_Periodo)}`] = valor;
  }
  const keys = Object.keys(map).sort();
  if (!keys.length) throw new Error('Ningún dato IRAV usable en la respuesta del INE');
  return { map, last: keys[keys.length - 1] };
}

function patchFile(src, map, last) {
  const today = new Date().toISOString().slice(0, 10);
  const unpublished = `// ${mesSiguiente(last)}: aún no publicado por el INE a ${today}.`;
  const nextObj = formatIravObject(map, unpublished);

  if (!/const IRAV = \{[\s\S]*?\n\};/.test(src)) {
    throw new Error('No se encontró el objeto IRAV en zona-tensionada-shared.js');
  }
  if (!/const IRAV_ULTIMO_MES_DISPONIBLE = "[0-9]{4}-[0-9]{2}";/.test(src)) {
    throw new Error('No se encontró IRAV_ULTIMO_MES_DISPONIBLE');
  }

  let out = src.replace(/const IRAV = \{[\s\S]*?\n\};/, nextObj);
  out = out.replace(
    /const IRAV_ULTIMO_MES_DISPONIBLE = "[0-9]{4}-[0-9]{2}";/,
    `const IRAV_ULTIMO_MES_DISPONIBLE = "${last}";`
  );
  return out;
}

async function main() {
  const { map, last } = await fetchIrav();
  const src = fs.readFileSync(JS_PATH, 'utf8');
  const next = patchFile(src, map, last);

  if (next === src) {
    console.log(`IRAV al día. Último mes: ${last} (${Number(map[last]).toFixed(2)}%). Sin cambios.`);
    return;
  }

  fs.writeFileSync(JS_PATH, next);
  console.log(`IRAV actualizado. Último mes: ${last} (${Number(map[last]).toFixed(2).replace('.', ',')}%). Meses: ${Object.keys(map).length}.`);
}

main().catch(err => {
  console.error(err.message || err);
  process.exit(1);
});
