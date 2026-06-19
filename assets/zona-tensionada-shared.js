/* zona-tensionada-shared.js
   Shared data and calculator logic for municipality and CCAA hub pages.
   Edit this file monthly when INE publishes the new IRAV value.
*/

// ── MUNICIPIOS ZONA TENSIONADA ────────────────────────────────────────────────
// Fuente: Resoluciones MIVAU (BOE). Actualizado junio 2026.
const MUNICIPIOS = [
  // CATALUÑA — Resolución 14/03/2024 (131 municipios)
  ...["Abrera","Alella","Amposta","Arenys de Mar","Arenys de Munt","Argentona","Badalona","Badia del Vallès",
    "Balaguer","Banyoles","Barberà del Vallès","Barcelona","Berga","la Bisbal d'Empordà","Blanes","Cabrera de Mar",
    "Cabrils","Caldes de Montbui","Caldes d'Estrac","Calella","Calldetenes","Cambrils","Canet de Mar","la Canonja",
    "Canovelles","Cardedeu","Castellar del Vallès","Castellbisbal","Castelldefels","Cerdanyola del Vallès","Cervelló",
    "Cervera","Corbera de Llobregat","Cornellà de Llobregat","Cubelles","Esparreguera","Esplugues de Llobregat",
    "Falset","Figueres","les Franqueses del Vallès","la Garriga","Gavà","Girona","Granollers","Guissona",
    "l'Hospitalet de Llobregat","Igualada","la Llagosta","Lleida","Llinars del Vallès","Lloret de Mar","Malgrat de Mar",
    "Manlleu","Manresa","el Masnou","Matadepera","Mataró","Molins de Rei","Mollerussa","Mollet del Vallès",
    "Montcada i Reixac","Montgat","Montmeló","Montornès del Vallès","Móra la Nova","Olesa de Montserrat","Olot",
    "Palafolls","Palafrugell","Palamós","Palau-solità i Plegamans","el Papiol","Parets del Vallès","Pineda de Mar",
    "Polinyà","Porqueres","el Prat de Llobregat","Premià de Dalt","Premià de Mar","Puigcerdà","Reus","Ripoll",
    "Ripollet","la Roca del Vallès","Roquetes","Rubí","Sabadell","Salou","Salt","Sant Adrià de Besòs",
    "Sant Andreu de Llavaneres","Sant Boi de Llobregat","Sant Celoni","Sant Climent de Llobregat","Sant Cugat del Vallès",
    "Sant Esteve Sesrovires","Sant Feliu de Guíxols","Sant Feliu de Llobregat","Sant Fost de Campsentelles",
    "Sant Fruitós de Bages","Sant Joan Despí","Sant Just Desvern","Sant Pere de Ribes","Sant Pol de Mar",
    "Sant Quirze del Vallès","Sant Sadurní d'Anoia","Sant Vicenç de Montalt","Sant Vicenç dels Horts",
    "Santa Coloma de Cervelló","Santa Coloma de Farners","Santa Coloma de Gramenet","Santa Margarida de Montbui",
    "Santa Perpètua de Mogoda","Santa Susanna","Sarrià de Ter","la Seu d'Urgell","Sitges","Solsona","Sort","Tarragona",
    "Tàrrega","Teià","Terrassa","Tiana","Tona","Torelló","Torredembarra","Torrelles de Llobregat","Tortosa","Tremp",
    "Vallirana","Valls","el Vendrell","Vic","Viladecans","Vilafranca del Penedès","Vilanova del Camí",
    "Vilanova i la Geltrú","Vilassar de Dalt","Vilassar de Mar"
  ].map(n => ({ n, p:"Cataluña", c:"Cataluña", t:true, d:"2024-03" })),

  // CATALUÑA — Resolución 08/10/2024 (140 municipios)
  ...["Aiguafreda","Albinyana","Alcanar","Alcarràs","Alcover","l'Aldea","Almacelles","Alpicat","Altafulla",
    "l'Ametlla de Mar","l'Ametlla del Vallès","l'Ampolla","Anglès","l'Arboç","Arbúcies","Artés","Artesa de Segre",
    "Bagà","Begues","Begur","Bellpuig","Bellver de Cerdanya","Besalú","Bigues i Riells del Fai","la Bisbal del Penedès",
    "les Borges Blanques","Breda","Cadaqués","Calaf","Calafell","Caldes de Malavella","Calonge i Sant Antoni",
    "Canyelles","Cassà de la Selva","Castellet i la Gornal","Castellgalí","Castelló d'Empúries",
    "Castell d'Aro, Platja d'Aro i S'Agaró","Castellterçol","Celrà","Centelles","Creixell","Cunit","Deltebre","Dosrius",
    "l'Escala","l'Esquirol","Folgueroles","Fornells de la Selva","Gelida","Gironella","Hostalric","Linyola","Llançà",
    "Lliçà d'Amunt","Lliçà de Vall","Maçanet de la Selva","Masquefa","Moià","Monistrol de Montserrat","Montblanc",
    "Montbrió del Camp","Mont-roig del Camp","Móra d'Ebre","el Morell","Navàs","Òdena","Olèrdola",
    "Olesa de Bonesvalls","Olivella","Pallejà","la Palma de Cervelló","Pals","Peralada","Piera",
    "la Pobla de Montornès","el Pont de Suert","Ponts","Prats de Lluçanès","Puig-reig","la Ràpita",
    "Riells i Viabrea","Riudarenes","Riudoms","Roda de Berà","Roda de Ter","Roses","Sant Antoni de Vilamajor",
    "Sant Cebrià de Vallalta","Sant Esteve de Palautordera","Sant Feliu de Codines","Sant Hipòlit de Voltregà",
    "Sant Jaume dels Domenys","Sant Jaume d'Enveja","Sant Joan de Vilatorrada","Sant Julià de Ramis",
    "Sant Llorenç d'Hortons","Sant Llorenç Savall","Sant Martí Sarroca","Sant Pere de Riudebitlles",
    "Sant Pere de Torelló","Sant Pere de Vilamajor","Sant Pere Pescador","Sant Quirze de Besora","Santa Bàrbara",
    "Santa Coloma de Queralt","Santa Cristina d'Aro","Santa Eulàlia de Ronçana","Santa Maria de Palautordera",
    "Santa Oliva","Santpedor","la Selva del Camp","la Sénia","Sentmenat","Seva","Sils","Súria","Taradell",
    "Torrelles de Foix","Torroella de Montgrí","Tossa de Mar","Ulldecona","Vacarisses","Vallgorguina","Vidreres",
    "Vielha e Mijaran","Viladecavalls","Vilafant","Vilanova del Vallès","Vilobí d'Onyar","Vinyols i els Arcs"
  ].map(n => ({ n, p:"Cataluña", c:"Cataluña", t:true, d:"2024-10" })),

  // PAÍS VASCO — múltiples resoluciones 2025-2026
  { n:"Errenteria",             p:"Gipuzkoa", c:"País Vasco", t:true, d:"2025-01" },
  { n:"Lasarte-Oria",           p:"Gipuzkoa", c:"País Vasco", t:true, d:"2025-04" },
  { n:"Zumaia",                 p:"Gipuzkoa", c:"País Vasco", t:true, d:"2025-04" },
  { n:"Barakaldo",              p:"Bizkaia",  c:"País Vasco", t:true, d:"2025-04" },
  { n:"Irun",                   p:"Gipuzkoa", c:"País Vasco", t:true, d:"2025-04" },
  { n:"Galdakao",               p:"Bizkaia",  c:"País Vasco", t:true, d:"2025-07", nota:"Declarada solo en el Distrito 2 del municipio." },
  { n:"Donostia/San Sebastián", p:"Gipuzkoa", c:"País Vasco", t:true, d:"2025-07" },
  { n:"Astigarraga",            p:"Gipuzkoa", c:"País Vasco", t:true, d:"2025-10" },
  { n:"Bilbao",                 p:"Bizkaia",  c:"País Vasco", t:true, d:"2025-10" },
  { n:"Usurbil",                p:"Gipuzkoa", c:"País Vasco", t:true, d:"2025-10" },
  { n:"Vitoria-Gasteiz",        p:"Álava",    c:"País Vasco", t:true, d:"2025-10", nota:"Excepto la zona rural constituida por entidades locales menores no incluida en la trama urbana." },
  { n:"Hernani",                p:"Gipuzkoa", c:"País Vasco", t:true, d:"2026-02" },
  { n:"Lezo",                   p:"Gipuzkoa", c:"País Vasco", t:true, d:"2026-02" },
  { n:"Tolosa",                 p:"Gipuzkoa", c:"País Vasco", t:true, d:"2026-02" },
  { n:"Pasaia",                 p:"Gipuzkoa", c:"País Vasco", t:true, d:"2026-04" },
  { n:"Zestoa",                 p:"Gipuzkoa", c:"País Vasco", t:true, d:"2026-04" },
  { n:"Arrasate/Mondragón",     p:"Gipuzkoa", c:"País Vasco", t:true, d:"2026-04" },

  // NAVARRA — Resolución 28/07/2025 (21 municipios)
  ...["Pamplona/Iruña","Tudela","Valle de Egüés/Eguesibar","Burlada/Burlata","Barañáin/Barañain","Zizur Mayor",
    "Estella-Lizarra","Aranguren","Berriozar","Tafalla","Ansoáin/Antsoain","Villava/Atarrabia","Corella",
    "Valle de Elorz/Elortzibar","Cintruénigo","Baztan","Altsasu/Alsasua","Huarte/Uharte","Berrioplano/Berriobeiti",
    "San Adrián","Peralta/Azkoien"
  ].map(n => ({ n, p:"Navarra", c:"Navarra", t:true, d:"2025-07" })),

  // GALICIA — Resolución 28/07/2025
  { n:"A Coruña", p:"A Coruña", c:"Galicia", t:true, d:"2025-07" },
];

