# 🚀 Quick Start - Mapa Interactivo Pueblo Nuevo

## Inicio Rápido (3 pasos)

### 1. Servidor Local

Abre una terminal en esta carpeta y ejecuta:

```bash
python -m http.server 8000
```

**O con Node.js:**

```bash
npx http-server -p 8000
```

### 2. Abre en el navegador

Navega a: **http://localhost:8000**

### 3. Explora

¡Listo! El mapa debería cargar en ~3 segundos.

---

## 🎯 Funciones Clave

### Cambiar Variable de Análisis
1. Panel izquierdo → **"Variable de análisis"**
2. Selecciona:
   - **Score Final** (recomendado para decisión)
   - **Nivel NSE (AMAI)** (segmentación socioeconómica)
   - Otras métricas disponibles

### Ver Nivel Socioeconómico (NSE)
1. Selector → **"Nivel NSE (AMAI)"**
2. Observa colores oficiales AMAI:
   - 🔵 Azul = Alto (A/B, C+, C)
   - 🟡 Amarillo/Naranja = Medio-Bajo (D+, D)
   - 🔴 Rojo = Bajo (E)

### Filtrar por Score
1. Desliza el **"Filtro Score Mínimo"**
2. Solo AGEBs con score ≥ X se mostrarán
3. Útil para ver solo ubicaciones "Excelente" o "Bueno"

### Ver Competencia
1. Activa **"Carnicerías Existentes"** (checkbox)
2. Click en cualquier punto rojo/naranja/azul
3. Popup muestra: nombre, tipo, ubicación

### Ver Tráfico en Tiempo Real
1. Activa **"Tráfico en Tiempo Real (Google)"**
2. Observa:
   - 🟢 Verde = Fluido
   - 🟠 Naranja = Moderado
   - 🔴 Rojo = Congestionado

### Identificar Mejores Ubicaciones
1. Activa **"Top Ubicaciones"** (ya activado por defecto)
2. Busca polígonos con **borde dorado grueso**
3. Estas son las 5 AGEBs con mayor potencial

---

## 📊 Interpretar el Mapa

### Colores de AGEBs (Score Final)
- **Rojo oscuro** (#a50f15) = Score más alto (>80)
- **Rojo medio** (#de2d26) = Score alto (60-80)
- **Naranja** (#fb6a4a) = Score medio (40-60)
- **Rosa claro** (#fcae91) = Score bajo (20-40)
- **Beige** (#fee5d9) = Score muy bajo (<20)

### Colores de Carnicerías
- 🔴 **Rojo** = Carnes rojas (competencia directa)
- 🟠 **Naranja** = Aves
- 🔵 **Azul** = Supermercados
- 🟣 **Púrpura** = Mayoristas

---

## 🔍 Casos de Uso

### Caso 1: Encontrar la mejor ubicación
1. Selecciona **"Score Final"**
2. Filtra score ≥ 70
3. Activa **"Top Ubicaciones"**
4. Click en AGEBs con borde dorado
5. Revisa popup: población, NSE, competencia

### Caso 2: Evaluar NSE del área
1. Selecciona **"Nivel NSE (AMAI)"**
2. Busca zonas azules (C+, A/B)
3. Estas son áreas con mayor poder adquisitivo

### Caso 3: Análisis de competencia
1. Activa **"Carnicerías Existentes"**
2. Desactiva otras capas POI (escuelas, plazas)
3. Identifica "huecos" sin cobertura
4. Click en AGEBs para ver "Carnicerías 500m/1km"

### Caso 4: Evaluar accesibilidad
1. Activa **"Red Vial"**
2. Activa **"Tráfico en Tiempo Real"**
3. Busca AGEBs cerca de vías principales
4. Evita zonas con tráfico rojo constante

---

## ⚠️ Troubleshooting

### El mapa no carga
- ✓ ¿Usaste servidor HTTP? (no `file://`)
- ✓ ¿Hay errores en consola? (F12 → Console)
- ✓ ¿Los archivos GeoJSON están en `data/`?

### Capas no aparecen
- ✓ Revisa que el checkbox esté activado
- ✓ Haz zoom in (algunas capas tienen minZoom)
- ✓ Verifica filtro de score (puede estar muy alto)

### Tráfico no se muestra
- ✓ Activa el checkbox "Tráfico en Tiempo Real"
- ✓ Requiere conexión a internet
- ✓ Puede tardar unos segundos en cargar

### Popups no muestran datos
- ✓ Click directamente sobre el polígono/punto
- ✓ Espera que cargue completamente (spinner)

---

## 📱 Uso en Móvil

1. Sirve desde laptop con:
   ```bash
   python -m http.server 8000 --bind 0.0.0.0
   ```

2. En móvil, navega a:
   ```
   http://[IP-de-tu-laptop]:8000
   ```

3. Panel de controles colapsa automáticamente

---

## 🔗 Más Información

- **Metodología completa**: Ver `data/IMPLICACIONES_PUEBLO_NUEVO.md`
- **Guía de despliegue**: Ver `DEPLOY.md`
- **README técnico**: Ver `README.md`
- **Test de datos**: Abre `test.html`

---

## 💡 Tips Avanzados

### Comparar métricas rápidamente
- Cambia el selector → la leyenda actualiza al instante
- No necesitas recargar

### Ver detalles de múltiples AGEBs
- Los popups permanecen hasta que hagas click afuera
- Abre uno, revisa, click en otro

### Encontrar AGEBs específicas
- Usa el popup que muestra `CVEGEO_1`
- Busca ese código en tus reportes externos

### Maximizar visualización
- Desactiva capas que no necesites
- Reduce ruido visual = mejor análisis

---

**¿Preguntas?** Consulta la documentación completa en `README.md`

**STRTGY** | Inteligencia Geoestadística Aplicada

