// STRTGY | Mapa Interactivo - Pueblo Nuevo Carnicerías
// MapLibre GL JS without token requirement

// Configuration
const CONFIG = {
    center: [-100.165, 25.755],
    zoom: 12,
    minZoom: 10,
    maxZoom: 18,
    dataPath: './data/'
};

// Layer visibility state
const layerState = {
    top: true,
    carnicerias: true,
    plazas: true,
    escuelas: false,
    tiendas: false,
    colonias: true,
    trafico: false
};

// Current metric for choropleth
let currentMetric = 'Score_Final';
let geojsonData = {};
let hoveredStateId = null;

// Initialize map
const map = new maplibregl.Map({
    container: 'map',
    style: {
        version: 8,
        sources: {
            'osm-tiles': {
                type: 'raster',
                tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                tileSize: 256,
                attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            },
            'google-traffic': {
                type: 'raster',
                tiles: ['https://mt1.google.com/vt?lyrs=h@159000000,traffic|seconds_into_week:-1&style=3&x={x}&y={y}&z={z}'],
                tileSize: 256,
                attribution: '© Google Maps'
            }
        },
        layers: [
            {
                id: 'osm-layer',
                type: 'raster',
                source: 'osm-tiles',
                minzoom: 0,
                maxzoom: 22
            },
            {
                id: 'trafico-layer',
                type: 'raster',
                source: 'google-traffic',
                minzoom: 0,
                maxzoom: 22,
                layout: {
                    visibility: 'none'
                },
                paint: {
                    'raster-opacity': 0.7
                }
            }
        ],
        glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf'
    },
    center: CONFIG.center,
    zoom: CONFIG.zoom,
    minZoom: CONFIG.minZoom,
    maxZoom: CONFIG.maxZoom
});

// Add navigation controls
map.addControl(new maplibregl.NavigationControl(), 'top-right');
map.addControl(new maplibregl.ScaleControl(), 'bottom-right');

// Data loading and initialization
map.on('load', async () => {
    try {
        await Promise.all([
            loadGeoJSON('colonias', '01_Colonias_AreaObjetivo.geojson'),
            loadGeoJSON('ageb', '02_AGEB_PuebloNuevo_Potencial.geojson'),
            loadGeoJSON('top', '03_TopUbicaciones_AGEB_PuebloNuevo.geojson'),
            loadGeoJSON('carnicerias', '04_Carnicerias_Existentes_PuebloNuevo.geojson'),
            loadGeoJSON('plazas', '05_POI_Plazas_PuebloNuevo.geojson'),
            loadGeoJSON('escuelas', '06_POI_Escuelas_PuebloNuevo.geojson'),
            loadGeoJSON('tiendas', '07_POI_TiendasDepto_PuebloNuevo.geojson')
        ]);
        
        // Add layers in order
        addColoniasLayer();
        addAGEBLayers();
        addTopLocationsLayer();
        addPOILayers();
        addCarniceriasLayer();
        
        // Fit bounds to AOI
        const bbox = calculateBounds(geojsonData.ageb);
        if (bbox) {
            map.fitBounds(bbox, { padding: 50, duration: 1000 });
        }
        
        // Setup interactions
        setupHoverInteractions();
        setupPopups();
        
        // Initialize legend
        updateLegend();
        
        // Hide loading
        document.getElementById('loading').classList.add('hidden');
        
    } catch (error) {
        console.error('Error loading map data:', error);
        document.getElementById('loading').innerHTML = 
            '<p style="color: #e53e3e;">Error al cargar los datos. Por favor, recarga la página.</p>';
    }
});

// Load GeoJSON helper
async function loadGeoJSON(key, filename) {
    const response = await fetch(CONFIG.dataPath + filename);
    if (!response.ok) {
        throw new Error(`Failed to load ${filename}`);
    }
    const data = await response.json();
    geojsonData[key] = data;
    return data;
}