// ── PROVINCIA REAL PARA MUNICIPIOS CATALANES ──────────────────────────────────
// Corrige p:"Cataluña" → provincia real (Barcelona / Girona / Tarragona / Lleida).
const PROVINCIA_CATALUNYA = {
  // Barcelona (159)
  "Abrera":"Barcelona","Alella":"Barcelona","Arenys de Mar":"Barcelona","Arenys de Munt":"Barcelona",
  "Argentona":"Barcelona","Badalona":"Barcelona","Badia del Vallès":"Barcelona","Barberà del Vallès":"Barcelona",
  "Barcelona":"Barcelona","Berga":"Barcelona","Cabrera de Mar":"Barcelona","Cabrils":"Barcelona",
  "Caldes de Montbui":"Barcelona","Caldes d'Estrac":"Barcelona","Calella":"Barcelona","Calldetenes":"Barcelona",
  "Canet de Mar":"Barcelona","Canovelles":"Barcelona","Cardedeu":"Barcelona","Castellar del Vallès":"Barcelona",
  "Castellbisbal":"Barcelona","Castelldefels":"Barcelona","Cerdanyola del Vallès":"Barcelona","Cervelló":"Barcelona",
  "Corbera de Llobregat":"Barcelona","Cornellà de Llobregat":"Barcelona","Cubelles":"Barcelona",
  "Esparreguera":"Barcelona","Esplugues de Llobregat":"Barcelona","les Franqueses del Vallès":"Barcelona",
  "la Garriga":"Barcelona","Gavà":"Barcelona","Granollers":"Barcelona","l'Hospitalet de Llobregat":"Barcelona",
  "Igualada":"Barcelona","la Llagosta":"Barcelona","Llinars del Vallès":"Barcelona","Malgrat de Mar":"Barcelona",
  "Manlleu":"Barcelona","Manresa":"Barcelona","el Masnou":"Barcelona","Matadepera":"Barcelona","Mataró":"Barcelona",
  "Molins de Rei":"Barcelona","Mollet del Vallès":"Barcelona","Montcada i Reixac":"Barcelona","Montgat":"Barcelona",
  "Montmeló":"Barcelona","Montornès del Vallès":"Barcelona","Olesa de Montserrat":"Barcelona","Palafolls":"Barcelona",
  "Palau-solità i Plegamans":"Barcelona","el Papiol":"Barcelona","Parets del Vallès":"Barcelona",
  "Pineda de Mar":"Barcelona","Polinyà":"Barcelona","el Prat de Llobregat":"Barcelona","Premià de Dalt":"Barcelona",
  "Premià de Mar":"Barcelona","Ripollet":"Barcelona","la Roca del Vallès":"Barcelona","Rubí":"Barcelona",
  "Sabadell":"Barcelona","Sant Adrià de Besòs":"Barcelona","Sant Andreu de Llavaneres":"Barcelona",
  "Sant Boi de Llobregat":"Barcelona","Sant Celoni":"Barcelona","Sant Climent de Llobregat":"Barcelona",
  "Sant Cugat del Vallès":"Barcelona","Sant Esteve Sesrovires":"Barcelona","Sant Feliu de Llobregat":"Barcelona",
  "Sant Fost de Campsentelles":"Barcelona","Sant Fruitós de Bages":"Barcelona","Sant Joan Despí":"Barcelona",
  "Sant Just Desvern":"Barcelona","Sant Pere de Ribes":"Barcelona","Sant Pol de Mar":"Barcelona",
  "Sant Quirze del Vallès":"Barcelona","Sant Sadurní d'Anoia":"Barcelona","Sant Vicenç de Montalt":"Barcelona",
  "Sant Vicenç dels Horts":"Barcelona","Santa Coloma de Cervelló":"Barcelona","Santa Coloma de Gramenet":"Barcelona",
  "Santa Margarida de Montbui":"Barcelona","Santa Perpètua de Mogoda":"Barcelona","Santa Susanna":"Barcelona",
  "Sitges":"Barcelona","Teià":"Barcelona","Terrassa":"Barcelona","Tiana":"Barcelona","Tona":"Barcelona",
  "Torelló":"Barcelona","Torrelles de Llobregat":"Barcelona","Vallirana":"Barcelona","Vic":"Barcelona",
  "Viladecans":"Barcelona","Vilafranca del Penedès":"Barcelona","Vilanova del Camí":"Barcelona",
  "Vilanova i la Geltrú":"Barcelona","Vilassar de Dalt":"Barcelona","Vilassar de Mar":"Barcelona",
  "Aiguafreda":"Barcelona","l'Ametlla del Vallès":"Barcelona","Artés":"Barcelona","Bagà":"Barcelona",
  "Begues":"Barcelona","Bigues i Riells del Fai":"Barcelona","Calaf":"Barcelona","Canyelles":"Barcelona",
  "Castellet i la Gornal":"Barcelona","Castellgalí":"Barcelona","Castellterçol":"Barcelona","Centelles":"Barcelona",
  "Dosrius":"Barcelona","l'Esquirol":"Barcelona","Folgueroles":"Barcelona","Gelida":"Barcelona",
  "Gironella":"Barcelona","Lliçà d'Amunt":"Barcelona","Lliçà de Vall":"Barcelona","Masquefa":"Barcelona",
  "Moià":"Barcelona","Monistrol de Montserrat":"Barcelona","Navàs":"Barcelona","Òdena":"Barcelona",
  "Olèrdola":"Barcelona","Olesa de Bonesvalls":"Barcelona","Olivella":"Barcelona","Pallejà":"Barcelona",
  "la Palma de Cervelló":"Barcelona","Piera":"Barcelona","Prats de Lluçanès":"Barcelona","Puig-reig":"Barcelona",
  "Roda de Ter":"Barcelona","Sant Antoni de Vilamajor":"Barcelona","Sant Cebrià de Vallalta":"Barcelona",
  "Sant Esteve de Palautordera":"Barcelona","Sant Feliu de Codines":"Barcelona","Sant Hipòlit de Voltregà":"Barcelona",
  "Sant Joan de Vilatorrada":"Barcelona","Sant Llorenç d'Hortons":"Barcelona","Sant Llorenç Savall":"Barcelona",
  "Sant Martí Sarroca":"Barcelona","Sant Pere de Riudebitlles":"Barcelona","Sant Pere de Torelló":"Barcelona",
  "Sant Pere de Vilamajor":"Barcelona","Sant Quirze de Besora":"Barcelona","Santa Eulàlia de Ronçana":"Barcelona",
  "Santa Maria de Palautordera":"Barcelona","Santpedor":"Barcelona","Sentmenat":"Barcelona","Seva":"Barcelona",
  "Súria":"Barcelona","Taradell":"Barcelona","Torrelles de Foix":"Barcelona","Vacarisses":"Barcelona",
  "Vallgorguina":"Barcelona","Viladecavalls":"Barcelona","Vilanova del Vallès":"Barcelona",
  // Girona (47)
  "la Bisbal d'Empordà":"Girona","Blanes":"Girona","Banyoles":"Girona","Figueres":"Girona","Girona":"Girona",
  "Lloret de Mar":"Girona","Olot":"Girona","Palafrugell":"Girona","Palamós":"Girona","Porqueres":"Girona",
  "Puigcerdà":"Girona","Ripoll":"Girona","Salt":"Girona","Sant Feliu de Guíxols":"Girona",
  "Santa Coloma de Farners":"Girona","Sarrià de Ter":"Girona","Anglès":"Girona","Arbúcies":"Girona",
  "Begur":"Girona","Besalú":"Girona","Breda":"Girona","Cadaqués":"Girona","Caldes de Malavella":"Girona",
  "Calonge i Sant Antoni":"Girona","Cassà de la Selva":"Girona","Castelló d'Empúries":"Girona",
  "Castell d'Aro, Platja d'Aro i S'Agaró":"Girona","Celrà":"Girona","l'Escala":"Girona",
  "Fornells de la Selva":"Girona","Hostalric":"Girona","Llançà":"Girona","Maçanet de la Selva":"Girona",
  "Pals":"Girona","Peralada":"Girona","Riells i Viabrea":"Girona","Riudarenes":"Girona","Roses":"Girona",
  "Sant Julià de Ramis":"Girona","Sant Pere Pescador":"Girona","Santa Cristina d'Aro":"Girona","Sils":"Girona",
  "Torroella de Montgrí":"Girona","Tossa de Mar":"Girona","Vidreres":"Girona","Vilafant":"Girona","Vilobí d'Onyar":"Girona",
  // Tarragona (44)
  "Amposta":"Tarragona","Cambrils":"Tarragona","la Canonja":"Tarragona","Falset":"Tarragona",
  "Móra la Nova":"Tarragona","Reus":"Tarragona","Roquetes":"Tarragona","Salou":"Tarragona",
  "Tarragona":"Tarragona","Torredembarra":"Tarragona","Tortosa":"Tarragona","Valls":"Tarragona",
  "el Vendrell":"Tarragona","Albinyana":"Tarragona","Alcanar":"Tarragona","Alcover":"Tarragona",
  "l'Aldea":"Tarragona","Altafulla":"Tarragona","l'Ametlla de Mar":"Tarragona","l'Ampolla":"Tarragona",
  "l'Arboç":"Tarragona","la Bisbal del Penedès":"Tarragona","Calafell":"Tarragona","Creixell":"Tarragona",
  "Cunit":"Tarragona","Deltebre":"Tarragona","Montblanc":"Tarragona","Montbrió del Camp":"Tarragona",
  "Mont-roig del Camp":"Tarragona","Móra d'Ebre":"Tarragona","el Morell":"Tarragona",
  "la Pobla de Montornès":"Tarragona","la Ràpita":"Tarragona","Riudoms":"Tarragona","Roda de Berà":"Tarragona",
  "Sant Jaume dels Domenys":"Tarragona","Sant Jaume d'Enveja":"Tarragona","Santa Bàrbara":"Tarragona",
  "Santa Coloma de Queralt":"Tarragona","Santa Oliva":"Tarragona","la Selva del Camp":"Tarragona",
  "la Sénia":"Tarragona","Ulldecona":"Tarragona","Vinyols i els Arcs":"Tarragona",
  // Lleida (21)
  "Balaguer":"Lleida","Cervera":"Lleida","Guissona":"Lleida","Lleida":"Lleida","Mollerussa":"Lleida",
  "la Seu d'Urgell":"Lleida","Solsona":"Lleida","Sort":"Lleida","Tàrrega":"Lleida","Tremp":"Lleida",
  "Alcarràs":"Lleida","Almacelles":"Lleida","Alpicat":"Lleida","Artesa de Segre":"Lleida","Bellpuig":"Lleida",
  "Bellver de Cerdanya":"Lleida","les Borges Blanques":"Lleida","Linyola":"Lleida","el Pont de Suert":"Lleida",
  "Ponts":"Lleida","Vielha e Mijaran":"Lleida",
};
MUNICIPIOS.forEach(m => {
  if (m.c === 'Cataluña' && PROVINCIA_CATALUNYA[m.n]) m.p = PROVINCIA_CATALUNYA[m.n];
});

