/* CMP propio + Google Consent Mode v2.
   Debe cargarse de forma síncrona ANTES de gtag.js.
   Defaults: analytics y publicidad denegados hasta elección del usuario. */
(function () {
  var GA_ID = 'G-YYNL8M40JY';
  var COOKIE = 'pt_consent';
  var DAYS = 180;
  var VERSION = 1;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  function denied() {
    return {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied'
    };
  }

  function toGtag(c) {
    var ads = c.ads ? 'granted' : 'denied';
    return {
      ad_storage: ads,
      ad_user_data: ads,
      ad_personalization: ads,
      analytics_storage: c.analytics ? 'granted' : 'denied'
    };
  }

  function readConsent() {
    var m = document.cookie.match(/(?:^|; )pt_consent=([^;]*)/);
    if (!m) return null;
    try {
      var p = decodeURIComponent(m[1]).split('|');
      var o = { v: 0, analytics: false, ads: false };
      p.forEach(function (part) {
        var kv = part.split('.');
        if (kv[0] === 'v') o.v = +kv[1];
        if (kv[0] === 'a') o.analytics = kv[1] === '1';
        if (kv[0] === 'p') o.ads = kv[1] === '1';
      });
      if (o.v !== VERSION) return null;
      return o;
    } catch (e) {
      return null;
    }
  }

  function writeConsent(c) {
    var val = 'v.' + VERSION + '|a.' + (c.analytics ? '1' : '0') + '|p.' + (c.ads ? '1' : '0');
    var exp = new Date(Date.now() + DAYS * 864e5).toUTCString();
    document.cookie = COOKIE + '=' + encodeURIComponent(val) + '; path=/; expires=' + exp + '; SameSite=Lax';
  }

  function apply(c) {
    window.gtag('consent', 'update', toGtag(c));
  }

  var stored = readConsent();
  if (stored) apply(stored);

  function css() {
    return [
      '.pt-cmp{position:fixed;z-index:9999;left:0;right:0;bottom:0;background:#1E3A5F;color:#fff;padding:1.1rem 1.25rem 1.25rem;box-shadow:0 -8px 32px rgba(15,23,42,.28);font-family:Inter,system-ui,sans-serif}',
      '.pt-cmp-inner{max-width:920px;margin:0 auto}',
      '.pt-cmp-title{font-family:"Space Grotesk",sans-serif;font-weight:700;font-size:1.05rem;margin:0 0 .4rem;letter-spacing:-.02em}',
      '.pt-cmp-desc{font-size:.84rem;line-height:1.55;color:rgba(255,255,255,.78);margin:0 0 1rem}',
      '.pt-cmp-desc a{color:#E8A020}',
      '.pt-cmp-actions{display:flex;flex-wrap:wrap;gap:.55rem}',
      '.pt-cmp-btn{font-family:"Space Grotesk",sans-serif;font-weight:600;font-size:.88rem;padding:.65rem 1.1rem;border-radius:8px;cursor:pointer;border:1.5px solid transparent;flex:1;min-width:140px}',
      '.pt-cmp-reject{background:transparent;color:#fff;border-color:rgba(255,255,255,.55)}',
      '.pt-cmp-reject:hover{background:rgba(255,255,255,.08)}',
      '.pt-cmp-prefs{background:transparent;color:rgba(255,255,255,.9);border-color:rgba(255,255,255,.25)}',
      '.pt-cmp-accept{background:#E8A020;color:#152B47;border-color:#E8A020}',
      '.pt-cmp-accept:hover{filter:brightness(1.05)}',
      '.pt-cmp-overlay{position:fixed;z-index:10000;inset:0;background:rgba(15,23,42,.45)}',
      '.pt-cmp-panel{position:fixed;z-index:10001;left:50%;top:50%;transform:translate(-50%,-50%);width:min(520px,calc(100% - 2rem));max-height:calc(100vh - 2rem);overflow:auto;background:#fff;color:#0F172A;border-radius:12px;padding:1.4rem 1.35rem 1.25rem;font-family:Inter,system-ui,sans-serif;box-shadow:0 16px 50px rgba(15,23,42,.28)}',
      '.pt-cmp-panel h2{font-family:"Space Grotesk",sans-serif;font-size:1.15rem;margin:0 0 .35rem}',
      '.pt-cmp-panel .pt-sub{font-size:.84rem;color:#64748B;margin:0 0 1rem;line-height:1.5}',
      '.pt-cmp-row{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;padding:.85rem 0;border-top:1px solid #E2E0D8}',
      '.pt-cmp-row p{margin:.15rem 0 0;font-size:.8rem;color:#64748B;line-height:1.45}',
      '.pt-cmp-row strong{font-size:.9rem}',
      '.pt-cmp-toggle{position:relative;width:40px;height:22px;flex-shrink:0}',
      '.pt-cmp-toggle input{opacity:0;width:0;height:0;position:absolute}',
      '.pt-cmp-toggle span{position:absolute;inset:0;background:#E2E0D8;border-radius:99px;cursor:pointer}',
      '.pt-cmp-toggle span:before{content:"";position:absolute;width:16px;height:16px;left:3px;top:3px;background:#fff;border-radius:50%;transition:transform .15s}',
      '.pt-cmp-toggle input:checked+span{background:#0F7A44}',
      '.pt-cmp-toggle input:checked+span:before{transform:translateX(18px)}',
      '.pt-cmp-toggle input:disabled+span{opacity:.7;cursor:default}',
      '.pt-cmp-panel .pt-cmp-actions{margin-top:1.1rem}',
      '.pt-cmp-panel .pt-cmp-reject{color:#1E3A5F;border-color:#1E3A5F}',
      '.pt-cmp-panel .pt-cmp-prefs{color:#1E3A5F;border-color:#E2E0D8}',
      'body.pt-cmp-open{padding-bottom:8rem}',
      '@media (max-width:560px){.pt-cmp-btn{min-width:0;flex:1 1 100%}}'
    ].join('');
  }

  function injectStyle() {
    if (document.getElementById('pt-cmp-css')) return;
    var s = document.createElement('style');
    s.id = 'pt-cmp-css';
    s.textContent = css();
    (document.head || document.documentElement).appendChild(s);
  }

  function save(c, close) {
    writeConsent(c);
    apply(c);
    if (close) hideAll();
  }

  function hideAll() {
    var b = document.getElementById('pt-cmp');
    var o = document.getElementById('pt-cmp-overlay');
    var p = document.getElementById('pt-cmp-panel');
    if (b) b.remove();
    if (o) o.remove();
    if (p) p.remove();
    document.body.classList.remove('pt-cmp-open');
  }

  function openPanel() {
    var banner = document.getElementById('pt-cmp');
    if (banner) banner.remove();
    document.body.classList.remove('pt-cmp-open');
    if (document.getElementById('pt-cmp-panel')) return;

    var overlay = document.createElement('div');
    overlay.id = 'pt-cmp-overlay';
    overlay.className = 'pt-cmp-overlay';
    overlay.addEventListener('click', function () {
      if (readConsent()) hideAll();
    });

    var current = readConsent() || { analytics: false, ads: false };
    var panel = document.createElement('div');
    panel.id = 'pt-cmp-panel';
    panel.className = 'pt-cmp-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-labelledby', 'pt-cmp-panel-title');
    panel.innerHTML =
      '<h2 id="pt-cmp-panel-title">Preferencias de cookies</h2>' +
      '<p class="pt-sub">Rechazar es tan fácil como aceptar. Las estrictamente necesarias no se pueden desactivar: solo recuerdan esta elección.</p>' +
      '<div class="pt-cmp-row"><div><strong>Necesarias</strong><p>Cookie <code>pt_consent</code>, 180 días. Guarda tu decisión. Sin ella el aviso reaparecería en cada visita.</p></div>' +
      '<label class="pt-cmp-toggle"><input type="checkbox" checked disabled><span></span></label></div>' +
      '<div class="pt-cmp-row"><div><strong>Analítica</strong><p>Google Analytics 4 (' + GA_ID + '). Medimos páginas vistas, no te identificamos. Solo se activan si las aceptas.</p></div>' +
      '<label class="pt-cmp-toggle"><input type="checkbox" id="pt-an"' + (current.analytics ? ' checked' : '') + '><span></span></label></div>' +
      '<div class="pt-cmp-row"><div><strong>Publicidad</strong><p>Google AdSense y medición de anuncios, cuando estén activos. Hoy el sitio no muestra anuncios; si los activamos, respetaremos esta elección.</p></div>' +
      '<label class="pt-cmp-toggle"><input type="checkbox" id="pt-ad"' + (current.ads ? ' checked' : '') + '><span></span></label></div>' +
      '<div class="pt-cmp-actions">' +
      '<button type="button" class="pt-cmp-btn pt-cmp-reject" id="pt-p-rej">Rechazar</button>' +
      '<button type="button" class="pt-cmp-btn pt-cmp-prefs" id="pt-p-save">Guardar</button>' +
      '<button type="button" class="pt-cmp-btn pt-cmp-accept" id="pt-p-ok">Aceptar todo</button>' +
      '</div>';

    document.body.appendChild(overlay);
    document.body.appendChild(panel);

    panel.querySelector('#pt-p-rej').addEventListener('click', function () {
      save({ analytics: false, ads: false }, true);
    });
    panel.querySelector('#pt-p-ok').addEventListener('click', function () {
      save({ analytics: true, ads: true }, true);
    });
    panel.querySelector('#pt-p-save').addEventListener('click', function () {
      save({
        analytics: panel.querySelector('#pt-an').checked,
        ads: panel.querySelector('#pt-ad').checked
      }, true);
    });
    panel.querySelector('#pt-p-rej').focus();
  }

  function openBanner() {
    if (document.getElementById('pt-cmp')) return;
    var bar = document.createElement('div');
    bar.id = 'pt-cmp';
    bar.className = 'pt-cmp';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-labelledby', 'pt-cmp-title');
    bar.setAttribute('aria-describedby', 'pt-cmp-desc');
    bar.innerHTML =
      '<div class="pt-cmp-inner">' +
      '<p class="pt-cmp-title" id="pt-cmp-title">Cookies en propietariostools.es</p>' +
      '<p class="pt-cmp-desc" id="pt-cmp-desc">Usamos una cookie propia para recordar tu elección. Google Analytics y la publicidad (si la activamos) solo se encienden si las aceptas. ' +
      '<a href="/cookies/">Política de cookies</a> · <a href="/privacidad/">Privacidad</a>.</p>' +
      '<div class="pt-cmp-actions">' +
      '<button type="button" class="pt-cmp-btn pt-cmp-reject" id="pt-b-rej">Rechazar</button>' +
      '<button type="button" class="pt-cmp-btn pt-cmp-prefs" id="pt-b-cfg">Configurar</button>' +
      '<button type="button" class="pt-cmp-btn pt-cmp-accept" id="pt-b-ok">Aceptar</button>' +
      '</div></div>';
    document.body.appendChild(bar);
    document.body.classList.add('pt-cmp-open');
    bar.querySelector('#pt-b-rej').addEventListener('click', function () {
      save({ analytics: false, ads: false }, true);
    });
    bar.querySelector('#pt-b-ok').addEventListener('click', function () {
      save({ analytics: true, ads: true }, true);
    });
    bar.querySelector('#pt-b-cfg').addEventListener('click', openPanel);
  }

  function ensureFooterLinks() {
    var links = [
      ['/aviso-legal/', 'Aviso legal'],
      ['/privacidad/', 'Privacidad'],
      ['/cookies/', 'Cookies'],
      ['/contacto/', 'Contacto']
    ];
    document.querySelectorAll('.footer-links').forEach(function (nav) {
      links.forEach(function (item) {
        if (!nav.querySelector('a[href="' + item[0] + '"]')) {
          var a = document.createElement('a');
          a.href = item[0];
          a.textContent = item[1];
          nav.appendChild(a);
        }
      });
    });
  }

  window.ptOpenConsent = function () {
    injectStyle();
    openPanel();
  };
  window.ptHasAdsConsent = function () {
    var c = readConsent();
    return !!(c && c.ads);
  };
  window.ptHasAnalyticsConsent = function () {
    var c = readConsent();
    return !!(c && c.analytics);
  };

  function boot() {
    injectStyle();
    ensureFooterLinks();
    if (!readConsent()) openBanner();
    document.querySelectorAll('[data-pt-consent]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        window.ptOpenConsent();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
