// PC Configurator - Questionnaire System
// State management
const answers = {
    uso: '',
    rendimiento: '',
    presupuesto: 300000,
    componentes: [],
    marca: '',
    urgencia: '',
    nombre: '',
    comentarios: ''
};

let currentQuestion = 1;
const totalQuestions = 7;

// Elements
let prevBtn, nextBtn, submitBtn, progressFill, budgetSlider, budgetValue;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    initializeEventListeners();
    updateProgress();
});

// Initialize DOM elements
function initializeElements() {
    prevBtn = document.getElementById('prevBtn');
    nextBtn = document.getElementById('nextBtn');
    submitBtn = document.getElementById('submitBtn');
    progressFill = document.getElementById('progressFill');
    budgetSlider = document.getElementById('budgetSlider');
    budgetValue = document.getElementById('budgetValue');
}

// Initialize all event listeners
function initializeEventListeners() {
    // Budget slider
    budgetSlider.addEventListener('input', function() {
        const value = parseInt(this.value);
        answers.presupuesto = value;
        budgetValue.textContent = formatCurrency(value);
        enableNextButton();
    });

    // Option cards click handlers
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', function() {
            handleOptionClick(this);
        });
    });

    // Checkbox handlers
    document.querySelectorAll('.checkbox-option').forEach(option => {
        const checkbox = option.querySelector('input[type="checkbox"]');
        
        option.addEventListener('click', function(e) {
            handleCheckboxClick(e, checkbox, option);
        });
    });

    // Text inputs
    document.getElementById('userName').addEventListener('input', function() {
        answers.nombre = this.value;
        enableNextButton();
    });

    document.getElementById('userComments').addEventListener('input', function() {
        answers.comentarios = this.value;
    });

    // Navigation buttons
    nextBtn.addEventListener('click', () => {
        if (currentQuestion < totalQuestions) {
            currentQuestion++;
            showQuestion(currentQuestion);
            updateProgress();
        } else if (currentQuestion === totalQuestions) {
            showSummary();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentQuestion > 1) {
            currentQuestion--;
            showQuestion(currentQuestion);
            updateProgress();
        }
    });

    // Submit button
    submitBtn.addEventListener('click', () => {
        sendToWhatsApp();
    });
}

// Handle option card clicks
function handleOptionClick(card) {
    const questionCard = card.closest('.question-card');
    const questionNum = parseInt(questionCard.dataset.question);
    const option = card.dataset.option;

    // Remove selected class from siblings
    card.parentElement.querySelectorAll('.option-card').forEach(c => {
        c.classList.remove('selected');
    });

    // Add selected class
    card.classList.add('selected');

    // Save answer
    switch(questionNum) {
        case 1:
            answers.uso = option;
            break;
        case 2:
            answers.rendimiento = option;
            break;
        case 5:
            answers.marca = option;
            break;
        case 6:
            answers.urgencia = option;
            break;
    }

    enableNextButton();
}

// Handle checkbox clicks
function handleCheckboxClick(e, checkbox, option) {
    const nothingCheckbox = document.getElementById('has-nothing');
    
    if (e.target.tagName !== 'INPUT') {
        checkbox.checked = !checkbox.checked;
    }
    
    option.classList.toggle('selected', checkbox.checked);

    // Handle "ninguno" logic
    if (checkbox.id === 'has-nothing' && checkbox.checked) {
        document.querySelectorAll('.checkbox-option input[type="checkbox"]').forEach(cb => {
            if (cb.id !== 'has-nothing') {
                cb.checked = false;
                cb.closest('.checkbox-option').classList.remove('selected');
            }
        });
    } else if (checkbox.id !== 'has-nothing' && checkbox.checked) {
        nothingCheckbox.checked = false;
        nothingCheckbox.closest('.checkbox-option').classList.remove('selected');
    }

    // Update answers
    answers.componentes = [];
    document.querySelectorAll('.checkbox-option input[type="checkbox"]:checked').forEach(cb => {
        const component = cb.id.replace('has-', '');
        answers.componentes.push(component);
    });

    enableNextButton();
}

// Show specific question
function showQuestion(num) {
    document.querySelectorAll('.question-card').forEach(card => {
        card.classList.remove('active');
    });

    const currentCard = document.querySelector(`.question-card[data-question="${num}"]`);
    if (currentCard) {
        currentCard.classList.add('active');
    }

    // Show/hide navigation buttons
    prevBtn.style.display = num > 1 ? 'flex' : 'none';
    
    // Enable/disable next button based on current question
    enableNextButton();
}