// Calculate bounds from GeoJSON
function calculateBounds(geojson) {
    if (!geojson || !geojson.features || geojson.features.length === 0) return null;
    
    let minLng = Infinity, minLat = Infinity;
    let maxLng = -Infinity, maxLat = -Infinity;
    
    geojson.features.forEach(feature => {
        const coords = feature.geometry.coordinates;
        
        function processCoordsArray(arr) {
            if (typeof arr[0] === 'number') {
                minLng = Math.min(minLng, arr[0]);
                maxLng = Math.max(maxLng, arr[0]);
                minLat = Math.min(minLat, arr[1]);
                maxLat = Math.max(maxLat, arr[1]);
            } else {
                arr.forEach(processCoordsArray);
            }
        }
        
        processCoordsArray(coords);
    });
    
    return [[minLng, minLat], [maxLng, maxLat]];
}

// Add Colonias layer (outline only)
function addColoniasLayer() {
    map.addSource('colonias', {
        type: 'geojson',
        data: geojsonData.colonias
    });
    
    map.addLayer({
        id: 'colonias-outline',
        type: 'line',
        source: 'colonias',
        paint: {
            'line-color': '#2d3748',
            'line-width': 2,
            'line-dasharray': [3, 2]
        },
        layout: {
            visibility: layerState.colonias ? 'visible' : 'none'
        }
    });
}

// Add AGEB layers (fill + outline + highlight)
function addAGEBLayers() {
    map.addSource('ageb', {
        type: 'geojson',
        data: geojsonData.ageb,
        generateId: true
    });
    
    // Fill layer with choropleth
    map.addLayer({
        id: 'ageb-fill',
        type: 'fill',
        source: 'ageb',
        paint: {
            'fill-color': getChoroplethExpression(currentMetric),
            'fill-opacity': 0.65
        }
    });
    
    // Outline layer
    map.addLayer({
        id: 'ageb-outline',
        type: 'line',
        source: 'ageb',
        paint: {
            'line-color': '#333',
            'line-width': 0.6
        }
    });
    
    // Highlight layer for hover
    map.addLayer({
        id: 'ageb-highlight',
        type: 'line',
        source: 'ageb',
        paint: {
            'line-color': '#000',
            'line-width': 3
        },
        filter: ['==', ['id'], '']
    });
}

// Add Top Locations layer
function addTopLocationsLayer() {
    map.addSource('top', {
        type: 'geojson',
        data: geojsonData.top
    });
    
    map.addLayer({
        id: 'top-fill',
        type: 'fill',
        source: 'top',
        paint: {
            'fill-color': '#fbbf24',
            'fill-opacity': 0.4
        },
        layout: {
            visibility: layerState.top ? 'visible' : 'none'
        }
    });
    
    map.addLayer({
        id: 'top-outline',
        type: 'line',
        source: 'top',
        paint: {
            'line-color': '#f59e0b',
            'line-width': 2.5
        },
        layout: {
            visibility: layerState.top ? 'visible' : 'none'
        }
    });
}

// Add Carnicerías layer with categorization
function addCarniceriasLayer() {
    map.addSource('carnicerias', {
        type: 'geojson',
        data: geojsonData.carnicerias
    });
    
    map.addLayer({
        id: 'carnicerias-points',
        type: 'circle',
        source: 'carnicerias',
        paint: {
            'circle-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                12, 4,
                15, 7
            ],
            'circle-color': [
                'match',
                ['get', 'codigo_act'],
                '461121', '#dc2626', // Carnes rojas
                '461122', '#ea580c', // Aves
                '462111', '#2563eb', // Supermercados
                '431110', '#7c3aed', // Mayoristas abarrotes
                '431121', '#b91c1c', // Mayoristas carnes
                '431122', '#c2410c', // Mayoristas aves
                '311612', '#65a30d', // Procesamiento
                '#6b7280' // Otros
            ],
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
        },
        layout: {
            visibility: layerState.carnicerias ? 'visible' : 'none'
        }
    });
}

