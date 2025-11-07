# Análisis de Viabilidad: Carnicería en Colonias Pueblo Nuevo

## Contexto STRTGY

**Cliente:** Blas Carnicerías  
**Consultoría:** STRTGY - Inteligencia Artificial Aplicada a Decisiones Estratégicas  
**Fecha:** Noviembre 2025  
**Tipo de Análisis:** Evaluación geoespacial de viabilidad comercial

---

## Resumen Ejecutivo

### Oportunidad Identificada: **MODERADA**

El análisis geoespacial de las colonias Pueblo Nuevo revela un área con **potencial viable pero requiere análisis detallado de competencia local**. Con base en nuestra metodología híbrida (MCDA + Machine Learning), el área presenta un **score promedio de 67.6/100**, ubicándose en el rango medio de oportunidades identificadas en la Zona Metropolitana de Monterrey.

### Métricas Clave de Decisión

| Métrica | Valor | Interpretación |
|---------|-------|----------------|
| **Score de Aptitud Promedio** | 67.6/100 | ⚠ Moderado |
| **Nivel Socioeconómico Dominante** | C+ | Poder adquisitivo medio-alto, segmento objetivo ideal |
| **Población Proyectada (2025)** | 750,095 hab | ✓ Mercado sustancial |
| **Densidad Poblacional** | 8639 hab/km² | ✓ Alta densidad |
| **Carnicerías Existentes** | 59 | ✗ Alta competencia |
| **Competencia Promedio (1km)** | 19.7 | ✗ Alta saturación |

---

## Metodología Aplicada

### Enfoque STRTGY: Certeza a través de Datos

En **STRTGY**, nuestra misión es traducir la complejidad del mercado en **certeza de negocio**. Para este análisis, implementamos una metodología híbrida que combina:

1. **Multi-Criteria Decision Analysis (MCDA)** - Modelo estadístico basado en criterios ponderados
2. **Machine Learning** - Random Forest + XGBoost con validación cruzada
3. **Análisis Espacial** - ESDA, clusters de hot spots, y autocorrelación espacial
4. **Proyecciones Demográficas** - Estimaciones a 2025 con tasas de crecimiento históricas

### Componentes del Score Final

Nuestro modelo evalúa **4 dimensiones críticas** con ponderaciones basadas en análisis de rentabilidad histórica de carnicerías en ZMM:

#### 1. Componente NSE (35% del score) → **66.3/100**

**Qué mide:** Poder adquisitivo y capacidad de consumo del área  
**Por qué importa:** El NSE determina frecuencia de compra, ticket promedio y sensibilidad a precio

**Hallazgos en Pueblo Nuevo:**
- Nivel dominante: **C+** - poder adquisitivo medio-alto, segmento objetivo ideal
- Índice NSE promedio: **66.3/100**

**Implicación estratégica:**
✓ El perfil NSE es ideal para una carnicería de calidad media-alta. Los clientes valoran frescura, variedad y servicio por encima del precio más bajo.

#### 2. Componente Competencia (25% del score)

**Qué mide:** Saturación del mercado local y proximidad a competidores  
**Por qué importa:** Alta competencia diluye demanda y presiona márgenes

**Hallazgos en Pueblo Nuevo:**
- Carnicerías en el área: **59**
- Promedio en radio de 1km: **19.7** establecimientos

**Implicación estratégica:**
✗ Alta saturación. Considerar nicho específico (orgánico, halal, cortes premium) o ubicación alternativa.

#### 3. Componente Accesibilidad (20% del score)

**Qué mide:** Centralidad en red vial, visibilidad estratégica, proximidad a POIs  
**Por qué importa:** Alto tráfico vehicular = alta visibilidad = más clientes espontáneos

**Hallazgos en Pueblo Nuevo:**
- Centralidad promedio: **0.0000** (betweenness centrality)

**Implicación estratégica:**
✗ Ubicaciones en calles internas. Requiere marketing local intensivo y diferenciación por servicio/calidad.

#### 4. Componente Flujo/Demografía (20% del score)

**Qué mide:** Densidad poblacional, crecimiento demográfico, perfil de hogares  
**Por qué importa:** Más personas = más demanda potencial

**Hallazgos en Pueblo Nuevo:**
- Población total (2025): **750,095** habitantes
- Densidad promedio: **8639** hab/km²

