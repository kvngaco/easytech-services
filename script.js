// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotOptions = document.getElementById('chatbotOptions');
const chatbotTextInput = document.getElementById('chatbotTextInput');
const chatbotInputField = document.getElementById('chatbotInputField');
const sendMessageBtn = document.getElementById('sendMessage');
const contactForm = document.getElementById('contactForm');

// Chatbot State
let chatbotState = 'initial';
let selectedService = null;

// Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// Chatbot Functions
function openChatbot() {
    chatbotWindow.classList.add('active');
    if (chatbotMessages.children.length === 1) {
        addBotMessage('¡Hola! Soy el asistente virtual de EasyTech Services. ¿En qué puedo ayudarte hoy?');
    }
}

function closeChatbot() {
    chatbotWindow.classList.remove('active');
}

chatbotToggle.addEventListener('click', openChatbot);
chatbotClose.addEventListener('click', closeChatbot);

// Add message to chat
function addBotMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    chatbotMessages.appendChild(messageDiv);
    scrollToBottom();
}

function addUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-user"></i>
        </div>
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    chatbotMessages.appendChild(messageDiv);
    scrollToBottom();
}

function scrollToBottom() {
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Handle chatbot options
function handleOption(option) {
    selectedService = option;
    addUserMessage(getOptionText(option));
    chatbotOptions.style.display = 'none';
    chatbotTextInput.style.display = 'flex';
    
    setTimeout(() => {
        handleServiceSelection(option);
    }, 500);
}

function getOptionText(option) {
    const options = {
        'soporte': 'Soporte Técnico',
        'web': 'Desarrollo Web',
        'automatizacion': 'Automatización',
        'infraestructura': 'Redes e Infraestructura',
        'otro': 'Otra consulta'
    };
    return options[option] || option;
}

function handleServiceSelection(service) {
    const responses = {
        'soporte': {
            message: '¿Qué tipo de problema técnico estás experimentando? Puedo ayudarte con:\n\n• Problemas de hardware o software\n• Configuración de equipos\n• Mantenimiento preventivo\n• Soporte a usuarios finales\n• Problemas de red\n\nDescribe tu situación y te guiaré a la solución adecuada.',
            suggestions: ['Mi computadora está muy lenta', 'Necesito configurar una red', 'Tengo un virus', 'Mi servidor no funciona']
        },
        'web': {
            message: '¡Excelente! Desarrollo web es una de nuestras especialidades. ¿Qué tipo de sitio web necesitas?\n\n• Página web corporativa\n• Tienda en línea\n• Landing page\n• Sitio informativo\n• Rediseño de sitio existente\n\nCuéntame más sobre tu proyecto y te daré recomendaciones específicas.',
            suggestions: ['Necesito una página para mi empresa', 'Quiero vender online', 'Rediseñar mi sitio actual', 'Sitio para profesionales']
        },
        'automatizacion': {
            message: 'La automatización puede transformar tu negocio. ¿Qué proceso te gustaría optimizar?\n\n• Atención al cliente con chatbots\n• Formularios inteligentes\n• Procesos de reserva\n• Integración de sistemas\n• Flujos de trabajo automáticos\n\nDescribe tu necesidad y te mostraré cómo podemos ayudarte.',
            suggestions: ['Automatizar atención al cliente', 'Integrar sistemas', 'Crear formularios inteligentes', 'Optimizar procesos']
        },
        'infraestructura': {
            message: 'La infraestructura tecnológica es fundamental para tu negocio. ¿Qué necesitas?\n\n• Instalación de redes\n• Cableado estructurado\n• Configuración de servidores\n• Sistemas de respaldo\n• Monitoreo y mantenimiento\n\nCuéntame sobre tu proyecto y te asesoraré con la mejor solución.',
            suggestions: ['Instalar red en oficina', 'Configurar servidor', 'Sistema de respaldos', 'Cableado estructurado']
        },
        'otro': {
            message: 'Entendido. Cada proyecto es único. Por favor, describe detalladamente qué necesitas:\n\n• ¿Cuál es tu objetivo?\n• ¿Qué problema quieres resolver?\n• ¿Qué has intentado hasta ahora?\n\nCon esta información podré darte la mejor orientación o conectar contigo con uno de nuestros especialistas.',
            suggestions: ['Consultoría tecnológica', 'Proyecto especial', 'Asesoramiento', 'Otro servicio']
        }
    };

    const response = responses[service];
    addBotMessage(response.message);
    
    // Add suggestion buttons
    setTimeout(() => {
        addSuggestionButtons(response.suggestions);
    }, 1000);
}

function addSuggestionButtons(suggestions) {
    const suggestionsDiv = document.createElement('div');
    suggestionsDiv.className = 'suggestions';
    suggestionsDiv.style.cssText = 'display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem;';
    
    suggestions.forEach(suggestion => {
        const btn = document.createElement('button');
        btn.className = 'suggestion-btn';
        btn.textContent = suggestion;
        btn.style.cssText = 'padding: 0.5rem 1rem; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 0.875rem; cursor: pointer; transition: var(--transition);';
        btn.onclick = () => handleSuggestion(suggestion);
        suggestionsDiv.appendChild(btn);
    });
    
    const lastMessage = chatbotMessages.lastElementChild;
    lastMessage.querySelector('.message-content').appendChild(suggestionsDiv);
}

function handleSuggestion(suggestion) {
    addUserMessage(suggestion);
    processUserInput(suggestion);
}

function processUserInput(input) {
    const lowerInput = input.toLowerCase();
    
    // Simple keyword-based responses
    if (lowerInput.includes('lenta') || lowerInput.includes('lento')) {
        addBotMessage('Una computadora lenta puede tener varias causas: malware, programas innecesarios, falta de memoria RAM, o disco duro lleno. Te recomiendo:\n\n1. Escaneo completo de virus\n2. Limpieza de archivos temporales\n3. Revisión de programas al inicio\n4. Evaluación de actualización de hardware\n\n¿Te gustaría que un técnico revise tu equipo? Podemos ayudarte de forma presencial o remota.');
    } else if (lowerInput.includes('virus') || lowerInput.includes('malware')) {
        addBotMessage('Los virus y malware son problemas serios. Nuestros expertos pueden:\n\n• Realizar análisis profundos con herramientas profesionales\n• Eliminar amenazas persistentes\n• Recuperar archivos afectados\n• Configurar protección preventiva\n• Educar sobre buenas prácticas de seguridad\n\n¿Prefieres atención remota inmediata o programamos una visita técnica?');
    } else if (lowerInput.includes('página') || lowerInput.includes('sitio web')) {
        addBotMessage('Perfecto. Para tu página web necesitamos saber:\n\n• ¿Es para empresa, profesional o proyecto personal?\n• ¿Qué información quieres mostrar?\n• ¿Necesitas formulario de contacto?\n• ¿Tienes logo o identidad visual?\n• ¿Presupuesto aproximado?\n\nCon esta información te daremos una propuesta detallada con tiempo y costo.');
    } else if (lowerInput.includes('tienda') || lowerInput.includes('vender')) {
        addBotMessage('¡Excelente! Las tiendas online son un gran negocio. Necesitamos:\n\n• ¿Qué productos o servicios venderás?\n• ¿Métodos de pago que necesitas?\n• ¿Control de inventario?\n• ¿Envíos nacionales o internacionales?\n• ¿Integración con redes sociales?\n\nTe ofrecemos plataformas seguras y fáciles de gestionar. ¿Cuál es tu nicho de mercado?');
    } else if (lowerInput.includes('red') || lowerInput.includes('internet')) {
        addBotMessage('Las redes son el corazón de cualquier negocio. Ofrecemos:\n\n• Diseño de topología de red\n• Instalación de cableado estructurado\n• Configuración de routers y switches\n• Redes Wi-Fi seguras y optimizadas\n• VPN para acceso remoto\n• Monitoreo 24/7\n\n¿Cuántos usuarios/equipos necesitas conectar?');
    } else {
        addBotMessage('Entiendo tu necesidad. Para darte la mejor solución, me gustaría saber más detalles:\n\n• ¿Es para uso personal o empresarial?\n• ¿Qué tan urgente es?\n• ¿Tienes un presupuesto en mente?\n• ¿Has intentado algo antes?\n\nCon esta información podré recomendarte la solución perfecta o conectar contigo con uno de nuestros especialistas.');
    }
    
    // Always offer to connect with human
    setTimeout(() => {
        addBotMessage('¿Te gustaría que uno de nuestros especialistas te contacte directamente para una asesoría personalizada? Puedes dejar tus datos en el formulario de contacto o simplemente dime "sí" y te ayudaré a agendar una llamada.');
    }, 2000);
}

// Handle text input
function sendMessage() {
    const message = chatbotInputField.value.trim();
    if (message) {
        addUserMessage(message);
        chatbotInputField.value = '';
        processUserInput(message);
    }
}

sendMessageBtn.addEventListener('click', sendMessage);
chatbotInputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Contact Form
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!data.name || !data.email || !data.message || !data.service) {
        showNotification('Por favor completa todos los campos requeridos.', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Enviando mensaje...', 'info');
    
    setTimeout(() => {
        showNotification('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
        contactForm.reset();
        
        // Track conversion
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                'event_category': 'contact',
                'event_label': data.service
            });
        }
    }, 1500);
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'var(--secondary-color)' : type === 'error' ? '#ef4444' : 'var(--primary-color)'};
        color: white;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    .suggestion-btn:hover {
        background: var(--primary-color) !important;
        color: white !important;
        border-color: var(--primary-color) !important;
    }
`;
document.head.appendChild(style);

// Smooth Scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Service Selection
function selectService(service) {
    selectedService = service;
    openChatbot();
    setTimeout(() => {
        handleServiceSelection(service);
    }, 500);
}

// Header scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const header = document.querySelector('.header');
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = 'var(--shadow-md)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .step, .stat-item, .about-text');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy loading for images (if any are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeChatbot();
        navMenu.classList.remove('active');
    }
});

// Add focus management for accessibility
chatbotToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openChatbot();
    }
});

// Initialize tooltips and other interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add loading states
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('no-loading')) {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    });
});

// Console branding
console.log('%c🚀 EasyTech Services S.A.', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%cSoluciones Tecnológicas Simples, Seguras y Eficientes', 'font-size: 14px; color: #6b7280;');
console.log('%c📧 info@easytechservices.cr | 🌐 www.easytechservices.cr', 'font-size: 12px; color: #9ca3af;');