// Add POI layers (Plazas, Escuelas, Tiendas)
function addPOILayers() {
    // Plazas
    map.addSource('plazas', {
        type: 'geojson',
        data: geojsonData.plazas
    });
    
    map.addLayer({
        id: 'plazas-points',
        type: 'circle',
        source: 'plazas',
        paint: {
            'circle-radius': 6,
            'circle-color': '#8b5cf6',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#fff'
        },
        layout: {
            visibility: layerState.plazas ? 'visible' : 'none'
        }
    });
    
    // Escuelas
    map.addSource('escuelas', {
        type: 'geojson',
        data: geojsonData.escuelas
    });
    
    map.addLayer({
        id: 'escuelas-points',
        type: 'circle',
        source: 'escuelas',
        paint: {
            'circle-radius': 5,
            'circle-color': '#10b981',
            'circle-stroke-width': 1.5,
            'circle-stroke-color': '#fff'
        },
        layout: {
            visibility: layerState.escuelas ? 'visible' : 'none'
        }
    });
    
    // Tiendas Departamentales
    map.addSource('tiendas', {
        type: 'geojson',
        data: geojsonData.tiendas
    });
    
    map.addLayer({
        id: 'tiendas-points',
        type: 'circle',
        source: 'tiendas',
        paint: {
            'circle-radius': 6,
            'circle-color': '#0891b2',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#fff'
        },
        layout: {
            visibility: layerState.tiendas ? 'visible' : 'none'
        }
    });
}

// AMAI NSE Official Colors
const NSE_COLORS_AMAI = {
    'A/B': '#1e40af',      // Azul - Alto
    'C+': '#059669',       // Verde intenso - Medio alto
    'C': '#10b981',        // Verde suave - Medio
    'C-': '#fbbf24',       // Verde palo / amarillo - Medio bajo
    'D+': '#f59e0b',       // Amarillo / Naranja - Bajo superior
    'D': '#ea580c',        // Naranja - Bajo
    'E': '#b91c1c'         // Rojo/marrón - Muy bajo
};

// Get choropleth expression based on metric
function getChoroplethExpression(metric) {
    // Special handling for NSE categorical data
    if (metric === 'Nivel_NSE') {
        return [
            'match',
            ['get', 'Nivel_NSE'],
            'A/B', NSE_COLORS_AMAI['A/B'],
            'C+', NSE_COLORS_AMAI['C+'],
            'C', NSE_COLORS_AMAI['C'],
            'C-', NSE_COLORS_AMAI['C-'],
            'D+', NSE_COLORS_AMAI['D+'],
            'D', NSE_COLORS_AMAI['D'],
            'E', NSE_COLORS_AMAI['E'],
            '#cccccc' // Default gray for unknown
        ];
    }
    
    // Numeric metrics use quantile breaks
    const values = geojsonData.ageb.features
        .map(f => f.properties[metric])
        .filter(v => v != null)
        .sort((a, b) => a - b);
    
    const breaks = [
        values[Math.floor(values.length * 0.2)],
        values[Math.floor(values.length * 0.4)],
        values[Math.floor(values.length * 0.6)],
        values[Math.floor(values.length * 0.8)]
    ];
    
    return [
        'step',
        ['get', metric],
        '#fee5d9',
        breaks[0], '#fcae91',
        breaks[1], '#fb6a4a',
        breaks[2], '#de2d26',
        breaks[3], '#a50f15'
    ];
}

// Setup hover interactions
function setupHoverInteractions() {
    map.on('mousemove', 'ageb-fill', (e) => {
        if (e.features.length > 0) {
            if (hoveredStateId !== null) {
                map.setFilter('ageb-highlight', ['==', ['id'], '']);
            }
            hoveredStateId = e.features[0].id;
            map.setFilter('ageb-highlight', ['==', ['id'], hoveredStateId]);
        }
        map.getCanvas().style.cursor = 'pointer';
    });
    
    map.on('mouseleave', 'ageb-fill', () => {
        if (hoveredStateId !== null) {
            map.setFilter('ageb-highlight', ['==', ['id'], '']);
        }
        hoveredStateId = null;
        map.getCanvas().style.cursor = '';
    });
}

