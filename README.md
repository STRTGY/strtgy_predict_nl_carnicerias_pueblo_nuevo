# STRTGY | Mapa Interactivo - Análisis Pueblo Nuevo, NL

## Descripción

Visualización interactiva de análisis geoestadístico para la evaluación de viabilidad de ubicaciones de carnicerías en la zona de Pueblo Nuevo, Apodaca, Nuevo León.

## Características

### Capas Disponibles

1. **AGEBs Potenciales** - Coropleta con Score Final de aptitud
2. **Top Ubicaciones** - AGEBs con mayor potencial identificadas
3. **Carnicerías Existentes** - Competencia categorizada por tipo
4. **Plazas Comerciales** - Puntos de interés estratégicos
5. **Escuelas** - Infraestructura educativa
6. **Tiendas Departamentales** - Anclas comerciales
7. **Límites de Colonias** - Área objetivo del estudio
8. **Tráfico en Tiempo Real** - Flujo vehicular en vivo (Google Maps)

### Controles Interactivos

- **Selector de Métrica**: Cambia la variable de visualización en coropleta
  - Score Final (ponderación de 4 componentes)
  - Densidad Poblacional 2025
  - Índice NSE 2025

- **Filtro por Score**: Slider para filtrar AGEBs por score mínimo

- **Toggles de Capas**: Activar/desactivar visibilidad de cada capa

- **Popups**: Información detallada al hacer clic en elementos

### Popups de Información

#### AGEB
- Score Final y Clasificación
- Nivel Socioeconómico (NSE)
- Población y Densidad proyectadas a 2025
- Competencia cercana (500m y 1km)
- Intensidad competitiva

#### Carnicerías
- Nombre del establecimiento
- Tipo de actividad económica
- Código SCIAN
- Ubicación (colonia y CP)

## Tecnologías

- **MapLibre GL JS v3.6.2** - Motor de mapas (sin token requerido)
- **OpenStreetMap** - Tiles de mapa base
- **Vanilla JavaScript** - Lógica de aplicación
- **CSS3** - Estilos y diseño responsivo

## Estructura de Archivos

```
reports/strtgy_predict_nl_carnicerias/
├── index.html              # Página principal
├── assets/
│   ├── style.css          # Estilos globales
│   └── map.js             # Lógica del mapa y controles
└── data/
    ├── 01_Colonias_AreaObjetivo.geojson
    ├── 02_AGEB_PuebloNuevo_Potencial.geojson
    ├── 03_TopUbicaciones_AGEB_PuebloNuevo.geojson
    ├── 04_Carnicerias_Existentes_PuebloNuevo.geojson
    ├── 05_POI_Plazas_PuebloNuevo.geojson
    ├── 06_POI_Escuelas_PuebloNuevo.geojson
    ├── 07_POI_TiendasDepto_PuebloNuevo.geojson
    ├── 09_Demografia_PuebloNuevo.geojson
    └── IMPLICACIONES_PUEBLO_NUEVO.md
```

## Uso Local

### Opción 1: Servidor HTTP Simple (Recomendado)

```bash
# En el directorio del proyecto
cd reports/strtgy_predict_nl_carnicerias

# Python 3
python -m http.server 8000

# Node.js (con http-server instalado)
npx http-server -p 8000
```

Accede a: `http://localhost:8000`

### Opción 2: GitHub Pages

El sitio está diseñado para servirse directamente desde GitHub Pages sin configuración adicional.

URL típica: `https://<usuario>.github.io/<repositorio>/reports/strtgy_predict_nl_carnicerias/`

## Categorías de Carnicerías

El mapa diferencia establecimientos por código SCIAN:

| Color | Código SCIAN | Tipo de Establecimiento |
|-------|--------------|------------------------|
| 🔴 Rojo oscuro | 461121 | Comercio al por menor de carnes rojas |
| 🟠 Naranja | 461122 | Comercio al por menor de carne de aves |
| 🔵 Azul | 462111 | Supermercados |
| 🟣 Púrpura | 431110 | Comercio al por mayor de abarrotes |
| 🔴 Rojo | 431121 | Comercio al por mayor de carnes rojas |
| 🟠 Naranja oscuro | 431122 | Comercio al por mayor de carne de aves |
| 🟢 Verde | 311612 | Corte y empacado de carne |
| ⚪ Gris | Otros | Actividades relacionadas |

## Paleta de Colores

### Nivel NSE (AMAI - Colores Oficiales)

Cuando se selecciona "Nivel NSE (AMAI)", se utilizan los colores oficiales de la Asociación Mexicana de Agencias de Inteligencia de Mercado y Opinión:

| Nivel | Color | Descripción |
|-------|-------|-------------|
| **A/B** | 🔵 #1e40af (Azul oscuro) | Alto |
| **C+** | 🔵 #3b82f6 (Azul medio) | Medio Alto |
| **C** | 🔵 #60a5fa (Azul claro) | Medio |
| **C-** | 🔵 #93c5fd (Azul muy claro) | Medio Bajo |
| **D+** | 🟡 #fbbf24 (Amarillo) | Bajo Superior |
| **D** | 🟠 #f59e0b (Naranja) | Bajo |
| **E** | 🔴 #dc2626 (Rojo) | Muy Bajo |

### Métricas Numéricas (Quintiles)

Para Score Final, Densidad Poblacional e Índice NSE, los colores representan quintiles:

- **#fee5d9** - Quintil 1 (0-20%)
- **#fcae91** - Quintil 2 (20-40%)
- **#fb6a4a** - Quintil 3 (40-60%)
- **#de2d26** - Quintil 4 (60-80%)
- **#a50f15** - Quintil 5 (80-100%)

## Metodología

El análisis completo y la metodología están documentados en:
- [IMPLICACIONES_PUEBLO_NUEVO.md](data/IMPLICACIONES_PUEBLO_NUEVO.md)

### Score Final

Componentes ponderados:
- **35%** Nivel Socioeconómico (NSE)
- **25%** Competencia
- **20%** Accesibilidad
- **20%** Flujo peatonal/vehicular

## Rendimiento

- Carga de ~2.5 MB de datos GeoJSON
- Rendering fluido hasta zoom 18
- Hover y popups optimizados con `generateId`
- Sin dependencia de tokens o APIs externas

## Compatibilidad

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Móviles: iOS Safari 14+, Chrome Android 90+

## Soporte

**STRTGY** - Consultoría estratégica e inteligencia artificial aplicada

Documentación completa del proyecto en el repositorio principal.

---

© 2025 STRTGY | Todos los derechos reservados

