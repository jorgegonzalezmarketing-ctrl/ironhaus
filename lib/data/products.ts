import type { Product } from "@/types";

/**
 * Catálogo demo. Precios en CLP. Datos verosímiles para el mercado chileno.
 * Estructura lista para migrar a Prisma/PostgreSQL sin tocar la UI.
 */
export const products: Product[] = [
  // ===================== CARDIO =====================
  {
    id: "p-001",
    sku: "CAR-TRD-9000",
    slug: "trotadora-comercial-titanforge-t9000",
    name: "Trotadora Comercial TitanForge T-9000",
    shortDescription:
      "Trotadora profesional con motor AC de 4 HP y consola táctil de 16''.",
    description:
      "Diseñada para uso intensivo en gimnasios comerciales. Su motor AC de 4 HP continuos y la superficie de amortiguación ortopédica entregan una pisada estable a alta velocidad durante miles de horas de uso. Consola táctil HD con programas preinstalados y conectividad para apps de entrenamiento.",
    category: "cardio",
    brand: "titanforge",
    price: 3290000,
    salePrice: 2890000,
    stock: 6,
    rating: 4.9,
    reviews: 42,
    badges: ["mas-vendido", "oferta"],
    relatedIds: ["p-002", "p-003", "p-021"],
    specs: [
      { label: "Motor", value: "4 HP AC continuos" },
      { label: "Velocidad", value: "1 – 22 km/h" },
      { label: "Inclinación", value: "0 – 15%" },
      { label: "Superficie", value: "155 × 60 cm" },
      { label: "Peso máx. usuario", value: "180 kg" },
    ],
    highlights: [
      "Consola táctil HD 16''",
      "Amortiguación ortopédica de 8 puntos",
      "Uso comercial 24/7",
    ],
    featured: true,
  },
  {
    id: "p-002",
    sku: "CAR-ELP-540",
    slug: "eliptica-apex-cardio-e540",
    name: "Elíptica Apex Cardio E-540",
    shortDescription:
      "Elíptica de paso largo con resistencia electromagnética de 24 niveles.",
    description:
      "Movimiento fluido y de bajo impacto gracias a su volante de inercia de 14 kg y paso de 56 cm. Ideal para acondicionamiento cardiovascular en gimnasios y hogares exigentes.",
    category: "cardio",
    brand: "apex-cardio",
    price: 1690000,
    stock: 9,
    rating: 4.7,
    reviews: 28,
    badges: ["premium"],
    relatedIds: ["p-001", "p-003", "p-004"],
    specs: [
      { label: "Resistencia", value: "Electromagnética, 24 niveles" },
      { label: "Volante", value: "14 kg" },
      { label: "Paso", value: "56 cm" },
      { label: "Peso máx. usuario", value: "160 kg" },
    ],
    highlights: ["Bajo impacto articular", "Volante de 14 kg", "Pulsómetro integrado"],
    featured: true,
  },
  {
    id: "p-003",
    sku: "CAR-BIK-300",
    slug: "bicicleta-spinning-apex-s300",
    name: "Bicicleta de Spinning Apex S-300",
    shortDescription:
      "Bicicleta indoor con volante de 22 kg y transmisión por correa silenciosa.",
    description:
      "Volante de inercia de 22 kg para una pedaleada realista y silenciosa. Estructura de acero reforzado, asiento y manubrio ajustables en 4 vías. Pensada para salas de cycling de alta rotación.",
    category: "cardio",
    brand: "apex-cardio",
    price: 890000,
    salePrice: 749000,
    stock: 14,
    rating: 4.8,
    reviews: 67,
    badges: ["oferta", "mas-vendido"],
    relatedIds: ["p-001", "p-002", "p-004"],
    specs: [
      { label: "Volante", value: "22 kg" },
      { label: "Transmisión", value: "Correa Poly-V silenciosa" },
      { label: "Ajustes", value: "Asiento y manubrio 4 vías" },
      { label: "Peso máx. usuario", value: "150 kg" },
    ],
    highlights: ["Volante de 22 kg", "Silenciosa", "Estructura comercial"],
    featured: true,
  },
  {
    id: "p-004",
    sku: "CAR-ROW-700",
    slug: "remo-aire-titanforge-row700",
    name: "Remo de Aire TitanForge Row-700",
    shortDescription:
      "Remador de resistencia por aire con monitor de rendimiento PM-Pro.",
    description:
      "Resistencia por aire autoregulable: a mayor intensidad de remada, mayor resistencia. Riel de aluminio de 130 cm y monitor PM-Pro con métricas de potencia, ritmo y calorías. El favorito de los box de CrossFit.",
    category: "cardio",
    brand: "titanforge",
    price: 1190000,
    stock: 11,
    rating: 4.9,
    reviews: 51,
    badges: ["mas-vendido"],
    relatedIds: ["p-003", "p-012", "p-013"],
    specs: [
      { label: "Resistencia", value: "Aire autoregulable" },
      { label: "Riel", value: "Aluminio 130 cm" },
      { label: "Monitor", value: "PM-Pro con potencia" },
      { label: "Plegable", value: "Sí, vertical" },
    ],
    highlights: ["Resistencia por aire", "Monitor de potencia", "Plegable"],
  },

  // ===================== MUSCULACIÓN =====================
  {
    id: "p-005",
    sku: "MUS-MUL-8ST",
    slug: "multiestacion-kraftwerk-mx8",
    name: "Multiestación Kraftwerk MX-8",
    shortDescription:
      "Estación de 8 puestos para entrenamiento simultáneo y completo.",
    description:
      "Centro de musculación modular con 8 puestos de trabajo y placas selectorizadas de 90 kg por torre. Cables de acero recubierto y poleas selladas de alta durabilidad. La columna vertebral de cualquier gimnasio comercial.",
    category: "musculacion",
    brand: "kraftwerk",
    price: 6890000,
    salePrice: 6290000,
    stock: 3,
    rating: 5.0,
    reviews: 18,
    badges: ["premium", "oferta"],
    relatedIds: ["p-006", "p-007", "p-008"],
    specs: [
      { label: "Puestos", value: "8 estaciones" },
      { label: "Placas", value: "90 kg por torre" },
      { label: "Cables", value: "Acero recubierto Ø6 mm" },
      { label: "Estructura", value: "Acero 60×120 mm" },
    ],
    highlights: ["8 puestos simultáneos", "Placas de 90 kg", "Uso intensivo"],
    featured: true,
  },
  {
    id: "p-006",
    sku: "MUS-PRS-PEC",
    slug: "press-pecho-selectorizado-kraftwerk",
    name: "Press de Pecho Selectorizado Kraftwerk",
    shortDescription:
      "Máquina de press de pecho con recorrido biomecánico y placas de 100 kg.",
    description:
      "Trayectoria convergente que respeta la biomecánica del hombro. Asiento ajustable con pistón a gas y placas selectorizadas de 100 kg. Tapicería de doble densidad para uso comercial continuo.",
    category: "musculacion",
    brand: "kraftwerk",
    price: 2390000,
    stock: 5,
    rating: 4.8,
    reviews: 22,
    badges: ["premium"],
    relatedIds: ["p-005", "p-007", "p-008"],
    specs: [
      { label: "Placas", value: "100 kg selectorizadas" },
      { label: "Recorrido", value: "Convergente biomecánico" },
      { label: "Ajuste", value: "Asiento a gas" },
    ],
    highlights: ["Recorrido convergente", "Placas de 100 kg", "Tapiz doble densidad"],
  },
  {
    id: "p-007",
    sku: "MUS-LEG-PRS",
    slug: "prensa-piernas-45-ironclad",
    name: "Prensa de Piernas 45° Ironclad",
    shortDescription:
      "Prensa de piernas a 45° de carga libre con capacidad de 500 kg.",
    description:
      "Estructura de acero de alto calibre con rodamientos lineales para un deslizamiento suave incluso a máxima carga. Plataforma antideslizante de gran tamaño y doble sistema de seguros. Capacidad de hasta 500 kg en discos.",
    category: "musculacion",
    brand: "ironclad",
    price: 1990000,
    salePrice: 1790000,
    stock: 4,
    rating: 4.9,
    reviews: 31,
    badges: ["oferta"],
    relatedIds: ["p-005", "p-006", "p-008"],
    specs: [
      { label: "Capacidad", value: "500 kg en discos" },
      { label: "Ángulo", value: "45°" },
      { label: "Deslizamiento", value: "Rodamientos lineales" },
      { label: "Seguros", value: "Doble sistema" },
    ],
    highlights: ["Hasta 500 kg", "Rodamientos lineales", "Doble seguro"],
    featured: true,
  },
  {
    id: "p-008",
    sku: "MUS-LAT-PUL",
    slug: "polea-dorsal-lat-pulldown-kraftwerk",
    name: "Polea Dorsal (Lat Pulldown) Kraftwerk",
    shortDescription:
      "Estación de jalón dorsal con rodillos de muslo ajustables y 90 kg.",
    description:
      "Jalón al pecho con polea de alta relación para una resistencia uniforme en todo el recorrido. Rodillos de sujeción ajustables y asiento ergonómico. Incluye barra de agarre ancho.",
    category: "musculacion",
    brand: "kraftwerk",
    price: 1690000,
    stock: 7,
    rating: 4.7,
    reviews: 19,
    badges: [],
    relatedIds: ["p-005", "p-006", "p-007"],
    specs: [
      { label: "Placas", value: "90 kg selectorizadas" },
      { label: "Rodillos", value: "Ajustables" },
      { label: "Incluye", value: "Barra de agarre ancho" },
    ],
    highlights: ["Resistencia uniforme", "Rodillos ajustables", "Barra incluida"],
  },

  // ===================== PESO LIBRE =====================
  {
    id: "p-009",
    sku: "PLB-DSC-BUM20",
    slug: "set-discos-bumper-nordik-100kg",
    name: "Set de Discos Bumper Nordik 100 kg",
    shortDescription:
      "Set de discos bumper de caucho virgen con anillo de acero. 100 kg totales.",
    description:
      "Discos bumper de caucho virgen de alta densidad con inserto de acero de precisión (50 mm). Rebote controlado y bajo nivel de ruido. Set de 100 kg: 2×10, 2×15, 2×20 kg. Tolerancia de peso ±1%.",
    category: "peso-libre",
    brand: "nordik",
    price: 1090000,
    salePrice: 949000,
    stock: 12,
    rating: 4.9,
    reviews: 88,
    badges: ["mas-vendido", "oferta"],
    relatedIds: ["p-010", "p-011", "p-012"],
    specs: [
      { label: "Composición", value: "Caucho virgen + inserto acero" },
      { label: "Diámetro central", value: "50 mm olímpico" },
      { label: "Set", value: "2×10 / 2×15 / 2×20 kg" },
      { label: "Tolerancia", value: "±1%" },
    ],
    highlights: ["Caucho virgen", "Rebote controlado", "Tolerancia ±1%"],
    featured: true,
  },
  {
    id: "p-010",
    sku: "PLB-BAR-OLY20",
    slug: "barra-olimpica-nordik-pro-20kg",
    name: "Barra Olímpica Nordik Pro 20 kg",
    shortDescription:
      "Barra olímpica de 20 kg, acero 200k PSI y rodamientos de aguja.",
    description:
      "Barra de competición de 2,2 m con acero de tracción de 200.000 PSI, moleteado de competición y rotación sobre rodamientos de aguja. Acabado en cromo duro resistente a la corrosión.",
    category: "peso-libre",
    brand: "nordik",
    price: 349000,
    stock: 20,
    rating: 4.9,
    reviews: 73,
    badges: ["mas-vendido"],
    relatedIds: ["p-009", "p-011", "p-012"],
    specs: [
      { label: "Peso", value: "20 kg" },
      { label: "Acero", value: "200.000 PSI" },
      { label: "Rotación", value: "Rodamientos de aguja" },
      { label: "Acabado", value: "Cromo duro" },
    ],
    highlights: ["200k PSI", "Rodamientos de aguja", "Cromo duro"],
  },
  {
    id: "p-011",
    sku: "PLB-MNC-HEX",
    slug: "set-mancuernas-hexagonales-ironclad",
    name: "Set Mancuernas Hexagonales Ironclad 2–30 kg",
    shortDescription:
      "Juego completo de mancuernas hexagonales engomadas, de 2 a 30 kg.",
    description:
      "Mancuernas hexagonales con cabezas engomadas anti-rodadura y mango cromado estriado. Juego completo en pares de 2 a 30 kg. Ideales para zona de peso libre de gimnasios comerciales.",
    category: "peso-libre",
    brand: "ironclad",
    price: 2490000,
    stock: 5,
    rating: 4.8,
    reviews: 34,
    badges: ["premium"],
    relatedIds: ["p-009", "p-010", "p-024"],
    specs: [
      { label: "Rango", value: "2 a 30 kg en pares" },
      { label: "Cabezas", value: "Caucho hexagonal" },
      { label: "Mango", value: "Cromado estriado" },
    ],
    highlights: ["Anti-rodadura", "Set completo", "Mango cromado"],
  },
  {
    id: "p-012",
    sku: "PLB-BNC-ADJ",
    slug: "banco-ajustable-fid-titanforge",
    name: "Banco Ajustable FID TitanForge",
    shortDescription:
      "Banco plano/inclinado/declinado de 7 posiciones para uso comercial.",
    description:
      "Banco FID con respaldo de 7 posiciones y asiento de 3, sistema de ajuste rápido tipo escalera. Estructura de acero de alto calibre y tapicería de doble densidad. Capacidad de 450 kg.",
    category: "peso-libre",
    brand: "titanforge",
    price: 459000,
    salePrice: 399000,
    stock: 16,
    rating: 4.8,
    reviews: 56,
    badges: ["oferta", "mas-vendido"],
    relatedIds: ["p-010", "p-011", "p-013"],
    specs: [
      { label: "Posiciones", value: "Respaldo 7 / asiento 3" },
      { label: "Capacidad", value: "450 kg" },
      { label: "Tapicería", value: "Doble densidad" },
    ],
    highlights: ["7 posiciones", "Ajuste rápido", "450 kg"],
    featured: true,
  },

  // ===================== CROSSFIT =====================
  {
    id: "p-013",
    sku: "CRF-RCK-PWR",
    slug: "power-rack-ironclad-pr5",
    name: "Power Rack Ironclad PR-5",
    shortDescription:
      "Jaula de potencia de perfil 75×75 mm con dominadas múltiples y J-cups.",
    description:
      "Estructura de acero de 75×75 mm con orificios numerados Westside, barra de dominadas multiagarre, J-cups de UHMW y barras de seguridad. Compatible con accesorios modulares (poleas, dips, landmine).",
    category: "crossfit",
    brand: "ironclad",
    price: 1290000,
    salePrice: 1149000,
    stock: 8,
    rating: 4.9,
    reviews: 64,
    badges: ["mas-vendido", "oferta"],
    relatedIds: ["p-009", "p-010", "p-014"],
    specs: [
      { label: "Perfil", value: "Acero 75×75 mm" },
      { label: "Orificios", value: "Numerados Westside" },
      { label: "Dominadas", value: "Barra multiagarre" },
      { label: "Modular", value: "Compatible accesorios" },
    ],
    highlights: ["Perfil 75×75", "Multiagarre", "Modular"],
    featured: true,
  },
  {
    id: "p-014",
    sku: "CRF-KTB-SET",
    slug: "set-kettlebells-competicion-nordik",
    name: "Set Kettlebells Competición Nordik 8–32 kg",
    shortDescription:
      "Pesas rusas de competición de acero, dimensiones uniformes y código de color.",
    description:
      "Kettlebells de competición de acero macizo con dimensiones idénticas en todos los pesos para una técnica consistente. Asa pulida sin costuras. Set de 8, 12, 16, 20, 24 y 32 kg con código de color.",
    category: "crossfit",
    brand: "nordik",
    price: 1390000,
    stock: 6,
    rating: 4.8,
    reviews: 29,
    badges: ["premium"],
    relatedIds: ["p-013", "p-015", "p-016"],
    specs: [
      { label: "Material", value: "Acero macizo" },
      { label: "Set", value: "8/12/16/20/24/32 kg" },
      { label: "Asa", value: "Pulida sin costuras" },
    ],
    highlights: ["Dimensión uniforme", "Código de color", "Grado competición"],
  },
  {
    id: "p-015",
    sku: "CRF-BOX-PLY",
    slug: "cajon-pliometrico-3en1-andes",
    name: "Cajón Pliométrico 3 en 1 Andes Fit",
    shortDescription:
      "Cajón de salto de madera 3 alturas (50/60/75 cm) en una sola pieza.",
    description:
      "Cajón pliométrico de madera contrachapada de 18 mm con tres alturas en un solo bloque (50/60/75 cm). Bordes redondeados y ensamble por encastre reforzado. Soporta saltos repetidos de uso intensivo.",
    category: "crossfit",
    brand: "andes-fit",
    price: 99000,
    salePrice: 84900,
    stock: 25,
    rating: 4.7,
    reviews: 41,
    badges: ["oferta"],
    relatedIds: ["p-013", "p-014", "p-016"],
    specs: [
      { label: "Alturas", value: "50 / 60 / 75 cm" },
      { label: "Material", value: "Contrachapado 18 mm" },
      { label: "Bordes", value: "Redondeados" },
    ],
    highlights: ["3 alturas en 1", "Encastre reforzado", "Bordes seguros"],
  },
  {
    id: "p-016",
    sku: "CRF-WBL-9KG",
    slug: "balon-medicinal-wall-ball-andes",
    name: "Wall Ball Andes Fit 9 kg",
    shortDescription:
      "Balón medicinal de pared de 9 kg con costura reforzada de doble pespunte.",
    description:
      "Balón de 35 cm relleno de manera uniforme para mantener su forma tras miles de impactos. Cubierta resistente a la abrasión con costura de doble pespunte. Peso indicado en grande para entrenos grupales.",
    category: "crossfit",
    brand: "andes-fit",
    price: 49900,
    stock: 30,
    rating: 4.6,
    reviews: 37,
    badges: [],
    relatedIds: ["p-014", "p-015", "p-017"],
    specs: [
      { label: "Peso", value: "9 kg" },
      { label: "Diámetro", value: "35 cm" },
      { label: "Costura", value: "Doble pespunte" },
    ],
    highlights: ["Forma estable", "Anti-abrasión", "Peso visible"],
  },

  // ===================== ACCESORIOS =====================
  {
    id: "p-017",
    sku: "ACC-BND-SET",
    slug: "set-bandas-resistencia-voltarc",
    name: "Set Bandas de Resistencia VoltArc (5 piezas)",
    shortDescription:
      "Cinco bandas de látex en capas con tensiones de 5 a 80 kg.",
    description:
      "Bandas de látex natural multicapa con código de color por tensión (5–80 kg). Ideales para asistencia en dominadas, movilidad y entrenamiento de fuerza variable. Incluye bolso de transporte.",
    category: "accesorios",
    brand: "voltarc",
    price: 44900,
    salePrice: 37900,
    stock: 40,
    rating: 4.7,
    reviews: 95,
    badges: ["mas-vendido", "oferta"],
    relatedIds: ["p-016", "p-018", "p-019"],
    specs: [
      { label: "Piezas", value: "5 bandas" },
      { label: "Tensión", value: "5 a 80 kg" },
      { label: "Material", value: "Látex natural multicapa" },
    ],
    highlights: ["5 tensiones", "Látex natural", "Incluye bolso"],
  },
  {
    id: "p-018",
    sku: "ACC-FLR-RUB",
    slug: "piso-caucho-gimnasio-15mm-m2",
    name: "Piso de Caucho para Gimnasio 15 mm (m²)",
    shortDescription:
      "Loseta de caucho reciclado de 15 mm, 100×100 cm. Precio por m².",
    description:
      "Loseta de caucho reciclado de alta densidad de 15 mm que absorbe impactos y protege el subsuelo y los equipos. Superficie antideslizante y fácil de limpiar. Sistema de unión por puzzle. Precio por metro cuadrado.",
    category: "accesorios",
    brand: "andes-fit",
    price: 18900,
    stock: 500,
    rating: 4.8,
    reviews: 120,
    badges: ["mas-vendido"],
    relatedIds: ["p-013", "p-009", "p-019"],
    specs: [
      { label: "Espesor", value: "15 mm" },
      { label: "Formato", value: "100 × 100 cm (puzzle)" },
      { label: "Material", value: "Caucho reciclado HD" },
    ],
    highlights: ["Absorbe impacto", "Antideslizante", "Unión puzzle"],
  },
  {
    id: "p-019",
    sku: "ACC-RCK-DMB",
    slug: "rack-mancuernas-3-niveles-ironclad",
    name: "Rack para Mancuernas 3 Niveles Ironclad",
    shortDescription:
      "Soporte inclinado de 3 niveles para ordenar hasta 10 pares de mancuernas.",
    description:
      "Estructura de acero con bandejas inclinadas y protección de goma para almacenar mancuernas de forma segura y ordenada. Capacidad para 10 pares. Pies con regatones niveladores.",
    category: "accesorios",
    brand: "ironclad",
    price: 329000,
    stock: 10,
    rating: 4.7,
    reviews: 16,
    badges: [],
    relatedIds: ["p-011", "p-018", "p-017"],
    specs: [
      { label: "Niveles", value: "3 bandejas inclinadas" },
      { label: "Capacidad", value: "Hasta 10 pares" },
      { label: "Protección", value: "Goma anti-rayado" },
    ],
    highlights: ["Orden seguro", "10 pares", "Niveladores"],
  },

  // ===================== COMERCIAL =====================
  {
    id: "p-020",
    sku: "COM-PKG-FULL",
    slug: "pack-gimnasio-comercial-llave-en-mano",
    name: "Pack Gimnasio Comercial Llave en Mano",
    shortDescription:
      "Equipamiento completo para un gimnasio comercial de 200–300 m².",
    description:
      "Solución integral para inaugurar un gimnasio comercial: zona cardio, sala de musculación selectorizada, área de peso libre, zona funcional, pisos y accesorios. Incluye layout, instalación y capacitación. Cotización a medida.",
    category: "comercial",
    brand: "titanforge",
    price: 49900000,
    stock: 2,
    rating: 5.0,
    reviews: 9,
    badges: ["premium"],
    relatedIds: ["p-005", "p-001", "p-013"],
    specs: [
      { label: "Superficie", value: "200 – 300 m²" },
      { label: "Incluye", value: "Layout + instalación + capacitación" },
      { label: "Garantía", value: "Hasta 5 años por línea" },
    ],
    highlights: ["Llave en mano", "Diseño de layout", "Instalación incluida"],
    featured: true,
  },
  {
    id: "p-021",
    sku: "COM-TRD-X12",
    slug: "trotadora-curva-autopropulsada-titanforge",
    name: "Trotadora Curva Autopropulsada TitanForge X-12",
    shortDescription:
      "Trotadora curva sin motor, impulsada por el usuario. Cero electricidad.",
    description:
      "Trotadora de superficie curva accionada por el corredor: no usa motor ni electricidad. Listones de goma de alta durabilidad y resistencia magnética opcional. Favorita para HIIT y sprints en gimnasios premium.",
    category: "comercial",
    brand: "titanforge",
    price: 4490000,
    salePrice: 3990000,
    stock: 4,
    rating: 4.9,
    reviews: 23,
    badges: ["premium", "oferta"],
    relatedIds: ["p-001", "p-004", "p-020"],
    specs: [
      { label: "Tipo", value: "Curva autopropulsada" },
      { label: "Energía", value: "Cero — sin motor" },
      { label: "Superficie", value: "Listones de goma" },
      { label: "Resistencia", value: "Magnética opcional" },
    ],
    highlights: ["Sin motor", "Cero electricidad", "Ideal HIIT"],
  },

  // ===================== HOME GYM =====================
  {
    id: "p-022",
    sku: "HMG-SMI-FUNC",
    slug: "smith-funcional-home-voltarc-sf2",
    name: "Máquina Smith Funcional Home VoltArc SF-2",
    shortDescription:
      "Smith + dos torres de poleas funcionales en un equipo compacto para el hogar.",
    description:
      "Combina barra Smith guiada con doble torre de poleas funcionales (placas de 2×80 kg) y barra de dominadas. Diseño compacto y robusto pensado para garajes y home gyms exigentes. Todo en uno.",
    category: "home-gym",
    brand: "voltarc",
    price: 2190000,
    salePrice: 1990000,
    stock: 6,
    rating: 4.8,
    reviews: 38,
    badges: ["mas-vendido", "oferta"],
    relatedIds: ["p-012", "p-023", "p-024"],
    specs: [
      { label: "Smith", value: "Barra guiada con contrapeso" },
      { label: "Poleas", value: "2 torres × 80 kg" },
      { label: "Extras", value: "Barra de dominadas" },
      { label: "Footprint", value: "Compacto 2,1 × 1,2 m" },
    ],
    highlights: ["3 en 1", "Doble polea", "Compacto"],
    featured: true,
  },
  {
    id: "p-023",
    sku: "HMG-BIK-AIR",
    slug: "bicicleta-aire-home-voltarc-air1",
    name: "Bicicleta de Aire Home VoltArc Air-1",
    shortDescription:
      "Air bike de cuerpo completo con resistencia ilimitada por aire.",
    description:
      "Entrenamiento de cuerpo completo con resistencia por aire que escala con tu esfuerzo. Manubrios móviles, monitor con programas de intervalos y construcción reforzada. Perfecta para acondicionamiento en casa.",
    category: "home-gym",
    brand: "voltarc",
    price: 749000,
    stock: 12,
    rating: 4.7,
    reviews: 44,
    badges: [],
    relatedIds: ["p-022", "p-024", "p-004"],
    specs: [
      { label: "Resistencia", value: "Aire ilimitada" },
      { label: "Trabajo", value: "Cuerpo completo" },
      { label: "Monitor", value: "Intervalos / HIIT" },
    ],
    highlights: ["Cuerpo completo", "Resistencia por aire", "Monitor HIIT"],
  },
  {
    id: "p-024",
    sku: "HMG-DMB-ADJ",
    slug: "mancuernas-ajustables-voltarc-24kg",
    name: "Mancuernas Ajustables VoltArc 2–24 kg (par)",
    shortDescription:
      "Par de mancuernas ajustables: reemplazan 15 pares en un solo dial.",
    description:
      "Cambia de 2 a 24 kg por mancuerna con un giro de dial. Reemplazan hasta 15 pares de mancuernas tradicionales, ahorrando espacio. Bandeja base incluida. La solución definitiva para home gym.",
    category: "home-gym",
    brand: "voltarc",
    price: 549000,
    salePrice: 489000,
    stock: 18,
    rating: 4.8,
    reviews: 102,
    badges: ["mas-vendido", "oferta"],
    relatedIds: ["p-022", "p-023", "p-011"],
    specs: [
      { label: "Rango", value: "2 – 24 kg por mancuerna" },
      { label: "Ajuste", value: "Dial rápido" },
      { label: "Equivale a", value: "15 pares" },
      { label: "Incluye", value: "Bandeja base" },
    ],
    highlights: ["Dial rápido", "Ahorra espacio", "Bandeja incluida"],
    featured: true,
  },
];

/* ============================ Selectores ============================ */

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(product: Product): Product[] {
  return product.relatedIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));
}

/** Precio efectivo: oferta si existe, si no precio lista. */
export function effectivePrice(p: Product): number {
  return p.salePrice ?? p.price;
}

/** Porcentaje de descuento (0 si no hay oferta). */
export function discountPercent(p: Product): number {
  if (!p.salePrice) return 0;
  return Math.round((1 - p.salePrice / p.price) * 100);
}