// Setup popups
function setupPopups() {
    // AGEB popup
    map.on('click', 'ageb-fill', (e) => {
        const props = e.features[0].properties;
        
        const html = `
            <div class="popup-title">AGEB: ${props.CVEGEO_1 || 'N/A'}</div>
            <div class="popup-content">
                <div class="popup-row">
                    <span class="popup-row-label">Score Final:</span>
                    <span class="popup-row-value">${props.Score_Final?.toFixed(1) || 'N/A'}</span>
                </div>
                <div class="popup-row">
                    <span class="popup-row-label">Clasificación:</span>
                    <span class="popup-row-value">${props.Clasificacion || 'N/A'}</span>
                </div>
                <div class="popup-row">
                    <span class="popup-row-label">Nivel NSE:</span>
                    <span class="popup-row-value">${props.Nivel_NSE || 'N/A'}</span>
                </div>
                <div class="popup-row">
                    <span class="popup-row-label">Población 2025:</span>
                    <span class="popup-row-value">${props.Poblacion_Total_2025?.toLocaleString() || 'N/A'}</span>
                </div>
                <div class="popup-row">
                    <span class="popup-row-label">Densidad (hab/km²):</span>
                    <span class="popup-row-value">${props.Densidad_Pobl_2025?.toFixed(0).toLocaleString() || 'N/A'}</span>
                </div>
                <div class="popup-row">
                    <span class="popup-row-label">Carnicerías 500m:</span>
                    <span class="popup-row-value">${props.Carnicerias_500m || 0}</span>
                </div>
                <div class="popup-row">
                    <span class="popup-row-label">Carnicerías 1km:</span>
                    <span class="popup-row-value">${props.Carnicerias_1km || 0}</span>
                </div>
                <div class="popup-row">
                    <span class="popup-row-label">Intens. Competitiva:</span>
                    <span class="popup-row-value">${props.Intensidad_Competitiva?.toFixed(1) || 'N/A'}</span>
                </div>
            </div>
        `;
        
        new maplibregl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(html)
            .addTo(map);
    });
    
    // Carnicerías popup
    map.on('click', 'carnicerias-points', (e) => {
        const props = e.features[0].properties;
        
        const html = `
            <div class="popup-title">${props.nom_estab || 'Sin nombre'}</div>
            <div class="popup-content">
                <div class="popup-row">
                    <span class="popup-row-label">Actividad:</span>
                    <span class="popup-row-value" style="font-size: 0.75rem;">${props.nombre_act || 'N/A'}</span>
                </div>
                <div class="popup-row">
                    <span class="popup-row-label">Código:</span>
                    <span class="popup-row-value">${props.codigo_act || 'N/A'}</span>
                </div>
                <div class="popup-row">
                    <span class="popup-row-label">Colonia:</span>
                    <span class="popup-row-value">${props.NOM_ASEN || 'N/A'}</span>
                </div>
                <div class="popup-row">
                    <span class="popup-row-label">CP:</span>
                    <span class="popup-row-value">${props.CP || 'N/A'}</span>
                </div>
            </div>
        `;
        
        new maplibregl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(html)
            .addTo(map);
    });
    
    // Change cursor on hover
    ['carnicerias-points', 'plazas-points', 'escuelas-points', 'tiendas-points'].forEach(layer => {
        map.on('mouseenter', layer, () => {
            map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', layer, () => {
            map.getCanvas().style.cursor = '';
        });
    });
}

