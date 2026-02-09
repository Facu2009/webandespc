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

// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create mobile menu toggle button
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Create hamburger button if it doesn't exist
    if (!document.querySelector('.mobile-menu-toggle')) {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.setAttribute('aria-label', 'Toggle menu');
        menuToggle.innerHTML = '<span></span><span></span><span></span>';
        
        // Insert before CTA button
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            nav.insertBefore(menuToggle, ctaButton);
        } else {
            nav.appendChild(menuToggle);
        }
    }
    
    // Create overlay if it doesn't exist
    if (!document.querySelector('.menu-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
    }
    
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const overlay = document.querySelector('.menu-overlay');
    
    // Toggle menu function
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }
    
    // Close menu function
    function closeMenu() {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Menu toggle click
    menuToggle.addEventListener('click', toggleMenu);
    
    // Overlay click
    overlay.addEventListener('click', closeMenu);
    
    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Close menu on window resize if open
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                closeMenu();
            }
        }, 250);
    });
    
    // Automatic active page detection for navigation
    let currentPage = window.location.pathname.split('/').pop();
    
    // If no file specified or just a slash, default to index.html
    if (!currentPage || currentPage === '') {
        currentPage = 'index.html';
    }
    
    // Get all navigation links
    const navLinksAnchors = document.querySelectorAll('.nav-links a');
    
    navLinksAnchors.forEach(link => {
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