**Implicación estratégica:**
✓ Mercado sustancial con alta densidad. Base de clientes suficiente para sostener operación rentable desde el primer año.

---

## Análisis FODA del Área

### Fortalezas

- ✓ NSE objetivo C+ dominante (ideal para carnicería de calidad)

- ✓ Población densa (>{kpis["densidad_promedio"]:.0f} hab/km²) con poder adquisitivo

- ✓ Proyecciones demográficas positivas (crecimiento poblacional esperado)

### Oportunidades
- Capturar demanda insatisfecha de clientes que actualmente compran fuera del área
- Diferenciación por calidad y servicio al cliente (atención personalizada)
- Implementar delivery local para ampliar área de cobertura
- Alianzas con restaurantes y taquerías locales (ventas B2B)
- Marketing digital geo-localizado (Facebook/Instagram Ads en 2km)

### Debilidades
- ⚠ Score moderado (50-70/100) sugiere desafíos operativos

- ⚠ Competencia moderada-alta requiere diferenciación clara
- ⚠ Ubicaciones en calles secundarias (menor visibilidad espontánea)
- ⚠ Requiere validación de campo (disponibilidad de locales, rentas)

### Amenazas
- Entrada de cadenas corporativas (Carne Frida, La Mexicana) con economías de escala
- Crecimiento de supermercados con secciones de carnicería (HEB, Soriana)
- Cambio de hábitos: aumento de productos plant-based y sustitutos
- Sensibilidad económica: recesión puede reducir consumo de cortes premium
- Competencia informal (carnicerías sin registro que evitan impuestos)

---

## Recomendaciones Estratégicas STRTGY

### 1. Selección de Ubicación Específica

**Acción inmediata:**
- Revisar **capa 03_TopUbicaciones_AGEB_PuebloNuevo.geojson** en QGIS
- Identificar el AGEB con mayor **Score_Final** (idealmente >75/100)
- Validar que esté en calle con **Centralidad_Intermediacion** alta (>0.005)
- Confirmar que tenga <3 carnicerías en radio de 500m

**Criterios de validación en campo:**
- ✓ Local visible desde calle principal, idealmente en esquina
- ✓ Estacionamiento disponible (mínimo 3-4 lugares) o en zona sin restricciones
- ✓ Acceso fácil para carga/descarga de mercancía
- ✓ Cerca de anclas comerciales (plazas, tiendas, escuelas)
- ✓ Renta ≤10% de ventas proyectadas mensuales

### 2. Estrategia de Posicionamiento

Basado en el perfil NSE **C+** del área:

**"Carnicería de Confianza del Vecindario"** - Enfoque en calidad, higiene y servicio personalizado

**Propuesta de valor:**
- Cortes frescos diarios (comunicar hora de abastecimiento)
- Variedad premium: importados, orgánicos, cortes especiales
- Asesoría en preparación (recetas, tiempos de cocción)
- Programa de lealtad digital (acumulación de puntos)
- Delivery local sin mínimo de compra

### 3. Mix de Productos Recomendado

**Categoría Core (60-70% de ventas):**
- Res: arrachera, diezmillo, bistec, molida (80/20 y 90/10)
- Cerdo: costilla, lomo, chuleta
- Pollo: piezas y entero (margen más bajo pero alta rotación)

**Categoría Premium (15-20% de ventas):**
- Cortes importados: rib eye, new york, t-bone
- Cortes especiales: arrachera marinada, fajitas preparadas
- Carnes frías: jamón, salchicha artesanal

**Categoría Complementaria (10-15% de ventas):**
- Condimentos y salsas
- Carbón y utensilios para asado
- Productos de valor agregado (chorizo, hamburguesas)

### 4. Proyección Financiera Inicial

**Supuestos basados en el análisis:**
- Población potencial (1km): ~450,057 habitantes
- Penetración estimada Año 1: 3-5% de hogares
- Ticket promedio: $350-500 MXN
- Frecuencia de compra: 2-3 veces/mes

**Estimación conservadora (mensual):**
- Ventas mes 1-3: $150,000 - $200,000
- Ventas mes 4-6: $250,000 - $300,000
- Ventas mes 7-12: $350,000 - $450,000

