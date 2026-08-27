/* ============================================================================
   Pavlo´s Store — datos del negocio (catálogo, combos, sucursales, config)
   Precios en COP de EJEMPLO realista — el dueño los cambia luego.
   ============================================================================ */
(function () {
  "use strict";

  const CONFIG = {
    nombre: "Pavlo´s Store",
    instagram: "pavlos.store",
    instagramUrl: "https://instagram.com/pavlos.store",
    // Número de ejemplo — cambiar al real. Formato wa.me: 57 + número sin espacios.
    whatsapp: "573014490958",
    whatsappDisplay: "301 449 0958",
    domicilio: 6000, // costo de ejemplo
    zonas: ["Santo Tomás", "Palmar de Varela"],
    pagos: ["Nequi", "Daviplata", "Bancolombia", "Llave Bre-b"],
    sucursales: [
      { id: 1, ciudad: "Santo Tomás", dir: "Cra 11 # 7-07, Boulevard", principal: true },
      { id: 2, ciudad: "Santo Tomás", dir: "Boulevard, bajando", nota: "dirección exacta pendiente" },
      { id: 3, ciudad: "Palmar de Varela", dir: "Boulevard, Calle 7", nota: "dirección exacta pendiente" },
    ],
    // Horarios. close > 24h indica que cierra de madrugada (día siguiente).
    horarios: [
      { dias: "Lun – Vie", rango: "1:00 p.m. – 1:00 a.m." },
      { dias: "Sáb – Dom", rango: "12:00 p.m. – 3:00 a.m." },
    ],
  };

  // Categorías del catálogo (orden de aparición)
  const CATEGORIAS = [
    { id: "aguardiente", nombre: "Aguardiente" },
    { id: "ron", nombre: "Ron" },
    { id: "whiskey", nombre: "Whiskey" },
    { id: "tequila", nombre: "Tequila" },
    { id: "ginebra", nombre: "Ginebra" },
    { id: "vodka", nombre: "Vodka" },
    { id: "aperitivos", nombre: "Aperitivos" },
    { id: "vinos", nombre: "Vinos" },
    { id: "cerveza", nombre: "Cerveza" },
    { id: "bebidas", nombre: "Bebidas & Mezcladores" },
    { id: "vapes", nombre: "Vapes" },
    { id: "cigarrillos", nombre: "Cigarrillos" },
    { id: "mecato", nombre: "Mecato" },
  ];

  // img: foto PNG del producto (sobre fondo lacado en la tarjeta)
  // casa = marca (para agrupar en el catálogo)
  const PRODUCTOS = [
    // ===== AGUARDIENTE =====
    { id: "aguardiente-amarillo-375", casa: "Amarillo de Manzanares", nombre: "Aguardiente Amarillo", variante: "375 ml", cat: "aguardiente", precio: 27900, img: "uploads/lote_imagenes_procesado_1784310337875/aguardiente-amarillo-375.webp" },
    { id: "aguardiente-amarillo-750", casa: "Amarillo de Manzanares", nombre: "Aguardiente Amarillo", variante: "750 ml", cat: "aguardiente", precio: 53900, img: "uploads/lote_imagenes_procesado_1784310337875/aguardiente-amarillo-750.webp", estrella: true, tag: "Estrella" },
    { id: "tetra-litro-amarillo", casa: "Amarillo de Manzanares", nombre: "Tetra Litro Amarillo", variante: "", cat: "aguardiente", precio: 61900, img: "uploads/lote_imagenes_procesado_1784310337875/tetra-litro-amarillo.webp" },
    { id: "aguardiente-amarillo-1000", casa: "Amarillo de Manzanares", nombre: "Aguardiente Amarillo", variante: "1 L", cat: "aguardiente", precio: 69900, img: "uploads/lote_imagenes_procesado_1784310337875/aguardiente-amarillo-1000.webp" },
    { id: "aguardiente-amarillo-1500", casa: "Amarillo de Manzanares", nombre: "Aguardiente Amarillo", variante: "1.5 L", cat: "aguardiente", precio: 101900, img: "uploads/lote_imagenes_procesado_1784310337875/aguardiente-amarillo-1500.webp" },
    { id: "antioqueno-verde-375", casa: "Antioqueño", nombre: "Antioqueño Verde", variante: "375 ml", cat: "aguardiente", precio: 25900, img: "uploads/lote_imagenes_procesado_1784310337875/antioqueno-verde-375.webp" },
    { id: "antioqueno-verde-750", casa: "Antioqueño", nombre: "Antioqueño Verde", variante: "750 ml", cat: "aguardiente", precio: 49900, img: "uploads/lote_imagenes_procesado_1784310337875/antioqueno-verde-750.webp", tag: "Más vendido" },
    { id: "antioqueno-azul-750", casa: "Antioqueño", nombre: "Antioqueño Azul", variante: "750 ml", cat: "aguardiente", precio: 55900, img: "uploads/lote_imagenes_procesado_1784310337875/antioqueno-azul-750.webp" },
    { id: "tetrapack-litro-verde", casa: "Antioqueño", nombre: "Tetrapack Litro verde", variante: "", cat: "aguardiente", precio: 61900, img: "uploads/lote_imagenes_procesado_1784310337875/tetrapack-litro-verde.webp" },
    { id: "antioqueno-verde-1000", casa: "Antioqueño", nombre: "Antioqueño Verde", variante: "1 L", cat: "aguardiente", precio: 64900, img: "uploads/lote_imagenes_procesado_1784310337875/antioqueno-verde-1000.webp" },
    { id: "tetrapack-litro-azul", casa: "Antioqueño", nombre: "Tetrapack Litro Azul", variante: "", cat: "aguardiente", precio: 64900, img: "uploads/lote_imagenes_procesado_1784310337875/tetrapack-litro-azul.webp" },
    { id: "antioqueno-azul-1000", casa: "Antioqueño", nombre: "Antioqueño Azul", variante: "1 L", cat: "aguardiente", precio: 72900, img: "uploads/lote_imagenes_procesado_1784310337875/antioqueno-azul-1000.webp" },
    { id: "antioqueno-verde-1750", casa: "Antioqueño", nombre: "Antioqueño Verde", variante: "1.75 L", cat: "aguardiente", precio: 106900, img: "uploads/lote_imagenes_procesado_1784310337875/antioqueno-verde-1750.webp" },
    { id: "antioqueno-azul-1750", casa: "Antioqueño", nombre: "Antioqueño Azul", variante: "1.75 L", cat: "aguardiente", precio: 138900, img: "uploads/lote_imagenes_procesado_1784310337875/antioqueno-azul-1750.webp" },
    { id: "aguardiente-real-750", casa: "Real", nombre: "Aguardiente Real", variante: "750 ml", cat: "aguardiente", precio: 49900, img: "uploads/lote_imagenes_procesado_1784310337875/aguardiente-real-750.webp" },
    // ===== RON =====
    { id: "ron-bacardi-mojito-750", casa: "Bacardí", nombre: "Ron Bacardi Mojito", variante: "750 ml", cat: "ron", precio: 54900, img: "uploads/lote_imagenes_procesado_1784310337875/ron-bacardi-mojito-750.webp" },
    { id: "ron-bacardi-superior-750", casa: "Bacardí", nombre: "Ron Bacardi Superior", variante: "750 ml", cat: "ron", precio: 59900, img: "uploads/lote_imagenes_procesado_1784310337875/ron-bacardi-superior-750.webp" },
    { id: "ron-medellin-dorado-375", casa: "Ron Medellín", nombre: "Ron Medellin Dorado", variante: "375 ml", cat: "ron", precio: 29900, img: "uploads/lote_imagenes_procesado_1784310337875/ron-medellin-dorado-375.webp" },
    { id: "ron-medellin-375", casa: "Ron Medellín", nombre: "Ron Medellin", variante: "375 ml", cat: "ron", precio: 30900, img: "uploads/lote_imagenes_procesado_1784310337875/ron-medellin-375.webp" },
    { id: "ron-medellin-extra-anejo-5-anos-375", casa: "Ron Medellín", nombre: "Ron Medellin Extra Añejo 5 Años", variante: "375 ml", cat: "ron", precio: 39900, img: "uploads/lote_imagenes_procesado_1784310337875/ron-medellin-extra-anejo-5-anos-375.webp" },
    { id: "ron-medellin-750", casa: "Ron Medellín", nombre: "Ron Medellin", variante: "750 ml", cat: "ron", precio: 59900, img: "uploads/lote_imagenes_procesado_1784310337875/ron-medellin-750.webp", tag: "Más vendido" },
    { id: "ron-medellin-extra-anejo-5-anos-750", casa: "Ron Medellín", nombre: "Ron Medellin Extra Añejo 5 Años", variante: "750 ml", cat: "ron", precio: 72900, img: "uploads/lote_imagenes_procesado_1784310337875/ron-medellin-extra-anejo-5-anos-750.webp" },
    { id: "tetra-medellin", casa: "Ron Medellín", nombre: "Tetra Medellin", variante: "", cat: "ron", precio: 72900, img: "uploads/lote_imagenes_procesado_1784310337875/tetra-medellin.webp" },
    { id: "ron-medellin-1-litro", casa: "Ron Medellín", nombre: "Ron Medellin 1 Litro", variante: "", cat: "ron", precio: 74900, img: "uploads/lote_imagenes_procesado_1784310337875/ron-medellin-1-litro.webp" },
    { id: "ron-medellin-extra-anejo-8-anos-750", casa: "Ron Medellín", nombre: "Ron Medellin Extra Añejo 8 Años", variante: "750 ml", cat: "ron", precio: 94900, img: "uploads/lote_imagenes_procesado_1784310337875/ron-medellin-extra-anejo-8-anos-750.webp" },
    { id: "medellin-2000ml", casa: "Ron Medellín", nombre: "Medellin 2000ml", variante: "", cat: "ron", precio: 149900, img: "uploads/lote_imagenes_procesado_1784310337875/medellin-2000ml.webp" },
    { id: "ron-viejo-de-caldas-licor-esencial", casa: "Viejo de Caldas", nombre: "Ron Viejo de Caldas Licor Esencial", variante: "", cat: "ron", precio: 49900, img: "uploads/lote_imagenes_procesado_1784310337875/ron-viejo-de-caldas-licor-esencial.webp" },
    { id: "ron-viejo-caldas-roble-blanco", casa: "Viejo de Caldas", nombre: "Ron Viejo Caldas Roble blanco", variante: "", cat: "ron", precio: 51900, img: "uploads/lote_imagenes_procesado_1784310337875/ron-viejo-caldas-roble-blanco.webp" },
    { id: "ron-viejo-de-caldas-750", casa: "Viejo de Caldas", nombre: "Ron Viejo de Caldas", variante: "750 ml", cat: "ron", precio: 55900, img: "uploads/lote_imagenes_procesado_1784310337875/ron-viejo-de-caldas-750.webp" },
    { id: "ron-viejo-caldas-oscuro", casa: "Viejo de Caldas", nombre: "Ron Viejo Caldas Oscuro", variante: "", cat: "ron", precio: 59900, img: "uploads/lote_imagenes_procesado_1784310337875/ron-viejo-caldas-oscuro.webp" },
    { id: "ron-viejo-de-caldas-5-anos", casa: "Viejo de Caldas", nombre: "Ron Viejo de Caldas 5 Años", variante: "", cat: "ron", precio: 72900, img: "uploads/lote_imagenes_procesado_1784310337875/ron-viejo-de-caldas-5-anos.webp" },
    { id: "ron-viejo-de-caldas-8-anos-750", casa: "Viejo de Caldas", nombre: "Ron Viejo de Caldas 8 Años", variante: "750 ml", cat: "ron", precio: 114900, img: "uploads/lote_imagenes_procesado_1784310337875/ron-viejo-de-caldas-8-anos-750.webp" },
    { id: "gran-reserva-especial-caldas-15-anos", casa: "Viejo de Caldas", nombre: "Gran Reserva Especial Caldas 15 Años", variante: "", cat: "ron", precio: 154900, img: "uploads/lote_imagenes_procesado_1784310337875/gran-reserva-especial-caldas-15-anos.webp" },
    // ===== WHISKEY =====
    { id: "black-white-700", casa: "Black & White", nombre: "Black & White", variante: "700 ml", cat: "whiskey", precio: 56900, img: "uploads/lote_imagenes_procesado_1784310337875/black-white-700.webp" },
    { id: "buchanans-12-375", casa: "Buchanan's", nombre: "Buchanans 12", variante: "375 ml", cat: "whiskey", precio: 94900, img: "uploads/lote_imagenes_procesado_1784310337875/buchanans-12-375.webp" },
    { id: "buchanans-12-750", casa: "Buchanan's", nombre: "Buchanans 12", variante: "750 ml", cat: "whiskey", precio: 177900, img: "uploads/lote_imagenes_procesado_1784310337875/buchanans-12-750.webp", tag: "Más vendido" },
    { id: "buchanans-master-750", casa: "Buchanan's", nombre: "Buchanans Master", variante: "750 ml", cat: "whiskey", precio: 203900, img: "uploads/lote_imagenes_procesado_1784310337875/buchanans-master-750.webp" },
    { id: "buchanans-two-souls-750", casa: "Buchanan's", nombre: "Buchanans Two Souls", variante: "750 ml", cat: "whiskey", precio: 204900, img: "uploads/lote_imagenes_procesado_1784310337875/buchanans-two-souls-750.webp" },
    { id: "buchanans-12-1000", casa: "Buchanan's", nombre: "Buchanans 12", variante: "1 L", cat: "whiskey", precio: 224900, img: "uploads/lote_imagenes_procesado_1784310337875/buchanans-12-1000.webp" },
    { id: "buchanans-master-1000", casa: "Buchanan's", nombre: "Buchanans Master", variante: "1 L", cat: "whiskey", precio: 246900, img: "uploads/lote_imagenes_procesado_1784310337875/buchanans-master-1000.webp" },
    { id: "buchanans-18", casa: "Buchanan's", nombre: "Buchanans 18", variante: "", cat: "whiskey", precio: 406900, img: "uploads/lote_imagenes_procesado_1784310337875/buchanans-18.webp" },
    { id: "chivas-regal-12-700", casa: "Chivas Regal", nombre: "Chivas Regal 12", variante: "700 ml", cat: "whiskey", precio: 144900, img: "uploads/lote_imagenes_procesado_1784310337875/chivas-regal-12-700.webp" },
    { id: "whisky-glenfiddich-12-750", casa: "Glenfiddich", nombre: "Whisky Glenfiddich 12", variante: "750 ml", cat: "whiskey", precio: 209900, img: "uploads/lote_imagenes_procesado_1784310337875/whisky-glenfiddich-12-750.webp" },
    { id: "whisky-glenfiddich-15-750", casa: "Glenfiddich", nombre: "Whisky Glenfiddich 15", variante: "750 ml", cat: "whiskey", precio: 319900, img: "uploads/lote_imagenes_procesado_1784310337875/whisky-glenfiddich-15-750.webp" },
    { id: "whiskey-glenmorangie-nectar-dor-700", casa: "Glenmorangie", nombre: "Whiskey Glenmorangie Nectar Dor", variante: "700 ml", cat: "whiskey", precio: 359900, img: "uploads/lote_imagenes_procesado_1784310337875/whiskey-glenmorangie-nectar-dor-700.webp" },
    { id: "jack-daniels-fire-750", casa: "Jack Daniel's", nombre: "Jack Daniels Fire", variante: "750 ml", cat: "whiskey", precio: 129900, img: "uploads/lote_imagenes_procesado_1784310337875/jack-daniels-fire-750.webp" },
    { id: "jack-daniels-green-apple-700", casa: "Jack Daniel's", nombre: "Jack Daniels Green Apple", variante: "700 ml", cat: "whiskey", precio: 129900, img: "uploads/lote_imagenes_procesado_1784310337875/jack-daniels-green-apple-700.webp" },
    { id: "jack-daniels-honey-750", casa: "Jack Daniel's", nombre: "Jack Daniels Honey", variante: "750 ml", cat: "whiskey", precio: 129900, img: "uploads/lote_imagenes_procesado_1784310337875/jack-daniels-honey-750.webp" },
    { id: "jhonnie-walker-red-375", casa: "Johnnie Walker", nombre: "Johnnie Walker Red", variante: "375 ml", cat: "whiskey", precio: 47900, img: "uploads/lote_imagenes_procesado_1784310337875/jhonnie-walker-red-375.webp" },
    { id: "jhonnie-walker-red-label-750", casa: "Johnnie Walker", nombre: "Johnnie Walker Red Label", variante: "750 ml", cat: "whiskey", precio: 74900, img: "uploads/lote_imagenes_procesado_1784310337875/jhonnie-walker-red-label-750.webp" },
    { id: "jhonnie-walker-black-375", casa: "Johnnie Walker", nombre: "Johnnie Walker Black", variante: "375 ml", cat: "whiskey", precio: 84900, img: "uploads/lote_imagenes_procesado_1784310337875/jhonnie-walker-black-375.webp" },
    { id: "jhonnie-walker-red-1000", casa: "Johnnie Walker", nombre: "Johnnie Walker Red", variante: "1 L", cat: "whiskey", precio: 94900, img: "uploads/lote_imagenes_procesado_1784310337875/jhonnie-walker-red-1000.webp" },
    { id: "jhonnie-walker-black-label-700", casa: "Johnnie Walker", nombre: "Johnnie Walker Black Label", variante: "700 ml", cat: "whiskey", precio: 154900, img: "uploads/lote_imagenes_procesado_1784310337875/jhonnie-walker-black-label-700.webp" },
    { id: "jhonnie-walker-double-black-700", casa: "Johnnie Walker", nombre: "Johnnie Walker Double Black", variante: "700 ml", cat: "whiskey", precio: 189900, img: "uploads/lote_imagenes_procesado_1784310337875/jhonnie-walker-double-black-700.webp" },
    { id: "jhonnie-walker-black-1000", casa: "Johnnie Walker", nombre: "Johnnie Walker Black", variante: "1 L", cat: "whiskey", precio: 194900, img: "uploads/lote_imagenes_procesado_1784310337875/jhonnie-walker-black-1000.webp" },
    { id: "whisky-macallan-double-cask-12-700", casa: "Macallan", nombre: "Whisky Macallan Double Cask 12", variante: "700 ml", cat: "whiskey", precio: 469900, img: "uploads/lote_imagenes_procesado_1784310337875/whisky-macallan-double-cask-12-700.webp" },
    { id: "whisky-macallan-triple-cask-12-700", casa: "Macallan", nombre: "Whisky Macallan Triple Cask 12", variante: "700 ml", cat: "whiskey", precio: 469900, img: "uploads/lote_imagenes_procesado_1784310337875/whisky-macallan-triple-cask-12-700.webp" },
    { id: "whisky-macallan-sherry-oak-12-750", casa: "Macallan", nombre: "Whisky Macallan Sherry OAK 12", variante: "750 ml", cat: "whiskey", precio: 519900, img: "uploads/lote_imagenes_procesado_1784310337875/whisky-macallan-sherry-oak-12-750.webp" },
    { id: "old-parr-12-500", casa: "Old Parr", nombre: "Old Parr 12", variante: "500 ml", cat: "whiskey", precio: 104900, img: "uploads/lote_imagenes_procesado_1784310337875/old-parr-12-500.webp" },
    { id: "old-parr-12-750", casa: "Old Parr", nombre: "Old Parr 12", variante: "750 ml", cat: "whiskey", precio: 154900, img: "uploads/lote_imagenes_procesado_1784310337875/old-parr-12-750.webp" },
    { id: "old-parr-12-1000", casa: "Old Parr", nombre: "Old Parr 12", variante: "1 L", cat: "whiskey", precio: 194900, img: "uploads/lote_imagenes_procesado_1784310337875/old-parr-12-1000.webp" },
    { id: "something-special", casa: "Something Special", nombre: "Something Special", variante: "", cat: "whiskey", precio: 74900, img: "uploads/lote_imagenes_procesado_1784310337875/something-special.webp" },
    { id: "whisky-the-famous-grouse-700", casa: "The Famous Grouse", nombre: "Whisky The Famous Grouse", variante: "700 ml", cat: "whiskey", precio: 79900, img: "uploads/lote_imagenes_procesado_1784310337875/whisky-the-famous-grouse-700.webp" },
    { id: "the-glenlivet-12-700", casa: "The Glenlivet", nombre: "The Glenlivet 12", variante: "700 ml", cat: "whiskey", precio: 169900, img: "uploads/lote_imagenes_procesado_1784310337875/the-glenlivet-12-700.webp" },
    { id: "the-glenlivet-caribbean-reserve", casa: "The Glenlivet", nombre: "The Glenlivet Caribbean Reserve", variante: "", cat: "whiskey", precio: 169900, img: "uploads/lote_imagenes_procesado_1784310337875/the-glenlivet-caribbean-reserve.webp" },
    { id: "the-glenlivet-founders-700", casa: "The Glenlivet", nombre: "The Glenlivet Founders", variante: "700 ml", cat: "whiskey", precio: 174900, img: "uploads/lote_imagenes_procesado_1784310337875/the-glenlivet-founders-700.webp" },
    { id: "the-glenlivet-captains-reserve", casa: "The Glenlivet", nombre: "The Glenlivet Captains Reserve", variante: "", cat: "whiskey", precio: 249900, img: "uploads/lote_imagenes_procesado_1784310337875/the-glenlivet-captains-reserve.webp" },
    { id: "singleton-12-700", casa: "The Singleton", nombre: "Singleton 12", variante: "700 ml", cat: "whiskey", precio: 179900, img: "uploads/lote_imagenes_procesado_1784310337875/singleton-12-700.webp" },
    // ===== TEQUILA =====
    { id: "tequila-don-julio-blanco-375", casa: "Don Julio", nombre: "Tequila Don Julio Blanco", variante: "375 ml", cat: "tequila", precio: 179900, img: "uploads/lote_imagenes_procesado_1784310337875/tequila-don-julio-blanco-375.webp" },
    { id: "tequila-don-julio-blanco-700", casa: "Don Julio", nombre: "Tequila Don Julio Blanco", variante: "700 ml", cat: "tequila", precio: 239900, img: "uploads/lote_imagenes_procesado_1784310337875/tequila-don-julio-blanco-700.webp" },
    { id: "tequila-don-julio-70-cristalino-700", casa: "Don Julio", nombre: "Tequila Don Julio 70 Cristalino", variante: "700 ml", cat: "tequila", precio: 399900, img: "uploads/lote_imagenes_procesado_1784310337875/tequila-don-julio-70-cristalino-700.webp" },
    { id: "tequila-jose-cuervo-especial-750", casa: "José Cuervo", nombre: "Tequila Jose Cuervo Especial", variante: "750 ml", cat: "tequila", precio: 94900, img: "uploads/lote_imagenes_procesado_1784310337875/tequila-jose-cuervo-especial-750.webp" },
    { id: "tequila-olmeca-reposado-700", casa: "Olmeca", nombre: "Tequila Olmeca Reposado", variante: "700 ml", cat: "tequila", precio: 89900, img: "uploads/lote_imagenes_procesado_1784310337875/tequila-olmeca-reposado-700.webp" },
    { id: "tequila-patron-silver-700", casa: "Patrón", nombre: "Tequila Patron Silver", variante: "700 ml", cat: "tequila", precio: 234900, img: "uploads/lote_imagenes_procesado_1784310337875/tequila-patron-silver-700.webp" },
    { id: "tequila-patron-cristalino-700", casa: "Patrón", nombre: "Tequila Patron Cristalino", variante: "700 ml", cat: "tequila", precio: 389900, img: "uploads/lote_imagenes_procesado_1784310337875/tequila-patron-cristalino-700.webp" },
    // ===== GINEBRA =====
    { id: "ginebra-bombay-sapphire-750", casa: "Bombay Sapphire", nombre: "Ginebra Bombay Sapphire", variante: "750 ml", cat: "ginebra", precio: 144900, img: "uploads/lote_imagenes_procesado_1784310337875/ginebra-bombay-sapphire-750.webp" },
    { id: "gordon-dry-700", casa: "Gordon's", nombre: "Gordon Dry", variante: "700 ml", cat: "ginebra", precio: 84900, img: "uploads/lote_imagenes_procesado_1784310337875/gordon-dry-700.webp" },
    // ===== VODKA =====
    { id: "smirnoff-greenapple-botella-275", casa: "Smirnoff", nombre: "Smirnoff Greenapple Botella", variante: "275 ml", cat: "vodka", precio: 9000, img: "uploads/lote_imagenes_procesado_1784310337875/smirnoff-greenapple-botella-275.webp" },
    { id: "smirnoff-ice-red-botella-275", casa: "Smirnoff", nombre: "Smirnoff Ice Red Botella", variante: "275 ml", cat: "vodka", precio: 9000, img: "uploads/lote_imagenes_procesado_1784310337875/smirnoff-ice-red-botella-275.webp" },
    { id: "smirnoff-lulo-x1-375", casa: "Smirnoff", nombre: "Smirnoff Lulo X1", variante: "375 ml", cat: "vodka", precio: 27900, img: "uploads/lote_imagenes_procesado_1784310337875/smirnoff-lulo-x1-375.webp" },
    { id: "smirnoff-lulo-750-sin-azucar", casa: "Smirnoff", nombre: "Smirnoff Lulo Sin Azucar", variante: "750 ml", cat: "vodka", precio: 49900, img: "uploads/lote_imagenes_procesado_1784310337875/smirnoff-lulo-750-sin-azucar.webp" },
    { id: "smirnoff-lulo-x1-750", casa: "Smirnoff", nombre: "Smirnoff Lulo X1", variante: "750 ml", cat: "vodka", precio: 49900, img: "uploads/lote_imagenes_procesado_1784310337875/smirnoff-lulo-x1-750.webp" },
    { id: "smirnoff-tamarindo-750ml", casa: "Smirnoff", nombre: "Smirnoff Tamarindo 750ml", variante: "", cat: "vodka", precio: 49900, img: "uploads/lote_imagenes_procesado_1784310337875/smirnoff-tamarindo-750ml.webp" },
    // ===== APERITIVOS =====
    { id: "aperitivo-pina-colada-convier", casa: "Aperitivos", nombre: "Aperitivo Piña Colada Convier", variante: "", cat: "aperitivos", precio: 49900, img: "uploads/lote_imagenes_procesado_1784310337875/aperitivo-pina-colada-convier.webp" },
    { id: "four-loko-frutas", casa: "Four Loko", nombre: "Four Loko Frutas", variante: "", cat: "aperitivos", precio: 20000, img: "uploads/lote_imagenes_procesado_1784310337875/four-loko-frutas.webp" },
    { id: "four-loko-gold", casa: "Four Loko", nombre: "Four Loko Gold", variante: "", cat: "aperitivos", precio: 20000, img: "uploads/lote_imagenes_procesado_1784310337875/four-loko-gold.webp" },
    { id: "four-loko-green-apple", casa: "Four Loko", nombre: "Four Loko green apple", variante: "", cat: "aperitivos", precio: 20000, img: "uploads/lote_imagenes_procesado_1784310337875/four-loko-green-apple.webp" },
    { id: "four-loko-lulo", casa: "Four Loko", nombre: "Four Loko Lulo", variante: "", cat: "aperitivos", precio: 20000, img: "uploads/lote_imagenes_procesado_1784310337875/four-loko-lulo.webp" },
    { id: "four-loko-morado", casa: "Four Loko", nombre: "Four Loko Morado", variante: "", cat: "aperitivos", precio: 20000, img: "uploads/lote_imagenes_procesado_1784310337875/four-loko-morado.webp" },
    { id: "margarita", casa: "Margarita", nombre: "Margarita", variante: "", cat: "aperitivos", precio: 23000, img: "uploads/lote_imagenes_procesado_1784310337875/margarita.webp" },
    // ===== VINOS =====
    { id: "vino-blanco-terra-vega-sauvignon", casa: "Terra Vega", nombre: "Vino Blanco Terra Vega Sauvignon", variante: "", cat: "vinos", precio: 49900, img: "uploads/lote_imagenes_procesado_1784310337875/vino-blanco-terra-vega-sauvignon.webp" },
    { id: "vino-tinto-terra-vega-sauvignon", casa: "Terra Vega", nombre: "Vino Tinto Terra Vega Sauvignon", variante: "", cat: "vinos", precio: 49900, img: "uploads/lote_imagenes_procesado_1784310337875/vino-tinto-terra-vega-sauvignon.webp" },
    // ===== CERVEZA =====
    { id: "aguila-imperial-330", casa: "Águila", nombre: "Aguila Imperial", variante: "330 ml", cat: "cerveza", precio: 3500, img: "uploads/lote_imagenes_procesado_1784310337875/aguila-imperial-330.webp" },
    { id: "aguila-light", casa: "Águila", nombre: "Aguila Light", variante: "", cat: "cerveza", precio: 3500, img: "uploads/lote_imagenes_procesado_1784310337875/aguila-light.webp" },
    { id: "aguila-negra", casa: "Águila", nombre: "Aguila Negra", variante: "", cat: "cerveza", precio: 3500, img: "uploads/lote_imagenes_procesado_1784310337875/aguila-negra.webp", tag: "Más vendido" },
    { id: "aguila-negra-lata", casa: "Águila", nombre: "Aguila Negra Lata", variante: "", cat: "cerveza", precio: 3500, img: "uploads/lote_imagenes_procesado_1784310337875/aguila-negra-lata.webp" },
    { id: "bretana", casa: "Bretaña", nombre: "Bretaña", variante: "", cat: "cerveza", precio: 3000, img: "uploads/lote_imagenes_procesado_1784310337875/bretana.webp" },
    { id: "budweiser-botella-250", casa: "Budweiser", nombre: "Budweiser Botella", variante: "250 ml", cat: "cerveza", precio: 3000, img: "uploads/lote_imagenes_procesado_1784310337875/budweiser-botella-250.webp" },
    { id: "budweiser-lata", casa: "Budweiser", nombre: "Budweiser Lata", variante: "", cat: "cerveza", precio: 3000, img: "uploads/lote_imagenes_procesado_1784310337875/budweiser-lata.webp" },
    { id: "club-colombia-dorada-botella-330", casa: "Club Colombia", nombre: "Club Colombia Dorada Botella", variante: "330 ml", cat: "cerveza", precio: 4000, img: "uploads/lote_imagenes_procesado_1784310337875/club-colombia-dorada-botella-330.webp" },
    { id: "club-colombia-trigo-330", casa: "Club Colombia", nombre: "Club Colombia Trigo", variante: "330 ml", cat: "cerveza", precio: 4000, img: "uploads/lote_imagenes_procesado_1784310337875/club-colombia-trigo-330.webp" },
    { id: "cola-y-pola", casa: "Cola & Pola", nombre: "Cola & Pola", variante: "", cat: "cerveza", precio: 4000, img: "uploads/lote_imagenes_procesado_1784310337875/cola-y-pola.webp" },
    { id: "corona-botella-cero-330", casa: "Corona", nombre: "Corona Botella Cero", variante: "330 ml", cat: "cerveza", precio: 4500, img: "uploads/lote_imagenes_procesado_1784310337875/corona-botella-cero-330.webp" },
    { id: "corona-botella-330", casa: "Corona", nombre: "Corona Botella", variante: "330 ml", cat: "cerveza", precio: 4700, img: "uploads/lote_imagenes_procesado_1784310337875/corona-botella-330.webp" },
    { id: "coronita-botella-210", casa: "Coronita", nombre: "Coronita Botella", variante: "210 ml", cat: "cerveza", precio: 4000, img: "uploads/lote_imagenes_procesado_1784310337875/coronita-botella-210.webp" },
    { id: "costenita", casa: "Costeña", nombre: "Costeñita", variante: "", cat: "cerveza", precio: 3000, img: "uploads/lote_imagenes_procesado_1784310337875/costenita.webp" },
    { id: "costena-bacana-botella", casa: "Costeña", nombre: "Costeña Bacana Botella", variante: "", cat: "cerveza", precio: 3500, img: "uploads/lote_imagenes_procesado_1784310337875/costena-bacana-botella.webp" },
    { id: "costena-bacana-lata", casa: "Costeña", nombre: "Costeña Bacana Lata", variante: "", cat: "cerveza", precio: 3500, img: "uploads/lote_imagenes_procesado_1784310337875/costena-bacana-lata.webp" },
    { id: "cerveza-michelob", casa: "Michelob", nombre: "Cerveza Michelob", variante: "", cat: "cerveza", precio: 3300, img: "uploads/lote_imagenes_procesado_1784310337875/cerveza-michelob.webp" },
    { id: "modelo-especial-rubia", casa: "Modelo", nombre: "Modelo Especial Rubia", variante: "", cat: "cerveza", precio: 6500, img: "uploads/lote_imagenes_procesado_1784310337875/modelo-especial-rubia.webp" },
    { id: "poker", casa: "Poker", nombre: "Poker", variante: "", cat: "cerveza", precio: 3500, img: "uploads/lote_imagenes_procesado_1784310337875/poker.webp", tag: "Más vendido" },
    { id: "pony-malta", casa: "Pony Malta", nombre: "Pony Malta", variante: "", cat: "cerveza", precio: 3000, img: "uploads/lote_imagenes_procesado_1784310337875/pony-malta.webp" },
    { id: "redds-lata", casa: "Redd's", nombre: "Redds Lata", variante: "", cat: "cerveza", precio: 3500, img: "uploads/lote_imagenes_procesado_1784310337875/redds-lata.webp" },
    { id: "redds-lata-rose", casa: "Redd's", nombre: "Redds Lata Rose", variante: "", cat: "cerveza", precio: 3500, img: "uploads/lote_imagenes_procesado_1784310337875/redds-lata-rose.webp" },
    { id: "stella-artois-lata", casa: "Stella Artois", nombre: "Stella Artois Lata", variante: "", cat: "cerveza", precio: 4500, img: "uploads/lote_imagenes_procesado_1784310337875/stella-artois-lata.webp" },
    { id: "stella-artois-botella-330", casa: "Stella Artois", nombre: "Stella Artois Botella", variante: "330 ml", cat: "cerveza", precio: 5000, img: "uploads/lote_imagenes_procesado_1784310337875/stella-artois-botella-330.webp" },
    // ===== BEBIDAS & MEZCLADORES =====
    { id: "agua", casa: "Agua ", nombre: "Agua", variante: "", cat: "bebidas", precio: 2500, img: "uploads/lote_imagenes_procesado_1784310337875/agua.webp" },
    { id: "canada-dry-ginger-ale", casa: "Canada Dry", nombre: "Canada Dry Ginger Ale", variante: "", cat: "bebidas", precio: 3000, img: "uploads/lote_imagenes_procesado_1784310337875/canada-dry-ginger-ale.webp" },
    { id: "coca-cola", casa: "Coca-Cola", nombre: "Coca Cola", variante: "", cat: "bebidas", precio: 4000, img: "uploads/lote_imagenes_procesado_1784310337875/coca-cola.webp", tag: "Más vendido" },
    { id: "coca-cola-zero", casa: "Coca-Cola", nombre: "Coca Cola Zero", variante: "", cat: "bebidas", precio: 4000, img: "uploads/lote_imagenes_procesado_1784310337875/coca-cola-zero.webp" },
    { id: "electrolit-fresa", casa: "Electrolit", nombre: "Electrolit Fresa", variante: "", cat: "bebidas", precio: 8500, img: "uploads/lote_imagenes_procesado_1784310337875/electrolit-fresa.webp" },
    { id: "electrolit-fresa-kiwi", casa: "Electrolit", nombre: "Electrolit Fresa Kiwi", variante: "", cat: "bebidas", precio: 8500, img: "uploads/lote_imagenes_procesado_1784310337875/electrolit-fresa-kiwi.webp" },
    { id: "electrolit-maracuya", casa: "Electrolit", nombre: "Electrolit Maracuya", variante: "", cat: "bebidas", precio: 8500, img: "uploads/lote_imagenes_procesado_1784310337875/electrolit-maracuya.webp" },
    { id: "electrolit-mora-azul", casa: "Electrolit", nombre: "Electrolit Mora Azul", variante: "", cat: "bebidas", precio: 8500, img: "uploads/lote_imagenes_procesado_1784310337875/electrolit-mora-azul.webp" },
    { id: "electrolit-naranja-mandarina", casa: "Electrolit", nombre: "Electrolit Naranja Mandarina", variante: "", cat: "bebidas", precio: 8500, img: "uploads/lote_imagenes_procesado_1784310337875/electrolit-naranja-mandarina.webp" },
    { id: "electrolit-ponche-de-frutas", casa: "Electrolit", nombre: "Electrolit Ponche de Frutas", variante: "", cat: "bebidas", precio: 8500, img: "uploads/lote_imagenes_procesado_1784310337875/electrolit-ponche-de-frutas.webp" },
    { id: "electrolit-uva", casa: "Electrolit", nombre: "Electrolit Uva", variante: "", cat: "bebidas", precio: 8500, img: "uploads/lote_imagenes_procesado_1784310337875/electrolit-uva.webp" },
    { id: "gaseosa-kola", casa: "Gaseosas", nombre: "Gaseosa Kola", variante: "", cat: "bebidas", precio: 4000, img: "uploads/lote_imagenes_procesado_1784310337875/gaseosa-kola.webp" },
    { id: "gaseosa-pepsi", casa: "Gaseosas", nombre: "Gaseosa Pepsi", variante: "", cat: "bebidas", precio: 4000, img: "uploads/lote_imagenes_procesado_1784310337875/gaseosa-pepsi.webp" },
    { id: "gatorade", casa: "Gatorade", nombre: "Gatorade", variante: "", cat: "bebidas", precio: 4000, img: "uploads/lote_imagenes_procesado_1784310337875/gatorade.webp" },
    { id: "soda-hatsu-frambuesa", casa: "Hatsu", nombre: "Soda Hatsu Frambuesa", variante: "", cat: "bebidas", precio: 4000, img: "uploads/lote_imagenes_procesado_1784310337875/soda-hatsu-frambuesa.webp" },
    { id: "soda-hatsu-limon-hierbabuena", casa: "Hatsu", nombre: "Soda Hatsu limon Hierbabuena", variante: "", cat: "bebidas", precio: 4000, img: "uploads/lote_imagenes_procesado_1784310337875/soda-hatsu-limon-hierbabuena.webp" },
    { id: "soda-hatsu-sandia-albahaca", casa: "Hatsu", nombre: "Soda Hatsu Sandia Albahaca", variante: "", cat: "bebidas", precio: 4000, img: "uploads/lote_imagenes_procesado_1784310337875/soda-hatsu-sandia-albahaca.webp" },
    { id: "soda-hatsu-uva-blanca-y-romero", casa: "Hatsu", nombre: "Soda Hatsu Uva Blanca y Romero", variante: "", cat: "bebidas", precio: 4000, img: "uploads/lote_imagenes_procesado_1784310337875/soda-hatsu-uva-blanca-y-romero.webp" },
    { id: "bolsa-de-hielo", casa: "Hielo", nombre: "Bolsa De Hielo", variante: "", cat: "bebidas", precio: 8000, img: "uploads/lote_imagenes_procesado_1784310337875/bolsa-de-hielo.webp" },
    { id: "red-bull-lata-250", casa: "Red Bull", nombre: "Red Bull Lata", variante: "250 ml", cat: "bebidas", precio: 8500, img: "uploads/lote_imagenes_procesado_1784310337875/red-bull-lata-250.webp" },
    // ===== VAPES =====
    { id: "box-pod-banana", casa: "Box Pod", nombre: "Box Pod Banana", variante: "", cat: "vapes", precio: 45000, img: "uploads/lote_imagenes_procesado_1784310337875/box-pod-banana.webp" },
    { id: "box-pod-black-ice", casa: "Box Pod", nombre: "Box Pod Black Ice", variante: "", cat: "vapes", precio: 45000, img: "uploads/lote_imagenes_procesado_1784310337875/box-pod-black-ice.webp" },
    { id: "box-pod-blueberry", casa: "Box Pod", nombre: "Box Pod Blueberry", variante: "", cat: "vapes", precio: 45000, img: "uploads/lote_imagenes_procesado_1784310337875/box-pod-blueberry.webp" },
    { id: "box-pod-fusion", casa: "Box Pod", nombre: "Box Pod Fusion", variante: "", cat: "vapes", precio: 45000, img: "uploads/lote_imagenes_procesado_1784310337875/box-pod-fusion.webp" },
    { id: "box-pod-lima-durazno", casa: "Box Pod", nombre: "Box Pod Lima Durazno", variante: "", cat: "vapes", precio: 45000, img: "uploads/lote_imagenes_procesado_1784310337875/box-pod-lima-durazno.webp" },
    { id: "box-pod-lulo", casa: "Box Pod", nombre: "Box Pod Lulo", variante: "", cat: "vapes", precio: 45000, img: "uploads/lote_imagenes_procesado_1784310337875/box-pod-lulo.webp" },
    { id: "box-pod-mango", casa: "Box Pod", nombre: "Box Pod Mango", variante: "", cat: "vapes", precio: 45000, img: "uploads/lote_imagenes_procesado_1784310337875/box-pod-mango.webp" },
    { id: "box-pod-manzana", casa: "Box Pod", nombre: "Box Pod Manzana", variante: "", cat: "vapes", precio: 45000, img: "uploads/lote_imagenes_procesado_1784310337875/box-pod-manzana.webp" },
    { id: "box-pod-pina-colada", casa: "Box Pod", nombre: "Box Pod Piña Colada", variante: "", cat: "vapes", precio: 45000, img: "uploads/lote_imagenes_procesado_1784310337875/box-pod-pina-colada.webp" },
    { id: "box-pod-sandia", casa: "Box Pod", nombre: "Box Pod Sandia", variante: "", cat: "vapes", precio: 45000, img: "uploads/lote_imagenes_procesado_1784310337875/box-pod-sandia.webp" },
    { id: "box-pod-uva", casa: "Box Pod", nombre: "Box Pod Uva", variante: "", cat: "vapes", precio: 45000, img: "uploads/lote_imagenes_procesado_1784310337875/box-pod-uva.webp" },
    { id: "geek-grape-jelly-1500", casa: "Geek Bar", nombre: "Geek Grape Jelly 1500", variante: "", cat: "vapes", precio: 30000, img: "uploads/lote_imagenes_procesado_1784310337875/geek-grape-jelly-1500.webp" },
    { id: "geek-sour-apple-1500", casa: "Geek Bar", nombre: "Geek Sour Apple 1500", variante: "", cat: "vapes", precio: 30000, img: "uploads/lote_imagenes_procesado_1784310337875/geek-sour-apple-1500.webp" },
    { id: "geek-alaskan-1500", casa: "Geek Bar", nombre: "Geek Alaskan 1500", variante: "", cat: "vapes", precio: 30000, img: "uploads/lote_imagenes_procesado_1784310337875/geek-alaskan-1500.webp" },
    { id: "geek-blueberry-1500", casa: "Geek Bar", nombre: "Geek Blueberry 1500", variante: "", cat: "vapes", precio: 30000, img: "uploads/lote_imagenes_procesado_1784310337875/geek-blueberry-1500.webp" },
    { id: "geek-watermelon-1500", casa: "Geek Bar", nombre: "Geek Watermelon 1500", variante: "", cat: "vapes", precio: 30000, img: "uploads/lote_imagenes_procesado_1784310337875/geek-watermelon-1500.webp" },
    { id: "large-arandano-1300-puff", casa: "Large", nombre: "Large Arandano 1300 puff", variante: "", cat: "vapes", precio: 35000, img: "uploads/lote_imagenes_procesado_1784310337875/large-arandano-1300-puff.webp" },
    { id: "large-banana-1300-puff", casa: "Large", nombre: "Large Banana 1300pff", variante: "", cat: "vapes", precio: 35000, img: "uploads/lote_imagenes_procesado_1784310337875/large-banana-1300-puff.webp" },
    { id: "large-bull-soda-1300-puff", casa: "Large", nombre: "Large Bull Soda 1300pff", variante: "", cat: "vapes", precio: 35000, img: "uploads/lote_imagenes_procesado_1784310337875/large-bull-soda-1300-puff.webp" },
    { id: "large-grape-soda-1300-puff", casa: "Large", nombre: "Large Grape Soda 1300pff", variante: "", cat: "vapes", precio: 35000, img: "uploads/lote_imagenes_procesado_1784310337875/large-grape-soda-1300-puff.webp" },
    { id: "large-lulo-800-puff", casa: "Large", nombre: "Large Lulo 800pff", variante: "", cat: "vapes", precio: 35000, img: "uploads/lote_imagenes_procesado_1784310337875/large-lulo-800-puff.webp" },
    { id: "large-mango-1300-puff", casa: "Large", nombre: "Large Mango 1300 Puff", variante: "", cat: "vapes", precio: 35000, img: "uploads/lote_imagenes_procesado_1784310337875/large-mango-1300-puff.webp" },
    { id: "large-peach-lime-800-puff", casa: "Large", nombre: "Large Peach Lime 800pff", variante: "", cat: "vapes", precio: 35000, img: "uploads/lote_imagenes_procesado_1784310337875/large-peach-lime-800-puff.webp" },
    { id: "large-sandia-1300-puff", casa: "Large", nombre: "Large Sandia 1300 puff", variante: "", cat: "vapes", precio: 35000, img: "uploads/lote_imagenes_procesado_1784310337875/large-sandia-1300-puff.webp" },
    { id: "large-sour-apple-1300-puff", casa: "Large", nombre: "Large Sour Apple 1300pff", variante: "", cat: "vapes", precio: 35000, img: "uploads/lote_imagenes_procesado_1784310337875/large-sour-apple-1300-puff.webp" },
    { id: "like-apple", casa: "Like", nombre: "Like apple", variante: "", cat: "vapes", precio: 5500, img: "uploads/lote_imagenes_procesado_1784310337875/like-apple.webp" },
    { id: "like-blueberry", casa: "Like", nombre: "Like Blueberry", variante: "", cat: "vapes", precio: 5500, img: "uploads/lote_imagenes_procesado_1784310337875/like-blueberry.webp" },
    { id: "like-fresa", casa: "Like", nombre: "Like Fresa", variante: "", cat: "vapes", precio: 5500, img: "uploads/lote_imagenes_procesado_1784310337875/like-fresa.webp" },
    { id: "like-limon", casa: "Like", nombre: "Like Limon", variante: "", cat: "vapes", precio: 5500, img: "uploads/lote_imagenes_procesado_1784310337875/like-limon.webp" },
    { id: "like-mango", casa: "Like", nombre: "Like Mango", variante: "", cat: "vapes", precio: 5500, img: "uploads/lote_imagenes_procesado_1784310337875/like-mango.webp" },
    { id: "los-quates-mango", casa: "Los Cuates", nombre: "Los Quate Mango", variante: "", cat: "vapes", precio: 6000, img: "uploads/lote_imagenes_procesado_1784310337875/los-quates-mango.webp" },
    { id: "los-quates-fresa", casa: "Los Cuates", nombre: "Los Quates Fresa", variante: "", cat: "vapes", precio: 6000, img: "uploads/lote_imagenes_procesado_1784310337875/los-quates-fresa.webp" },
    { id: "los-quates-limon", casa: "Los Cuates", nombre: "Los Quates Limon", variante: "", cat: "vapes", precio: 6000, img: "uploads/lote_imagenes_procesado_1784310337875/los-quates-limon.webp" },
    { id: "velo-nicotina", casa: "Velo", nombre: "Velo Nicotina", variante: "", cat: "vapes", precio: 15000, img: "uploads/lote_imagenes_procesado_1784310337875/velo-nicotina.webp" },
    { id: "vuse-go-1000-banana", casa: "Vuse", nombre: "Vuse Go 1000 Banana", variante: "", cat: "vapes", precio: 30000, img: "uploads/lote_imagenes_procesado_1784310337875/vuse-go-1000-banana.webp" },
    { id: "vuse-go-1000-grape-ice", casa: "Vuse", nombre: "Vuse Go 1000 Grape Ice", variante: "", cat: "vapes", precio: 30000, img: "uploads/lote_imagenes_procesado_1784310337875/vuse-go-1000-grape-ice.webp" },
    { id: "vuse-go-1000-green-apple", casa: "Vuse", nombre: "Vuse Go 1000 Green Apple", variante: "", cat: "vapes", precio: 30000, img: "uploads/lote_imagenes_procesado_1784310337875/vuse-go-1000-green-apple.webp" },
    { id: "vuse-go-1000-menta", casa: "Vuse", nombre: "Vuse Go 1000 Menta", variante: "", cat: "vapes", precio: 30000, img: "uploads/lote_imagenes_procesado_1784310337875/vuse-go-1000-menta.webp" },
    { id: "vuse-go-1000-mora-azul", casa: "Vuse", nombre: "Vuse Go 1000 Mora Azul", variante: "", cat: "vapes", precio: 30000, img: "uploads/lote_imagenes_procesado_1784310337875/vuse-go-1000-mora-azul.webp" },
    { id: "vuse-go-1000-passion-fruit", casa: "Vuse", nombre: "Vuse Go 1000 Passion Fruit", variante: "", cat: "vapes", precio: 30000, img: "uploads/lote_imagenes_procesado_1784310337875/vuse-go-1000-passion-fruit.webp" },
    { id: "vuse-go-1000-watermelon", casa: "Vuse", nombre: "Vuse Go 1000 Watermelon", variante: "", cat: "vapes", precio: 30000, img: "uploads/lote_imagenes_procesado_1784310337875/vuse-go-1000-watermelon.webp" },
    { id: "vuse-ice-blueberry", casa: "Vuse", nombre: "Vuse Ice Blueberry", variante: "", cat: "vapes", precio: 30000, img: "uploads/lote_imagenes_procesado_1784310337875/vuse-ice-blueberry.webp" },
    { id: "vuse-ice-mango", casa: "Vuse", nombre: "Vuse Ice Mango", variante: "", cat: "vapes", precio: 30000, img: "uploads/lote_imagenes_procesado_1784310337875/vuse-ice-mango.webp" },
    { id: "vuse-ice-menta", casa: "Vuse", nombre: "Vuse Ice Menta", variante: "", cat: "vapes", precio: 30000, img: "uploads/lote_imagenes_procesado_1784310337875/vuse-ice-menta.webp" },
    { id: "vuse-ice-sandia", casa: "Vuse", nombre: "Vuse Ice Sandia", variante: "", cat: "vapes", precio: 30000, img: "uploads/lote_imagenes_procesado_1784310337875/vuse-ice-sandia.webp" },
    { id: "vuse-ice-uva", casa: "Vuse", nombre: "Vuse Ice Uva", variante: "", cat: "vapes", precio: 30000, img: "uploads/lote_imagenes_procesado_1784310337875/vuse-ice-uva.webp" },
    { id: "dispositivo-vuse-epod-2", casa: "Vuse", nombre: "Dispositivo Vuse ePod 2", variante: "", cat: "vapes", precio: 32000, img: "uploads/lote_imagenes_procesado_1784310337875/dispositivo-vuse-epod-2.webp" },
    // ===== CIGARRILLOS =====
    { id: "mechera", casa: "Encendedores", nombre: "Mechera", variante: "", cat: "cigarrillos", precio: 2000, img: "uploads/lote_imagenes_procesado_1784310337875/mechera.webp" },
    { id: "lucky-azul", casa: "Lucky Strike", nombre: "Lucky Azul", variante: "", cat: "cigarrillos", precio: 10000, img: "uploads/lote_imagenes_procesado_1784310337875/lucky-azul.webp" },
    { id: "lucky-celeste", casa: "Lucky Strike", nombre: "Lucky celeste", variante: "", cat: "cigarrillos", precio: 10000, img: "uploads/lote_imagenes_procesado_1784310337875/lucky-celeste.webp" },
    { id: "lucky-sandia", casa: "Lucky Strike", nombre: "Lucky Sandia", variante: "", cat: "cigarrillos", precio: 10000, img: "uploads/lote_imagenes_procesado_1784310337875/lucky-sandia.webp" },
    { id: "lucky-verde", casa: "Lucky Strike", nombre: "Lucky Verde", variante: "", cat: "cigarrillos", precio: 10000, img: "uploads/lote_imagenes_procesado_1784310337875/lucky-verde.webp" },
    { id: "rothmans-ruby", casa: "Rothmans", nombre: "Rothmans Ruby", variante: "", cat: "cigarrillos", precio: 6000, img: "uploads/lote_imagenes_procesado_1784310337875/rothmans-ruby.webp" },
    // ===== MECATO =====
    { id: "club-social", casa: "Club Social", nombre: "Club Social", variante: "", cat: "mecato", precio: 2500, img: "uploads/lote_imagenes_procesado_1784310337875/club-social.webp" },
    { id: "detodito-bbq-grande", casa: "Detodito", nombre: "Detodito BBQ Grande", variante: "", cat: "mecato", precio: 5000, img: "uploads/lote_imagenes_procesado_1784310337875/detodito-bbq-grande.webp" },
    { id: "detodito-natural-grande", casa: "Detodito", nombre: "Detodito Natural Grande", variante: "", cat: "mecato", precio: 5000, img: "uploads/lote_imagenes_procesado_1784310337875/detodito-natural-grande.webp" },
    { id: "dorito", casa: "Doritos", nombre: "Dorito", variante: "", cat: "mecato", precio: 4000, img: "uploads/lote_imagenes_procesado_1784310337875/dorito.webp" },
    { id: "halls-barra", casa: "Halls", nombre: "Halls Barra", variante: "", cat: "mecato", precio: 3000, img: "uploads/lote_imagenes_procesado_1784310337875/halls-barra.webp" },
    { id: "natuchips-verde", casa: "NatuChips", nombre: "NatuChips Verde", variante: "", cat: "mecato", precio: 4000, img: "uploads/lote_imagenes_procesado_1784310337875/natuchips-verde.webp" },
    { id: "oreo-original", casa: "Oreo", nombre: "Oreo Original", variante: "", cat: "mecato", precio: 2500, img: "uploads/lote_imagenes_procesado_1784310337875/oreo-original.webp" },
    { id: "pringles-crema-y-cebolla", casa: "Pringles", nombre: "Pringles Crema y Cebolla", variante: "", cat: "mecato", precio: 10000, img: "uploads/lote_imagenes_procesado_1784310337875/pringles-crema-y-cebolla.webp" },
    { id: "pringles-original", casa: "Pringles", nombre: "Pringles Original", variante: "", cat: "mecato", precio: 10000, img: "uploads/lote_imagenes_procesado_1784310337875/pringles-original.webp" },
    { id: "chicle-trident-menta", casa: "Trident", nombre: "Chicle Trident Menta", variante: "", cat: "mecato", precio: 4000, img: "uploads/lote_imagenes_procesado_1784310337875/chicle-trident-menta.webp" },
    { id: "chicle-trident-mora", casa: "Trident", nombre: "Chicle Trident Mora", variante: "", cat: "mecato", precio: 4000, img: "uploads/lote_imagenes_procesado_1784310337875/chicle-trident-mora.webp" },
    { id: "chicle-trident-sandia", casa: "Trident", nombre: "Chicle Trident Sandia", variante: "", cat: "mecato", precio: 4000, img: "uploads/lote_imagenes_procesado_1784310337875/chicle-trident-sandia.webp" },
    { id: "chicle-trident-total", casa: "Trident", nombre: "Chicle Trident Total", variante: "", cat: "mecato", precio: 4000, img: "uploads/lote_imagenes_procesado_1784310337875/chicle-trident-total.webp" },
    { id: "chicle-trident-yerbabuena", casa: "Trident", nombre: "Chicle Trident Yerbabuena", variante: "", cat: "mecato", precio: 4000, img: "uploads/lote_imagenes_procesado_1784310337875/chicle-trident-yerbabuena.webp" },
  ];

  // Combos / promos — inventados, creíbles para licorería de domicilios
  const COMBOS = [
    {
      id: "combo-parranda",
      nombre: "Combo Parranda",
      desc: "Para arrancar la noche sin pensarlo.",
      items: ["Aguardiente Amarillo 750 ml", "2 gaseosas", "Bolsa de hielo"],
      precio: 65900, antes: 73900, tag: "El más pedido",
    },
    {
      id: "combo-whiskeria",
      nombre: "Combo Whiskería",
      desc: "Old Parr y todo listo para servir.",
      items: ["Old Parr 12 750 ml", "4 gaseosas", "Bolsa de hielo"],
      precio: 172900, antes: 186900, tag: "Premium",
    },
    {
      id: "combo-ron-noche",
      nombre: "Noche de Ron",
      desc: "Ron Medellín bien acompañado.",
      items: ["Ron Medellin 750 ml", "2 Coca-Cola", "Bolsa de hielo"],
      precio: 69900, antes: 77900,
    },
    {
      id: "combo-cervecero",
      nombre: "Combo Cervecero",
      desc: "Doce frías y hielo, listo el plan.",
      items: ["12 Águila Negra", "Bolsa de hielo"],
      precio: 46900, antes: 52000,
    },
    {
      id: "combo-express",
      nombre: "Combo Express",
      desc: "Para dos, rápido y al grano.",
      items: ["Antioqueño Verde 375 ml", "Gaseosa", "Bolsa de hielo"],
      precio: 38900, antes: 43900,
    },
    {
      id: "combo-brindis",
      nombre: "Combo Brindis",
      desc: "Dos tintos para la ocasión.",
      items: ["2 Vino Tinto Terra Vega 750 ml"],
      precio: 92900, antes: 99800,
    },
  ];

  // ===== Helpers ============================================================
  function pesos(n) {
    return "$" + Math.round(n).toLocaleString("es-CO");
  }

  // Horario: Lun–Vie 13:00–01:00 · Sáb–Dom 12:00–03:00 (cierra de madrugada).
  // Devuelve minutos desde medianoche; close puede ser > 1440 (cruza medianoche).
  function horasDia(day /* 0=Dom..6=Sáb */) {
    if (day === 0 || day === 6) return { open: 12 * 60, close: 27 * 60 }; // 12:00 → 03:00
    return { open: 13 * 60, close: 25 * 60 }; // 13:00 → 01:00
  }

  function estadoApertura(now) {
    now = now || new Date();
    const day = now.getDay();
    const mins = now.getHours() * 60 + now.getMinutes();
    const hoy = horasDia(day);
    // ventana de hoy (parte antes de medianoche)
    if (mins >= hoy.open && mins < Math.min(hoy.close, 1440)) {
      return { abierto: true, cierra: hoy.close };
    }
    // ventana de ayer que se extiende a la madrugada de hoy
    const ayer = horasDia((day + 6) % 7);
    if (ayer.close > 1440 && mins < ayer.close - 1440) {
      return { abierto: true, cierra: ayer.close - 1440 };
    }
    // cerrado — ¿a qué hora abre hoy?
    return { abierto: false, abre: hoy.open > mins ? hoy.open : null };
  }

  function minsToHora(m) {
    m = ((m % 1440) + 1440) % 1440;
    let h = Math.floor(m / 60);
    const min = m % 60;
    const ampm = h < 12 || h === 24 ? "a.m." : "p.m.";
    let h12 = h % 12; if (h12 === 0) h12 = 12;
    return h12 + (min ? ":" + String(min).padStart(2, "0") : "") + " " + ampm;
  }

  // Publicaciones de Instagram: reels reales mediante el embed oficial.
  // Solo pega la URL del reel/post; se previsualiza sola. Editable desde el panel.
  const IG_POSTS = [
    { id: "ig1", url: "https://www.instagram.com/reel/DabEBYGsEfB/" },
    { id: "ig2", url: "https://www.instagram.com/reel/DaB3yHNOIOi/" },
    { id: "ig3", url: "https://www.instagram.com/reel/DZgiK7aOurb/" },
  ];

  // Promos para el carrusel de Inicio: botellas con descuento + combos.
  // Lee del estado vivo (PAVLOS), no de los valores por defecto, para reflejar
  // lo que el dueño edita desde el panel. Excluye productos agotados.
  function getPromos() {
    const bottles = PAVLOS.PRODUCTOS.filter(p => p.promo && p.disponible !== false).map(p => ({
      kind: "prod", id: p.id, nombre: p.nombre, sub: p.variante,
      precio: p.precio, antes: p.antes, bottle: p.bottle, img: p.img,
    }));
    const combos = PAVLOS.COMBOS.filter(c => c.antes).map(c => ({
      kind: "combo", id: c.id, nombre: c.nombre, sub: c.items.length + " productos",
      precio: c.precio, antes: c.antes,
    }));
    // intercalar botella, combo, botella, combo…
    const out = []; let i = 0, j = 0;
    while (i < bottles.length || j < combos.length) {
      if (i < bottles.length) out.push(bottles[i++]);
      if (j < combos.length) out.push(combos[j++]);
    }
    return out;
  }

  /* ==========================================================================
     CATÁLOGO EDITABLE — el panel admin escribe aquí.
     Los datos de arriba son los VALORES POR DEFECTO. Si el dueño ha hecho
     cambios, se cargan de localStorage y reemplazan a los de arriba.
     Nota: localStorage vive en ESTE navegador. Para que los cambios lleguen a
     todos los clientes en vivo, se conecta una base de datos en la nube al
     publicar (la API de abajo ya queda lista para ese cambio).
     ========================================================================== */
  const DEFAULTS = { CONFIG, CATEGORIAS, PRODUCTOS, COMBOS, IG_POSTS };
  const STORE_KEY = "pv_catalog_v2";
  const clone = (o) => JSON.parse(JSON.stringify(o));

  function loadCatalog() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        return {
          CONFIG: Object.assign(clone(DEFAULTS.CONFIG), s.CONFIG || {}),
          CATEGORIAS: s.CATEGORIAS || clone(DEFAULTS.CATEGORIAS),
          PRODUCTOS: s.PRODUCTOS || clone(DEFAULTS.PRODUCTOS),
          COMBOS: s.COMBOS || clone(DEFAULTS.COMBOS),
          IG_POSTS: s.IG_POSTS || clone(DEFAULTS.IG_POSTS),
        };
      }
    } catch (e) { console.warn("Catálogo guardado inválido; usando valores por defecto.", e); }
    return clone(DEFAULTS);
  }

  function persist() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({
        CONFIG: PAVLOS.CONFIG, CATEGORIAS: PAVLOS.CATEGORIAS,
        PRODUCTOS: PAVLOS.PRODUCTOS, COMBOS: PAVLOS.COMBOS, IG_POSTS: PAVLOS.IG_POSTS,
      }));
    } catch (e) { console.warn("No se pudo guardar el catálogo.", e); }
  }

  const subs = new Set();
  function notify() { subs.forEach(fn => { try { fn(); } catch (e) {} }); }

  // Genera un id único legible a partir del nombre.
  function genId(prefix, nombre) {
    const slug = String(nombre || "item").toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 26);
    const base = (prefix ? prefix + "-" : "") + (slug || "item");
    let id = base, n = 2;
    const taken = () => [...PAVLOS.PRODUCTOS, ...PAVLOS.COMBOS].some(x => x.id === id);
    while (taken()) id = base + "-" + (n++);
    return id;
  }

  const admin = {
    // --- Productos ---
    updateProducto(id, patch) {
      const p = PAVLOS.PRODUCTOS.find(x => x.id === id);
      if (p) { Object.assign(p, patch); persist(); notify(); }
    },
    addProducto(obj) {
      const id = obj.id || genId("p", obj.nombre);
      PAVLOS.PRODUCTOS = [{ ...obj, id }, ...PAVLOS.PRODUCTOS];
      persist(); notify(); return id;
    },
    removeProducto(id) {
      PAVLOS.PRODUCTOS = PAVLOS.PRODUCTOS.filter(x => x.id !== id);
      persist(); notify();
    },
    // --- Combos ---
    updateCombo(id, patch) {
      const c = PAVLOS.COMBOS.find(x => x.id === id);
      if (c) { Object.assign(c, patch); persist(); notify(); }
    },
    addCombo(obj) {
      const id = obj.id || genId("combo", obj.nombre);
      PAVLOS.COMBOS = [{ ...obj, id }, ...PAVLOS.COMBOS];
      persist(); notify(); return id;
    },
    removeCombo(id) {
      PAVLOS.COMBOS = PAVLOS.COMBOS.filter(x => x.id !== id);
      persist(); notify();
    },
    // --- Instagram (reels/posts previsualizados) ---
    setReels(urls) {
      PAVLOS.IG_POSTS = urls.map((url, i) => ({ id: "ig" + (i + 1), url: url.trim() })).filter(r => r.url);
      persist(); notify();
    },
    // --- Mantenimiento ---
    reset() {
      localStorage.removeItem(STORE_KEY);
      const c = clone(DEFAULTS);
      PAVLOS.CONFIG = c.CONFIG; PAVLOS.CATEGORIAS = c.CATEGORIAS;
      PAVLOS.PRODUCTOS = c.PRODUCTOS; PAVLOS.COMBOS = c.COMBOS; PAVLOS.IG_POSTS = c.IG_POSTS;
      notify();
    },
    exportJSON() {
      return JSON.stringify({
        CONFIG: PAVLOS.CONFIG, CATEGORIAS: PAVLOS.CATEGORIAS,
        PRODUCTOS: PAVLOS.PRODUCTOS, COMBOS: PAVLOS.COMBOS, IG_POSTS: PAVLOS.IG_POSTS,
      }, null, 2);
    },
    importJSON(text) {
      const s = JSON.parse(text);
      if (s.PRODUCTOS) PAVLOS.PRODUCTOS = s.PRODUCTOS;
      if (s.COMBOS) PAVLOS.COMBOS = s.COMBOS;
      if (s.IG_POSTS) PAVLOS.IG_POSTS = s.IG_POSTS;
      if (s.CONFIG) PAVLOS.CONFIG = Object.assign(clone(DEFAULTS.CONFIG), s.CONFIG);
      if (s.CATEGORIAS) PAVLOS.CATEGORIAS = s.CATEGORIAS;
      persist(); notify();
    },
    subscribe(fn) { subs.add(fn); return () => subs.delete(fn); },
    hasOverrides() { try { return !!localStorage.getItem(STORE_KEY); } catch (e) { return false; } },
  };

  const _init = loadCatalog();
  const PAVLOS = {
    CONFIG: _init.CONFIG, CATEGORIAS: _init.CATEGORIAS,
    PRODUCTOS: _init.PRODUCTOS, COMBOS: _init.COMBOS,
    IG_POSTS: _init.IG_POSTS,
    pesos, estadoApertura, minsToHora, getPromos,
    admin,
  };
  window.PAVLOS = PAVLOS;
})();
