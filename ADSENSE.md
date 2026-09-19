# Preparación para Google AdSense — propietariostools.es

Este documento resume lo que ya está hecho y lo que falta para maximizar las probabilidades de aprobación de AdSense (septiembre 2026).

## Estado actual (listo sin ca-pub)

- [x] Páginas legales completas y enlazadas en footer de todas las páginas:
  - /aviso-legal/
  - /privacidad/
  - /cookies/
  - /contacto/
- [x] CMP propio + Google Consent Mode v2 implementado correctamente:
  - Consent defaults "denied" para ad_storage, analytics_storage, etc. **antes** de cargar gtag.js.
  - Banner con Rechazar / Configurar / Aceptar con igual prominencia.
  - Funciones `ptHasAdsConsent()` y `ptHasAnalyticsConsent()` disponibles para cargar anuncios solo con consentimiento.
- [x] Textos honestos sobre publicidad:
  - En Privacidad y Cookies se indica claramente “hoy no inserta anuncios” / “cuando esté activa”.
  - Eliminadas promesas de “sin publicidad invasiva” o “sin anuncios” en homepage y 322+ footers.
- [x] `ads.txt` creado en la raíz (placeholder listo para sustituir).
- [x] robots.txt permite todo + sitemap.xml presente.
- [x] Sitio móvil-first, sin login, sin paywall, sin contenido prohibido.
- [x] Calculadoras 100% en navegador (no recogen datos personales del usuario).
- [x] Contenido original: herramientas + clúster de 317 municipios con valor real para el usuario.
- [x] GA4 con ID G-YYNL8M40JY en todas las páginas.

## Lo que hay que hacer cuando tengas la cuenta de AdSense

1. Obtén tu ID de editor (`ca-pub-XXXXXXXXXXXXXXXX`).
2. Edita `ads.txt` en la raíz y reemplaza la línea placeholder:
   ```
   google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
   ```
3. Añade el script de verificación de AdSense en el `<head>` de **todas las páginas** (o al menos las principales). Ejemplo:

   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
           crossorigin="anonymous"></script>
   ```

   Recomendación: añádelo justo después del script de consent.js y antes de gtag.js.

4. En el panel de AdSense:
   - Añade el sitio.
   - Verifica la propiedad (puedes usar el script anterior o subir ads.txt).
   - Pulsa “Solicitar revisión”.

5. Una vez aprobado (“Listo”), puedes empezar a insertar bloques o activar Auto ads **solo** cuando `ptHasAdsConsent()` devuelva true.

## Riesgos comunes de rechazo y cómo los tenemos cubiertos

| Riesgo                              | Estado en este sitio                          | Acción |
|-------------------------------------|-----------------------------------------------|--------|
| Falta de políticas legales          | OK — 4 páginas completas                      | Mantener |
| Consentimiento RGPD / LSSI defectuoso | OK — CMP + Consent Mode v2 antes de gtag     | No tocar |
| Promesas de “sin publicidad”        | Eliminadas                                    | Revisar si se añade nuevo copy |
| Contenido thin o duplicado          | Las páginas de municipio son intencionadas y aportan valor | — |
| Email de contacto no funcional      | Actualmente usa alias Duck (`props-dance-relax@duck.com`) | Idealmente configurar reenvío real en el dominio |
| Identificación LSSI incompleta      | Aviso legal aún dice “se facilitan a quien los solicite” | Completar nombre/NIF/domicilio (o dirección profesional) antes o después de la revisión |
| Bloqueo de Googlebot                | robots.txt permite todo                       | OK |
| Falta de ads.txt                    | Creado (placeholder)                          | Actualizar con tu pub-ID |
| Anuncios de otras redes agresivos   | Ninguno actualmente                           | No añadir antes de aprobación |

## Recomendaciones antes de solicitar revisión

- Configura un buzón real (aunque sea reenvío) en `hola@propietariostools.es` o similar. Un alias de Duck funciona para privacidad, pero un canal directo es mejor para LSSI y para AdSense.
- Actualiza el apartado “Datos identificativos” del aviso legal con nombre + NIF + domicilio (o dirección de oficina virtual/gestoría) si es posible.
- Refresca las fechas de `lastmod` de las páginas principales en sitemap.xml (ya están en 2026-09-18 las legales).
- Asegúrate de que el sitio esté indexado en Search Console.

## Dónde insertar anuncios una vez aprobado (sugerencia)

Cargar anuncios **solo** con consentimiento de publicidad usando:

```js
if (window.ptHasAdsConsent && window.ptHasAdsConsent()) {
  // insertar adsbygoogle o cargar Auto ads aquí
}
```

Lugares recomendados (no invasivos):
- Debajo de los resultados de las calculadoras (después de la carta de renta).
- En los hubs de CCAA (debajo de la lista de municipios).
- En páginas de municipio (al final, después del contenido útil).
- Evitar intersticiales, overlays o anuncios que interrumpan el uso de las herramientas.

## Contacto

Si tienes dudas durante el proceso de revisión, usa el correo que figura en /contacto/.

Última actualización de este documento: 2026-09-18
