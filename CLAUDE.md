# CLAUDE.md — propietariostools.es

Contexto persistente para Claude Code en este repositorio. Léelo antes de tocar cualquier archivo.

## Qué es esto

Sitio estático de herramientas gratuitas para propietarios en España. Modelo de coste cero: GitHub Pages, sin backend, monetizado vía AdSense/afiliación. Dos herramientas + un clúster de SEO programático:

- `/zona-tensionada/` — verificador de zona tensionada + calculadora de subida máxima IRAV
- `/reduccion-irpf-alquiler/` — wizard de reducción IRPF (50/60/70/90%) según Ley 12/2023
- Clúster programático: 317+ páginas de municipio + 5 hubs de CCAA (Cataluña, País Vasco, Navarra, Galicia, Asturias)

## Stack

- HTML/JS/CSS puro, sin frameworks, sin backend
- Hosting: GitHub Pages
- GA4: `G-YYNL8M40JY` — debe estar en TODAS las páginas, incluidas las nuevas
- Search Console verificado por dominio (no por prefijo de URL)

## Estructura de archivos

```
/index.html                              — homepage
/zona-tensionada/index.html              — herramienta principal (verificador + calculadora IRAV)
/zona-tensionada/{municipio-slug}/       — páginas individuales de municipio
/zona-tensionada/{ccaa-slug}/            — hubs: cataluna, pais-vasco, navarra, galicia, asturias
/reduccion-irpf-alquiler/index.html      — wizard de reducción IRPF
/assets/zona-tensionada-shared.css       — estilos compartidos del clúster
/assets/zona-tensionada-shared.js        — dataset MUNICIPIOS + objeto IRAV + lógica de cálculo
/sitemap.xml
/robots.txt
/CNAME
```

**Por qué CSS/JS están extraídos a `/assets/`:** con 300+ páginas de municipio, repetir CSS/JS inline en cada una hace el mantenimiento inviable. Cuando cambie el IRAV mensualmente o se añada un municipio, se edita SOLO `assets/zona-tensionada-shared.js` — nunca las páginas individuales una por una.

## Datos que requieren mantenimiento periódico

### IRAV — mensual
- Vive en el objeto `IRAV` dentro de `assets/zona-tensionada-shared.js`
- El INE lo publica sobre el día 12-15 de cada mes, referido al mes anterior
- Buscar "IRAV [mes] 2026 INE publicado" cada vez que toque revisar
- Si un mes no tiene valor publicado todavía, el código debe mostrar el último disponible **con aviso explícito al usuario** — nunca un fallback numérico silencioso (esto fue un bug real: el código tenía `|| 2.47` como fallback silencioso que quedó obsoleto)
- Actualizar `IRAV_ULTIMO_MES_DISPONIBLE` tras cada actualización

### Municipios en zona tensionada — trimestral (resoluciones BOE ~enero/abril/julio/octubre)
- Viven en el array `MUNICIPIOS` dentro de `assets/zona-tensionada-shared.js`
- Fuente oficial: mivau.gob.es/vivienda/alquila-bien-es-tu-derecho/serpavi/consultar-zonas-de-mercado-residencial-tensionado
- Buscar "nuevos municipios zona tensionada [trimestre] 2026 MIVAU resolución BOE" en cada revisión
- Al añadir municipios: generar página individual + actualizar hub de su CCAA + actualizar `sitemap.xml` + **actualizar cualquier mención del conteo total en todo el sitio** ("317 municipios", "cinco comunidades autónomas", tarjetas de la homepage, FAQs) — no solo en la página nueva
- Si aparece una CCAA nueva (pasó con Asturias en julio 2026): crear su hub y añadirla a la sección "Explora por comunidad autónoma" en `index.html` y `zona-tensionada/index.html`
- Algunas declaraciones son **parciales** (solo un barrio/núcleo/distrito, no el municipio completo) — anotarlo siempre en el campo `nota`, nunca asumir que aplica al municipio entero. Casos actuales: Galdakao (Distrito 2), Vitoria-Gasteiz (excepto zona rural), Gijón (barrios La Arena y Cimadevilla), Avilés (barrio La Magdalena)

### IPREM — anual, o cuando cambien los Presupuestos Generales del Estado
- Vigente: 600€/mes, 7.200€/año (12 pagas), 8.400€/año (14 pagas) — congelado desde 2021
- Verificar cada enero por si hay nuevos PGE

## Precisión legal — lección aprendida (agosto 2026)

La lógica del wizard de reducción IRPF (tramo 70%) originalmente confundía "inquilino en situación de vulnerabilidad" (criterio inventado, con umbral de IPREM inventado) con el criterio real de la AEAT: **vivienda arrendada a administración pública, entidad sin ánimo de lucro, o programa público de vivienda con renta limitada** — no es un atributo del inquilino individual.

**Regla para el futuro:** cualquier criterio legal o fiscal en este sitio se verifica contra la fuente primaria (BOE, sede.agenciatributaria.gob.es) antes de implementarse o modificarse. Nunca inferir de resúmenes de terceros sin contrastar cuando el resultado es una cifra que el usuario puede usar en su declaración de la renta.

## Convenciones de datos

**Slugs de municipio:** minúsculas, sin tildes/diacríticos, espacios → guiones. Nombres con "/" (ej. "Donostia/San Sebastián") usan solo la primera parte. Verificar siempre que no haya colisión antes de generar una página nueva.

**Provincia (`p`) vs. CCAA (`c`):** son campos distintos, no confundir. Los 271 municipios de Cataluña necesitan su provincia real (Barcelona/Girona/Tarragona/Lleida) en el campo `p` — nunca "Cataluña". Esto ya causó un bug real (los 271 tenían `p:"Cataluña"` tras una reconstrucción del dataset).

## Diseño

- Tipografía: Space Grotesk (headers) + Inter (body)
- Paleta: navy `#1E3A5F`, amber `#E8A020` (acento), verde `#0F7A44` (resultados positivos)
- Todos los botones `type="button"` — evitar submit accidental
- Mobile-first, resultado visible sin scroll, sin registro obligatorio para el resultado básico
- Diseño distintivo, no genérico ni skeuomórfico

## Flujo de trabajo

- **Reportar el diff antes de hacer push** — el usuario confirma manualmente, siempre
- No tocar slugs, URLs ni `sitemap.xml` existentes salvo instrucción explícita
- No usar fallbacks numéricos silenciosos en datos que cambian con el tiempo — avisar explícitamente cuando un dato no esté disponible
- Verificar sintaxis JS (`node --check`) antes de dar por bueno cualquier cambio en `assets/zona-tensionada-shared.js`
- Contar registros del array `MUNICIPIOS` tras cualquier cambio y compararlo con el total esperado
- Buscadores con autocompletado (inputs JS) son invisibles para Googlebot — cualquier ruta de descubrimiento hacia contenido nuevo necesita `<a href>` reales en el HTML estático, nunca solo interacción JS

## Dominios hermanos (mismo portfolio, repos separados)

- `calculadoracomplemento.es` — calculadora de complemento de brecha de género (pensiones)
- `trabajadorestools.es` — cluster de herramientas laborales (horas extra; próximamente cuota de autónomos e indemnización por despido)

No mezclar contenido de audiencias distintas en este repo — la coherencia temática es la que sostiene la autoridad SEO del dominio.