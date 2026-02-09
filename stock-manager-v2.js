// ==========================================
// SISTEMA DE GESTIÓN DE STOCK UNIFICADO - ANDES PC
// Versión 2.0 - Multi-categoría
// ==========================================

// ==========================================
// FUNCIONES DE GESTIÓN DE STOCK
// ==========================================

// Inicializar stock en LocalStorage
function inicializarStock() {
    // Si no existe stock guardado, usar la base de datos inicial
    if (!localStorage.getItem('andespc-productos')) {
        localStorage.setItem('andespc-productos', JSON.stringify(productosDB));
        console.log('✅ Base de datos inicializada con', productosDB.length, 'productos');
    } else {
        console.log('✅ Base de datos cargada desde LocalStorage');
    }
}

// Obtener todos los productos
function obtenerProductos() {
    const productos = localStorage.getItem('andespc-productos');
    return productos ? JSON.parse(productos) : productosDB;
}

// Obtener productos por categoría
function obtenerProductosPorCategoria(categoria) {
    const productos = obtenerProductos();
    return productos.filter(p => p.categoria === categoria);
}

// Obtener un producto por ID
function obtenerProductoPorId(id) {
    const productos = obtenerProductos();
    return productos.find(p => p.id === id);
}

// Actualizar stock de un producto
function actualizarStock(productoId, nuevaCantidad) {
    const productos = obtenerProductos();
    const productoIndex = productos.findIndex(p => p.id === productoId);
    
    if (productoIndex !== -1) {
        productos[productoIndex].stock = nuevaCantidad;
        localStorage.setItem('andespc-productos', JSON.stringify(productos));
        
        console.log(`✅ Stock actualizado: ${productos[productoIndex].nombre} → ${nuevaCantidad} unidades`);
        
        // Recargar la visualización si estamos en una página de productos
        const grids = document.querySelectorAll('[id$="-grid"]');
        if (grids.length > 0) {
            cargarProductosPorCategoria();
        }
        
        return true;
    }
    console.error('❌ Producto no encontrado:', productoId);
    return false;
}

// Reducir stock (cuando se vende)
function reducirStock(productoId, cantidad = 1) {
    const producto = obtenerProductoPorId(productoId);
    if (producto && producto.stock >= cantidad) {
        actualizarStock(productoId, producto.stock - cantidad);
        return true;
    }
    console.warn('⚠️ Stock insuficiente para:', productoId);
    return false;
}

// Aumentar stock (cuando ingresa mercadería)
function aumentarStock(productoId, cantidad = 1) {
    const producto = obtenerProductoPorId(productoId);
    if (producto) {
        actualizarStock(productoId, producto.stock + cantidad);
        return true;
    }
    return false;
}

// ==========================================
// FUNCIONES DE VISUALIZACIÓN
// ==========================================

// Determinar el estado del stock
function obtenerEstadoStock(stock) {
    if (stock === 0) {
        return {
            clase: 'stock-agotado',
            icono: '❌',
            texto: 'Sin stock'
        };
    } else if (stock <= 3) {
        return {
            clase: 'stock-bajo',
            icono: '⚠️',
            texto: `Últimas ${stock} unidades`
        };
    } else {
        return {
            clase: 'stock-disponible',
            icono: '✅',
            texto: `Stock disponible (${stock} unidades)`
        };
    }
}

// Formatear precio
function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0
    }).format(precio);
}

// Crear HTML de tarjeta de producto
function crearTarjetaProducto(producto) {
    const estadoStock = obtenerEstadoStock(producto.stock);
    const sinStock = producto.stock === 0;
    
    return `
        <div class="product-card" data-producto-id="${producto.id}">
            ${sinStock ? '<div class="badge-agotado">AGOTADO</div>' : ''}
            <div class="product-image">
                <img src="${producto.imagen}" alt="${producto.nombre}">
            </div>
            <div class="product-info">
                <div class="product-name">${producto.nombre}</div>
                <div class="product-specs">${producto.specs}</div>
                <div class="stock-info ${estadoStock.clase}">
                    <span class="stock-icon">${estadoStock.icono}</span>
                    <span>${estadoStock.texto}</span>
                </div>
                <div class="product-price">${formatearPrecio(producto.precio)}</div>
                <button class="product-contact" 
                        onclick="contactWhatsApp('${producto.nombre}')"
                        ${sinStock ? 'disabled' : ''}>
                    ${sinStock ? 'Sin stock' : 'Consultar'}
                </button>
            </div>
        </div>
    `;
}

// Detectar categoría automáticamente desde el nombre del archivo
function detectarCategoria() {
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1);
    
    const mapaCategorias = {
        'procesadores.html': 'procesadores',
        'gpu.html': 'gpu',
        'ram.html': 'ram',
        'almacenamiento.html': 'almacenamiento',
        'base.html': 'base',
        'fuente.html': 'fuente',
        'refrigeracion.html': 'refrigeracion',
        'accesorios.html': 'accesorios'
    };
    
    return mapaCategorias[filename] || null;
}

// Cargar productos según la categoría de la página actual
function cargarProductosPorCategoria() {
    const categoria = detectarCategoria();
    if (!categoria) {
        console.warn('⚠️ No se pudo detectar la categoría de la página');
        return;
    }
    
    const gridId = `${categoria}-grid`;
    const grid = document.getElementById(gridId);
    
    if (!grid) {
        console.warn(`⚠️ No se encontró el grid con ID: ${gridId}`);
        return;
    }
    
    const productos = obtenerProductosPorCategoria(categoria);
    
    if (productos.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">No hay productos disponibles en esta categoría</p>';
        return;
    }
    
    grid.innerHTML = productos.map(producto => crearTarjetaProducto(producto)).join('');
    console.log(`✅ Cargados ${productos.length} productos de categoría: ${categoria}`);
}

