// Function to contact via WhatsApp with product name
function contactWhatsApp(producto) {
    const mensaje = `Hola, me interesa el producto: ${producto}. ¿Podrías darme más información?`;
    const url = `https://wa.me/5492612773162?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// Function to handle custom request form
function handleCustomRequest(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const producto = document.getElementById('producto').value;
    const detalles = document.getElementById('detalles').value;
    
    let mensaje = `Hola, soy ${nombre}.\n\n`;
    mensaje += `Estoy buscando: ${producto}\n\n`;
    
    if (detalles) {
        mensaje += `Detalles adicionales:\n${detalles}`;
    }
    
    const url = `https://wa.me/5492612773162?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
    
    // Reset form
    event.target.reset();
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Automatic active page detection for navigation
document.addEventListener('DOMContentLoaded', function() {
    // Get current page from URL
    let currentPage = window.location.pathname.split('/').pop();
    
    // If no file specified or just a slash, default to index.html
    if (!currentPage || currentPage === '') {
        currentPage = 'index.html';
    }
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        // Remove any existing active class first
        link.classList.remove('active');
        
        const linkPage = link.getAttribute('href');
        
        // Match exact page name
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
        // Special case: if we're on root or index.html, highlight "Inicio"
        else if ((currentPage === 'index.html' || currentPage === '') && linkPage === 'index.html') {
            link.classList.add('active');
        }
    });
});