**Inversión inicial estimada:**
- Local (acondicionamiento): $80,000 - $150,000
- Equipo (refrigeradores, vitrinas, báscula): $120,000 - $200,000
- Inventario inicial: $50,000 - $80,000
- Marketing lanzamiento: $15,000 - $25,000
- **Total: $265,000 - $455,000**

**ROI proyectado:** 12-18 meses

*Nota: Validar cifras con contador y ajustar según condiciones específicas de renta y proveeduría.*

### 5. Plan de Marketing de Lanzamiento

**Pre-apertura (2 semanas antes):**
- Volanteo en 500m a la redonda
- Posts en grupos de Facebook del vecindario
- Alianza con influencers locales (microinfluencers con 5k-15k followers)

**Apertura (semana 1):**
- Promoción de inauguración: 20% descuento en cortes selectos
- Degustación de productos (cumplir normativa sanitaria)
- Registro para programa de lealtad con regalo de bienvenida

**Post-apertura (mes 1-3):**
- Promociones semanales comunicadas por WhatsApp Business
- Rifas mensuales (cena para 4 personas)
- Contenido educativo: recetas, tips de cocción (Instagram/TikTok)

### 6. KPIs de Seguimiento

**Métricas críticas a monitorear:**
- Ticket promedio semanal (objetivo: >$400)
- Tasa de clientes recurrentes (objetivo: >40% en mes 3)
- Merma diaria (objetivo: <3% del inventario)
- Ventas por hora de operación (identificar picos para optimizar staffing)
- Share of wallet: ¿cuánto del gasto mensual en carne capturamos? (objetivo: >60%)

---

## Conclusiones y Siguiente Paso

### Conclusión Principal

El análisis geoespacial indica que las colonias Pueblo Nuevo presentan una **oportunidad MODERADA** que requiere validación detallada. El score de 67.6/100 sugiere viabilidad, pero el éxito dependerá de una ejecución impecable en selección de ubicación específica, diferenciación clara, y estrategia de marketing local agresiva.

### Recomendación Ejecutiva STRTGY

**Para maximizar probabilidad de éxito:**

1. **Acción Inmediata:** Validar en campo las Top 3 ubicaciones identificadas en QGIS (archivo `03_TopUbicaciones_AGEB_PuebloNuevo.geojson`)
2. **Criterio de Go/No-Go:** Ubicación debe cumplir ≥4 de 5 criterios (visibilidad, estacionamiento, acceso, anclas comerciales, renta)
3. **Timeline sugerido:** 
   - Semanas 1-2: Validación de campo + negociación de renta
   - Semanas 3-4: Acondicionamiento de local + permisos
   - Semana 5: Soft opening con vecinos/familia
   - Semana 6: Gran apertura con promociones

4. **Inversión requerida:** $360,000 MXN (promedio estimado)
5. **ROI esperado:** 12-18 meses con ejecución disciplinada

---

## Sobre STRTGY

**STRTGY** es una consultora de inteligencia artificial aplicada que traduce complejidad en **certeza de negocio**. No vendemos tecnología; entregamos **ROI demostrable**.

**Nuestro enfoque:**
- Sentarnos a la mesa con nuestros clientes para entender su ADN
- Absorber la complejidad del entorno y la tecnología
- Diseñar soluciones de IA que generen resultados medibles
- Defender rentabilidad (eliminar fricciones) o atacar el mercado (acelerar crecimiento)

**En este proyecto:**
- Procesamos >50,000 registros geoespaciales (INEGI DENUE + SCINCE)
- Integramos datos demográficos, económicos y de red vial
- Entrenamos modelos de Machine Learning con validación cruzada
- Proyectamos demografía a 2025 con tasas históricas
- Generamos scores interpretables con explicabilidad (SHAP values)

**Resultado:** Certeza sobre dónde abrir tu próxima carnicería, respaldada por datos y metodología científica.

---

**Contacto:**  
STRTGY - Inteligencia Artificial Aplicada  
[Información de contacto]

**Documento generado:** Noviembre 2025  
**Versión:** 1.0

---

*Este reporte se basa en datos oficiales de INEGI (DENUE, SCINCE) y proyecciones demográficas de CONAPO. Las estimaciones financieras son referenciales y deben validarse con análisis contable específico.*