// Obtener título de categoría en español
function obtenerTituloCategoria(categoria) {
    const titulos = {
        'procesadores': 'Procesadores',
        'gpu': 'Placas de Video',
        'ram': 'Memorias RAM',
        'almacenamiento': 'Almacenamiento',
        'base': 'Placas Base',
        'fuente': 'Fuentes de Poder',
        'refrigeracion': 'Refrigeración',
        'accesorios': 'Accesorios'
    };
    return titulos[categoria] || categoria;
}

// ==========================================
// FUNCIÓN PARA WHATSAPP
// ==========================================

function contactWhatsApp(nombreProducto) {
    const productos = obtenerProductos();
    const producto = productos.find(p => p.nombre === nombreProducto);
    
    if (!producto) {
        window.location.href = `https://wa.me/5492612773162?text=Hola, quiero consultar sobre ${encodeURIComponent(nombreProducto)}`;
        return;
    }
    
    const mensaje = `Hola! Me interesa el *${nombreProducto}*
    
📦 Precio: ${formatearPrecio(producto.precio)}
${producto.stock > 0 ? `✅ Stock disponible: ${producto.stock} unidades` : '❌ Sin stock actualmente'}

¿Podrías darme más información?`;
    
    window.location.href = `https://wa.me/5492612773162?text=${encodeURIComponent(mensaje)}`;
}

// ==========================================
// NOTIFICACIONES Y ESTADÍSTICAS
// ==========================================

function verificarStockBajo() {
    const productos = obtenerProductos();
    const productosStockBajo = productos.filter(p => p.stock > 0 && p.stock <= 3);
    
    if (productosStockBajo.length > 0) {
        console.warn('⚠️ ALERTA: Productos con stock bajo:');
        productosStockBajo.forEach(p => {
            console.warn(`- ${p.nombre}: ${p.stock} unidades`);
        });
    }
    
    const productosAgotados = productos.filter(p => p.stock === 0);
    if (productosAgotados.length > 0) {
        console.error('❌ ALERTA: Productos agotados:');
        productosAgotados.forEach(p => {
            console.error(`- ${p.nombre}`);
        });
    }
}

function obtenerEstadisticas() {
    const productos = obtenerProductos();
    
    const estadisticas = {
        total: productos.length,
        disponibles: productos.filter(p => p.stock > 3).length,
        stockBajo: productos.filter(p => p.stock > 0 && p.stock <= 3).length,
        agotados: productos.filter(p => p.stock === 0).length,
        valorTotal: productos.reduce((sum, p) => sum + (p.precio * p.stock), 0),
        porCategoria: {}
    };
    
    // Estadísticas por categoría
    const categorias = [...new Set(productos.map(p => p.categoria))];
    categorias.forEach(cat => {
        const prodsCat = productos.filter(p => p.categoria === cat);
        estadisticas.porCategoria[cat] = {
            total: prodsCat.length,
            disponibles: prodsCat.filter(p => p.stock > 0).length,
            agotados: prodsCat.filter(p => p.stock === 0).length,
            stockTotal: prodsCat.reduce((sum, p) => sum + p.stock, 0)
        };
    });
    
    return estadisticas;
}

// ==========================================
// FUNCIONES DE EXPORTACIÓN/IMPORTACIÓN
// ==========================================

function exportarStock() {
    const productos = obtenerProductos();
    const dataStr = JSON.stringify(productos, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `stock-andespc-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    console.log('✅ Stock exportado correctamente');
}

function importarStock(jsonData) {
    try {
        const productos = JSON.parse(jsonData);
        
        // Validar que tenga la estructura correcta
        if (!Array.isArray(productos)) {
            throw new Error('El archivo no contiene un array válido');
        }
        
        localStorage.setItem('andespc-productos', JSON.stringify(productos));
        console.log('✅ Stock importado correctamente:', productos.length, 'productos');
        
        // Recargar página
        if (confirm('Stock importado correctamente. ¿Desea recargar la página?')) {
            window.location.reload();
        }
        
        return true;
    } catch (error) {
        console.error('❌ Error al importar stock:', error);
        alert('Error al importar: ' + error.message);
        return false;
    }
}

function resetearStock() {
    if (confirm('⚠️ ¿Estás seguro de que quieres resetear el stock a los valores iniciales? Esta acción no se puede deshacer.')) {
        localStorage.setItem('andespc-productos', JSON.stringify(productosDB));
        console.log('✅ Stock reseteado a valores iniciales');
        window.location.reload();
    }
}

// ==========================================
// INICIALIZACIÓN
// ==========================================

// Inicializar cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando sistema de stock ANDES PC...');
    
    inicializarStock();
    cargarProductosPorCategoria();
    verificarStockBajo();
    
    const stats = obtenerEstadisticas();
    console.log('📊 Estadísticas generales:', stats);
    
    console.log('✅ Sistema de stock inicializado correctamente');
});

// Exportar funciones para uso en consola o panel admin
window.StockManager = {
    // Productos
    obtenerProductos,
    obtenerProductosPorCategoria,
    obtenerProductoPorId,
    
    // Stock
    actualizarStock,
    reducirStock,
    aumentarStock,
    
    // Utilidades
    verificarStockBajo,
    obtenerEstadisticas,
    cargarProductosPorCategoria,
    
    // Backup
    exportarStock,
    importarStock,
    resetearStock,
    
    // Info
    obtenerTituloCategoria,
    detectarCategoria
};

console.log('💡 Tip: Usa StockManager en la consola para gestionar el inventario');