// Show summary page
function showSummary() {
    document.querySelectorAll('.question-card').forEach(card => {
        card.classList.remove('active');
    });

    const summaryCard = document.querySelector('.question-card[data-question="summary"]');
    summaryCard.classList.add('active');

    // Update summary
    document.getElementById('summary-uso').textContent = formatUso(answers.uso);
    document.getElementById('summary-rendimiento').textContent = formatRendimiento(answers.rendimiento);
    document.getElementById('summary-presupuesto').textContent = formatCurrency(answers.presupuesto);
    document.getElementById('summary-componentes').textContent = answers.componentes.length > 0 ? formatComponentes(answers.componentes) : 'Necesita todo';
    document.getElementById('summary-marca').textContent = formatMarca(answers.marca);
    document.getElementById('summary-urgencia').textContent = formatUrgencia(answers.urgencia);
    document.getElementById('summary-nombre').textContent = answers.nombre;

    // Hide navigation buttons
    document.querySelector('.navigation-buttons').style.display = 'none';
    progressFill.style.width = '100%';
}

// Enable/disable next button based on current question
function enableNextButton() {
    let canProceed = false;

    switch(currentQuestion) {
        case 1:
            canProceed = answers.uso !== '';
            break;
        case 2:
            canProceed = answers.rendimiento !== '';
            break;
        case 3:
            canProceed = true; // Budget always has a value
            break;
        case 4:
            canProceed = true; // Optional question
            break;
        case 5:
            canProceed = answers.marca !== '';
            break;
        case 6:
            canProceed = answers.urgencia !== '';
            break;
        case 7:
            canProceed = answers.nombre.trim() !== '';
            break;
    }

    nextBtn.disabled = !canProceed;
}

// Update progress bar
function updateProgress() {
    const progress = (currentQuestion / totalQuestions) * 100;
    progressFill.style.width = progress + '%';
}

// Format currency
function formatCurrency(value) {
    return '$' + value.toLocaleString('es-AR');
}

// Format uso option
function formatUso(uso) {
    const usos = {
        'gaming': 'Gaming',
        'trabajo': 'Trabajo/Oficina',
        'diseño': 'Diseño/Edición',
        'programacion': 'Programación',
        'multitarea': 'Uso Mixto'
    };
    return usos[uso] || uso;
}

// Format rendimiento option
function formatRendimiento(rendimiento) {
    const niveles = {
        'basico': 'Básico',
        'intermedio': 'Intermedio',
        'alto': 'Alto',
        'extremo': 'Extremo'
    };
    return niveles[rendimiento] || rendimiento;
}

// Format marca option
function formatMarca(marca) {
    const marcas = {
        'intel': 'Intel',
        'amd': 'AMD',
        'sin-preferencia': 'Sin preferencia'
    };
    return marcas[marca] || marca;
}

// Format urgencia option
function formatUrgencia(urgencia) {
    const urgencias = {
        'urgente': 'Lo antes posible',
        'semana': '1-2 semanas',
        'mes': 'En un mes',
        'flexible': 'Flexible'
    };
    return urgencias[urgencia] || urgencia;
}

// Format componentes list
function formatComponentes(componentes) {
    if (componentes.includes('nothing')) return 'Necesita todo';
    
    const labels = {
        'cpu': 'Procesador',
        'motherboard': 'Motherboard',
        'ram': 'RAM',
        'gpu': 'Tarjeta Gráfica',
        'psu': 'Fuente de Poder',
        'storage': 'Disco/SSD',
        'case': 'Gabinete',
        'monitor': 'Monitor',
        'keyboard': 'Teclado',
        'mouse': 'Mouse'
    };

    return componentes.map(c => labels[c] || c).join(', ');
}

// Send data to WhatsApp
function sendToWhatsApp() {
    let mensaje = `¡Hola! Soy ${answers.nombre} y quiero armar una PC con las siguientes características:\n\n`;
    
    mensaje += `🎯 *Uso principal:* ${formatUso(answers.uso)}\n`;
    mensaje += `⚡ *Nivel de rendimiento:* ${formatRendimiento(answers.rendimiento)}\n`;
    mensaje += `💰 *Presupuesto:* ${formatCurrency(answers.presupuesto)}\n`;
    mensaje += `🔧 *Ya tengo:* ${answers.componentes.length > 0 ? formatComponentes(answers.componentes) : 'Necesito todo'}\n`;
    mensaje += `🖥️ *Preferencia CPU:* ${formatMarca(answers.marca)}\n`;
    mensaje += `⏰ *Lo necesito:* ${formatUrgencia(answers.urgencia)}\n`;
    
    if (answers.comentarios) {
        mensaje += `\n📝 *Comentarios adicionales:*\n${answers.comentarios}\n`;
    }

    mensaje += `\n¿Pueden ayudarme a armar el presupuesto? ¡Gracias!`;

    const url = `https://wa.me/5492612773162?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}