// ── IRAV — Valores mensuales publicados por el INE ────────────────────────────
// Actualizar cada mes cuando el INE publique el nuevo dato.
const IRAV = {
  "2026-01": 2.29, "2026-02": 2.29, "2026-03": 2.40,
  "2026-04": 2.40, "2026-05": 2.47, "2026-06": 2.47,
  "2026-07": 2.47, "2026-08": 2.47, "2026-09": 2.47,
  "2026-10": 2.47, "2026-11": 2.47, "2026-12": 2.47,
};
const IRAV_ACTUAL_MES = "mayo 2026";
const IPC_2026 = 3.2;

// ── UTILITY FUNCTIONS ─────────────────────────────────────────────────────────
function normalize(s) {
  return s.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[''']/g, "'");
}

function fmt(n) {
  return n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
}

// ── CALCULATOR INITIALIZER ────────────────────────────────────────────────────
// Call once per page to wire up the IRAV calculator.
// opts: { rentaId, tipoId, mesId, mesGroupId, btnId, resultId,
//         pctId, mesRefId, rentaDisplayId, subidaId, nuevaRentaId, difAnualId, notaId }
function initCalculadoraIRAV(opts) {
  const tipoContrato  = document.getElementById(opts.tipoId);
  const mesRenovacion = document.getElementById(opts.mesId);
  const mesGroup      = document.getElementById(opts.mesGroupId);

  tipoContrato.addEventListener('change', () => {
    mesGroup.style.display = tipoContrato.value === 'pre2023' ? 'none' : '';
  });

  document.getElementById(opts.btnId).addEventListener('click', () => {
    const renta = parseFloat(document.getElementById(opts.rentaId).value);
    if (!renta || renta <= 0) {
      alert('Introduce la renta mensual actual.');
      return;
    }

    const tipo = tipoContrato.value;
    const mes  = mesRenovacion.value;
    let indice, indiceLabel, nota;

    if (tipo === 'pre2023') {
      indice      = IPC_2026;
      indiceLabel = `IPC estimado 2026: ${indice}%`;
      nota        = 'Contrato anterior al 26/05/2023: se aplica el IPC como índice de referencia. El dato es orientativo; consulta el IPC del mes anterior a tu renovación en ine.es.';
    } else {
      const [year, month] = mes.split('-').map(Number);
      const prevMonth = month === 1
        ? `${year - 1}-12`
        : `${year}-${String(month - 1).padStart(2, '0')}`;
      indice = IRAV[prevMonth] || IRAV[mes] || 2.47;
      const prevLabel = new Date(prevMonth + '-01').toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
      indiceLabel = `IRAV ${prevLabel} (INE): ${indice}%`;
      nota = `El IRAV aplicable es el del mes anterior a la renovación (${prevLabel}). Desde el 29/04/2026 no existe tope extraordinario — se aplica el IRAV completo.`;
    }

    const subida     = renta * indice / 100;
    const nuevaRenta = renta + subida;
    const difAnual   = subida * 12;

    document.getElementById(opts.pctId).textContent          = indice.toFixed(2);
    document.getElementById(opts.mesRefId).textContent       = indiceLabel;
    document.getElementById(opts.rentaDisplayId).textContent = fmt(renta);
    document.getElementById(opts.subidaId).textContent       = '+' + fmt(subida) + '/mes';
    document.getElementById(opts.nuevaRentaId).textContent   = fmt(nuevaRenta);
    document.getElementById(opts.difAnualId).textContent     = '+' + fmt(difAnual) + '/año';
    document.getElementById(opts.notaId).textContent         = nota;

    const resultEl = document.getElementById(opts.resultId);
    resultEl.classList.add('visible');
    resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}