// Update legend based on current metric
function updateLegend() {
    let legendHTML = '';
    
    // Special handling for NSE categorical data
    if (currentMetric === 'Nivel_NSE') {
        const nseOrder = ['A/B', 'C+', 'C', 'C-', 'D+', 'D', 'E'];
        const nseLabels = {
            'A/B': 'A/B - Alto',
            'C+': 'C+ - Medio Alto',
            'C': 'C - Medio',
            'C-': 'C- - Medio Bajo',
            'D+': 'D+ - Bajo Superior',
            'D': 'D - Bajo',
            'E': 'E - Muy Bajo'
        };
        
        // Find which NSE levels exist in data
        const existingNSE = new Set(
            geojsonData.ageb.features
                .map(f => f.properties.Nivel_NSE)
                .filter(v => v != null)
        );
        
        legendHTML = nseOrder
            .filter(nse => existingNSE.has(nse))
            .map(nse => `
                <div class="legend-item">
                    <div class="legend-color" style="background-color: ${NSE_COLORS_AMAI[nse]};"></div>
                    <span class="legend-label">${nseLabels[nse]}</span>
                </div>
            `).join('');
    } else {
        // Numeric metrics use quantile breaks
        const values = geojsonData.ageb.features
            .map(f => f.properties[currentMetric])
            .filter(v => v != null)
            .sort((a, b) => a - b);
        
        const breaks = [
            0,
            values[Math.floor(values.length * 0.2)],
            values[Math.floor(values.length * 0.4)],
            values[Math.floor(values.length * 0.6)],
            values[Math.floor(values.length * 0.8)]
        ];
        
        const colors = ['#fee5d9', '#fcae91', '#fb6a4a', '#de2d26', '#a50f15'];
        const labels = breaks.map((b, i) => {
            if (i === breaks.length - 1) return `${b.toFixed(1)}+`;
            return `${b.toFixed(1)} - ${breaks[i + 1].toFixed(1)}`;
        });
        
        legendHTML = colors.map((color, i) => `
            <div class="legend-item">
                <div class="legend-color" style="background-color: ${color};"></div>
                <span class="legend-label">${labels[i]}</span>
            </div>
        `).join('');
    }
    
    document.getElementById('legend-content').innerHTML = legendHTML;
}

// UI Controls Event Listeners

// Metric selector
document.getElementById('metric-selector').addEventListener('change', (e) => {
    currentMetric = e.target.value;
    map.setPaintProperty('ageb-fill', 'fill-color', getChoroplethExpression(currentMetric));
    updateLegend();
});

// Score filter slider
const scoreFilter = document.getElementById('score-filter');
const scoreValue = document.getElementById('score-value');

scoreFilter.addEventListener('input', (e) => {
    const minScore = parseFloat(e.target.value);
    scoreValue.textContent = minScore;
    
    map.setFilter('ageb-fill', ['>=', ['get', 'Score_Final'], minScore]);
    map.setFilter('ageb-outline', ['>=', ['get', 'Score_Final'], minScore]);
});

// Layer toggles
document.getElementById('layer-top').addEventListener('change', (e) => {
    layerState.top = e.target.checked;
    const visibility = e.target.checked ? 'visible' : 'none';
    map.setLayoutProperty('top-fill', 'visibility', visibility);
    map.setLayoutProperty('top-outline', 'visibility', visibility);
});

document.getElementById('layer-carnicerias').addEventListener('change', (e) => {
    layerState.carnicerias = e.target.checked;
    const visibility = e.target.checked ? 'visible' : 'none';
    map.setLayoutProperty('carnicerias-points', 'visibility', visibility);
});

document.getElementById('layer-plazas').addEventListener('change', (e) => {
    layerState.plazas = e.target.checked;
    const visibility = e.target.checked ? 'visible' : 'none';
    map.setLayoutProperty('plazas-points', 'visibility', visibility);
});

document.getElementById('layer-escuelas').addEventListener('change', (e) => {
    layerState.escuelas = e.target.checked;
    const visibility = e.target.checked ? 'visible' : 'none';
    map.setLayoutProperty('escuelas-points', 'visibility', visibility);
});

document.getElementById('layer-tiendas').addEventListener('change', (e) => {
    layerState.tiendas = e.target.checked;
    const visibility = e.target.checked ? 'visible' : 'none';
    map.setLayoutProperty('tiendas-points', 'visibility', visibility);
});

document.getElementById('layer-colonias').addEventListener('change', (e) => {
    layerState.colonias = e.target.checked;
    const visibility = e.target.checked ? 'visible' : 'none';
    map.setLayoutProperty('colonias-outline', 'visibility', visibility);
});

document.getElementById('layer-trafico').addEventListener('change', (e) => {
    layerState.trafico = e.target.checked;
    const visibility = e.target.checked ? 'visible' : 'none';
    map.setLayoutProperty('trafico-layer', 'visibility', visibility);
});

