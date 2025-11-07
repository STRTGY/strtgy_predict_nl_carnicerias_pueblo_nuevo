# Guía de Despliegue - GitHub Pages

## Configuración de GitHub Pages

### Paso 1: Habilitar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Click en **Settings** (⚙️)
3. En el menú lateral, selecciona **Pages**
4. En "Source", selecciona:
   - Branch: `main` (o tu rama principal)
   - Folder: `/ (root)`
5. Click en **Save**

### Paso 2: Verificar la URL

GitHub Pages generará una URL como:
```
https://<tu-usuario>.github.io/<nombre-repo>/reports/strtgy_predict_nl_carnicerias/
```

El sitio estará disponible en unos minutos.

## Verificación Local (Pre-Deploy)

### Opción 1: Python HTTP Server

```bash
cd reports/strtgy_predict_nl_carnicerias
python -m http.server 8000
```

Accede a: `http://localhost:8000`

### Opción 2: Node.js http-server

```bash
cd reports/strtgy_predict_nl_carnicerias
npx http-server -p 8000 --cors
```

Accede a: `http://localhost:8000`

### Opción 3: VS Code Live Server

1. Instala la extensión "Live Server"
2. Right-click en `index.html`
3. Selecciona "Open with Live Server"

## Checklist Pre-Deploy

- [ ] Todos los archivos GeoJSON están en `data/`
- [ ] Las rutas en `map.js` usan rutas relativas (`./data/...`)
- [ ] El archivo `.nojekyll` está presente (evita procesamiento Jekyll)
- [ ] Verificado localmente sin errores de CORS
- [ ] Los popups muestran información correcta
- [ ] Todos los toggles de capas funcionan
- [ ] El selector de métrica actualiza correctamente la coropleta
- [ ] La leyenda se actualiza dinámicamente

## Troubleshooting

### Error: "Failed to load resource" (404)

**Causa**: Rutas incorrectas en producción

**Solución**: Verificar que las rutas en `map.js` sean relativas:
```javascript
dataPath: './data/'  // ✓ Correcto
dataPath: '/data/'   // ✗ Fallará en subdirectorios
```

### Error: CORS policy

**Causa**: Intentando abrir `index.html` con `file://`

**Solución**: Usar servidor HTTP local (ver opciones arriba)

### Mapa no carga / pantalla en blanco

**Diagnóstico**:
1. Abre DevTools (F12)
2. Revisa la consola para errores
3. Verifica la pestaña Network que los GeoJSON se carguen

**Causas comunes**:
- Archivos GeoJSON faltantes
- JSON malformado (validar en jsonlint.com)
- Problema de CORS (ver arriba)

### Capas no se visualizan

**Verificar**:
1. Los checkboxes están activados
2. El zoom está en rango adecuado (12-15)
3. Los datos GeoJSON contienen features

## Optimizaciones Post-Deploy

### Comprimir GeoJSON (Opcional)

Si los archivos son muy grandes (>5 MB):

```bash
# Simplificar geometrías con mapshaper
npm install -g mapshaper

mapshaper data/02_AGEB_PuebloNuevo_Potencial.geojson \
  -simplify 10% \
  -o data/02_AGEB_PuebloNuevo_Potencial_simplified.geojson
```

Actualizar rutas en `map.js` si usas versiones simplificadas.

### Habilitar Caché

En GitHub Pages, los headers de caché son automáticos. Para servidores custom:

```nginx
# Nginx
location ~* \.(geojson|json)$ {
    expires 1d;
    add_header Cache-Control "public, immutable";
}
```

## Actualización de Datos

Para actualizar los datos geoespaciales:

1. Reemplaza los archivos `.geojson` en `data/`
2. Commit y push a GitHub
3. GitHub Pages se actualizará automáticamente (1-5 min)

**Importante**: Mantén la misma estructura de propiedades en los GeoJSON para que los popups funcionen correctamente.

## Monitoreo

### Google Analytics (Opcional)

Para trackear visitas, agrega antes de `</head>` en `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## Personalización de Dominio (Opcional)

Si quieres usar un dominio custom (ej: `mapa.strtgy.com`):

1. En GitHub Pages settings, ingresa tu dominio custom
2. Crea un registro CNAME en tu DNS apuntando a `<usuario>.github.io`
3. Espera propagación DNS (15 min - 24 hrs)

---

## URLs de Referencia

- **MapLibre GL JS Docs**: https://maplibre.org/maplibre-gl-js-docs/
- **GeoJSON Spec**: https://geojson.org/
- **GitHub Pages Docs**: https://docs.github.com/en/pages

## Contacto

Para soporte técnico o consultas sobre la implementación:

**STRTGY** - Inteligencia Geoestadística  
Documentación del proyecto disponible en el repositorio principal.

---

© 2025 STRTGY

