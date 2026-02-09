// ==========================================
// BASE DE DATOS COMPLETA - ANDES PC
// ==========================================

const productosDB = [
    // ============ PROCESADORES ============
    {
        id: 'intel-i5-13400f',
        nombre: 'Intel Core i5-13400F',
        specs: '10 núcleos, 20 hilos | Socket LGA1700',
        precio: 185000,
        stock: 8,
        imagen: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=400&fit=crop',
        categoria: 'procesadores'
    },
    {
        id: 'amd-ryzen5-5600',
        nombre: 'AMD Ryzen 5 5600',
        specs: '6 núcleos, 12 hilos | Socket AM4',
        precio: 145000,
        stock: 5,
        imagen: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=400&fit=crop',
        categoria: 'procesadores'
    },
    {
        id: 'intel-i7-13700k',
        nombre: 'Intel Core i7-13700K',
        specs: '16 núcleos, 24 hilos | Socket LGA1700',
        precio: 380000,
        stock: 3,
        imagen: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=400&fit=crop',
        categoria: 'procesadores'
    },
    {
        id: 'amd-ryzen7-5800x3d',
        nombre: 'AMD Ryzen 7 5800X3D',
        specs: '8 núcleos, 16 hilos | 3D V-Cache',
        precio: 420000,
        stock: 2,
        imagen: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=400&fit=crop',
        categoria: 'procesadores'
    },

    // ============ PLACAS DE VIDEO (GPU) ============
    {
        id: 'rtx-4060-ti',
        nombre: 'NVIDIA RTX 4060 Ti 8GB',
        specs: 'GDDR6 | Ray Tracing | DLSS 3',
        precio: 520000,
        stock: 4,
        imagen: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=400&fit=crop',
        categoria: 'gpu'
    },
    {
        id: 'rtx-4070-super',
        nombre: 'NVIDIA RTX 4070 Super 12GB',
        specs: 'GDDR6X | Ray Tracing | DLSS 3',
        precio: 850000,
        stock: 2,
        imagen: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=400&fit=crop',
        categoria: 'gpu'
    },
    {
        id: 'rx-7800-xt',
        nombre: 'AMD Radeon RX 7800 XT 16GB',
        specs: 'GDDR6 | Ray Tracing | FSR 3',
        precio: 750000,
        stock: 3,
        imagen: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=400&fit=crop',
        categoria: 'gpu'
    },
    {
        id: 'rtx-4090',
        nombre: 'NVIDIA RTX 4090 24GB',
        specs: 'GDDR6X | Top Performance',
        precio: 2800000,
        stock: 1,
        imagen: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=400&fit=crop',
        categoria: 'gpu'
    },

    // ============ MEMORIA RAM ============
    {
        id: 'corsair-vengeance-16gb',
        nombre: 'Corsair Vengeance RGB 16GB',
        specs: 'DDR4 3200MHz | 2x8GB | RGB',
        precio: 65000,
        stock: 12,
        imagen: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=400&h=400&fit=crop',
        categoria: 'ram'
    },
    {
        id: 'kingston-fury-32gb',
        nombre: 'Kingston Fury Beast 32GB',
        specs: 'DDR5 5600MHz | 2x16GB',
        precio: 145000,
        stock: 8,
        imagen: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&h=400&fit=crop',
        categoria: 'ram'
    },
    {
        id: 'gskill-trident-32gb',
        nombre: 'G.Skill Trident Z5 32GB',
        specs: 'DDR5 6000MHz | 2x16GB | RGB',
        precio: 185000,
        stock: 5,
        imagen: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=400&h=400&fit=crop',
        categoria: 'ram'
    },
    {
        id: 'corsair-dominator-64gb',
        nombre: 'Corsair Dominator 64GB',
        specs: 'DDR5 6400MHz | 2x32GB | RGB',
        precio: 385000,
        stock: 2,
        imagen: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=400&h=400&fit=crop',
        categoria: 'ram'
    },

    // ============ ALMACENAMIENTO ============
    {
        id: 'samsung-980-pro-1tb',
        nombre: 'Samsung 980 PRO 1TB',
        specs: 'NVMe M.2 | 7000MB/s lectura',
        precio: 125000,
        stock: 10,
        imagen: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop',
        categoria: 'almacenamiento'
    },
    {
        id: 'wd-black-sn850x-2tb',
        nombre: 'WD Black SN850X 2TB',
        specs: 'NVMe M.2 | 7300MB/s lectura',
        precio: 245000,
        stock: 6,
        imagen: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop',
        categoria: 'almacenamiento'
    },
    {
        id: 'crucial-p5-plus-1tb',
        nombre: 'Crucial P5 Plus 1TB',
        specs: 'NVMe M.2 | 6600MB/s lectura',
        precio: 95000,
        stock: 8,
        imagen: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop',
        categoria: 'almacenamiento'
    },
    {
        id: 'kingston-nv2-500gb',
        nombre: 'Kingston NV2 500GB',
        specs: 'NVMe M.2 | 3500MB/s lectura',
        precio: 52000,
        stock: 15,
        imagen: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop',
        categoria: 'almacenamiento'
    },

    // ============ PLACAS BASE (MOTHERBOARD) ============
    {
        id: 'asus-rog-b650',
        nombre: 'ASUS ROG Strix B650-A',
        specs: 'AMD AM5 | DDR5 | PCIe 5.0',
        precio: 285000,
        stock: 4,
        imagen: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=400&fit=crop',
        categoria: 'base'
    },
    {
        id: 'msi-mag-b760',
        nombre: 'MSI MAG B760 Tomahawk',
        specs: 'Intel LGA1700 | DDR5 | WiFi 6E',
        precio: 245000,
        stock: 5,
        imagen: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=400&fit=crop',
        categoria: 'base'
    },
    {
        id: 'gigabyte-x670e',
        nombre: 'Gigabyte X670E Aorus Elite',
        specs: 'AMD AM5 | DDR5 | PCIe 5.0',
        precio: 385000,
        stock: 2,
        imagen: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=400&fit=crop',
        categoria: 'base'
    },
    {
        id: 'asrock-b550',
        nombre: 'ASRock B550 Steel Legend',
        specs: 'AMD AM4 | DDR4 | PCIe 4.0',
        precio: 165000,
        stock: 6,
        imagen: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=400&fit=crop',
        categoria: 'base'
    },

    // ============ FUENTES DE PODER ============
    {
        id: 'corsair-rm850x',
        nombre: 'Corsair RM850x 850W',
        specs: '80 Plus Gold | Modular | 10 años',
        precio: 185000,
        stock: 7,
        imagen: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=400&fit=crop',
        categoria: 'fuente'
    },
    {
        id: 'evga-supernova-750',
        nombre: 'EVGA SuperNOVA 750W',
        specs: '80 Plus Platinum | Modular',
        precio: 165000,
        stock: 5,
        imagen: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=400&fit=crop',
        categoria: 'fuente'
    },
    {
        id: 'seasonic-focus-1000',
        nombre: 'Seasonic Focus GX-1000',
        specs: '80 Plus Gold | Full Modular',
        precio: 245000,
        stock: 3,
        imagen: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=400&fit=crop',
        categoria: 'fuente'
    },
    {
        id: 'thermaltake-toughpower-650',
        nombre: 'Thermaltake Toughpower 650W',
        specs: '80 Plus Bronze | Semi Modular',
        precio: 95000,
        stock: 10,
        imagen: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=400&fit=crop',
        categoria: 'fuente'
    },

    // ============ REFRIGERACIÓN ============
    {
        id: 'nzxt-kraken-360',
        nombre: 'NZXT Kraken X63 RGB',
        specs: 'AIO 280mm | RGB | 2x140mm',
        precio: 195000,
        stock: 4,
        imagen: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=400&fit=crop',
        categoria: 'refrigeracion'
    },
    {
        id: 'corsair-h150i',
        nombre: 'Corsair iCUE H150i Elite',
        specs: 'AIO 360mm | RGB | 3x120mm',
        precio: 245000,
        stock: 3,
        imagen: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=400&fit=crop',
        categoria: 'refrigeracion'
    },
    {
        id: 'noctua-nhd15',
        nombre: 'Noctua NH-D15 chromax',
        specs: 'Torre dual | Ultra silencioso',
        precio: 145000,
        stock: 6,
        imagen: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=400&fit=crop',
        categoria: 'refrigeracion'
    },
    {
        id: 'coolermaster-ml240',
        nombre: 'Cooler Master ML240L RGB',
        specs: 'AIO 240mm | RGB | 2x120mm',
        precio: 125000,
        stock: 8,
        imagen: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=400&fit=crop',
        categoria: 'refrigeracion'
    },

    // ============ ACCESORIOS ============
    {
        id: 'logitech-g502',
        nombre: 'Logitech G502 HERO',
        specs: 'Gaming | 25600 DPI | RGB',
        precio: 85000,
        stock: 15,
        imagen: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop',
        categoria: 'accesorios'
    },
    {
        id: 'hyperx-alloy-fps',
        nombre: 'HyperX Alloy FPS Pro',
        specs: 'Mecánico | Cherry MX Red | TKL',
        precio: 125000,
        stock: 10,
        imagen: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&h=400&fit=crop',
        categoria: 'accesorios'
    },
    {
        id: 'razer-blackshark-v2',
        nombre: 'Razer BlackShark V2',
        specs: 'Gaming Headset | THX | USB',
        precio: 145000,
        stock: 8,
        imagen: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=400&fit=crop',
        categoria: 'accesorios'
    },
    {
        id: 'corsair-mm700',
        nombre: 'Corsair MM700 RGB',
        specs: 'Mousepad XL | RGB | 93x40cm',
        precio: 45000,
        stock: 20,
        imagen: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop',
        categoria: 'accesorios'
    },
    {
        id: 'webcam-logitech-c920',
        nombre: 'Logitech C920 HD Pro',
        specs: '1080p | Autofocus | Micrófono',
        precio: 95000,
        stock: 12,
        imagen: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop',
        categoria: 'accesorios'
    }
];

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { productosDB };
}