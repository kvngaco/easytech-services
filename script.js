// Contact configuration
// Número de WhatsApp que recibe los mensajes: código de país + número, sin espacios ni signos.
const WHATSAPP_NUMBER = '50661386223';

function whatsappUrl(text) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

// DOM Elements
const header = document.querySelector('.header');
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
let selectedService = null;
let lastTopic = null;

// Navigation Toggle
function setMenuOpen(open) {
    navMenu.classList.toggle('active', open);
    navToggle.setAttribute('aria-expanded', String(open));
}

navToggle.addEventListener('click', () => {
    setMenuOpen(!navMenu.classList.contains('active'));
});

// Close menu when clicking outside or on a link
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        setMenuOpen(false);
    }
});

navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
});

// Chatbot Functions
function openChatbot() {
    chatbotWindow.classList.add('active');
    chatbotToggle.setAttribute('aria-expanded', 'true');
}

function closeChatbot() {
    chatbotWindow.classList.remove('active');
    chatbotToggle.setAttribute('aria-expanded', 'false');
}

chatbotToggle.addEventListener('click', () => {
    if (chatbotWindow.classList.contains('active')) {
        closeChatbot();
    } else {
        openChatbot();
    }
});
chatbotClose.addEventListener('click', closeChatbot);

// Add message to chat. Text is always inserted with textContent, never as HTML.
function addMessage(text, sender, link) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    const icon = document.createElement('i');
    icon.className = sender === 'bot' ? 'fas fa-robot' : 'fas fa-user';
    avatar.appendChild(icon);

    const content = document.createElement('div');
    content.className = 'message-content';
    const p = document.createElement('p');
    p.textContent = text;
    content.appendChild(p);

    if (link) {
        const a = document.createElement('a');
        a.className = 'chat-link';
        a.href = link.href;
        a.target = '_blank';
        a.rel = 'noopener';
        a.innerHTML = '<i class="fab fa-whatsapp"></i> ';
        a.append(link.label);
        content.appendChild(a);
    }

    messageDiv.append(avatar, content);
    chatbotMessages.appendChild(messageDiv);
    scrollToBottom();
    return messageDiv;
}

function addBotMessage(message, link) {
    return addMessage(message, 'bot', link);
}

function addUserMessage(message) {
    return addMessage(message, 'user');
}

function scrollToBottom() {
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Handle chatbot options
function handleOption(option) {
    selectedService = option;
    lastTopic = getOptionText(option);
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
    const messageDiv = addBotMessage(response.message);

    // Add suggestion buttons
    setTimeout(() => {
        addSuggestionButtons(messageDiv, response.suggestions);
    }, 1000);
}

function addSuggestionButtons(messageDiv, suggestions) {
    const suggestionsDiv = document.createElement('div');
    suggestionsDiv.className = 'suggestions';

    suggestions.forEach(suggestion => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'suggestion-btn';
        btn.textContent = suggestion;
        btn.addEventListener('click', () => handleSuggestion(suggestion));
        suggestionsDiv.appendChild(btn);
    });

    messageDiv.querySelector('.message-content').appendChild(suggestionsDiv);
    scrollToBottom();
}

function handleSuggestion(suggestion) {
    addUserMessage(suggestion);
    processUserInput(suggestion);
}

// Lowercase and strip accents so "página" and "pagina" match the same rule
function normalizeText(text) {
    return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

// Keyword rules, checked in order. Patterns use word boundaries so that,
// for example, "red" does not match inside "rediseñar".
const keywordResponses = [
    {
        pattern: /\blent[oa]s?\b|\blentitud\b/,
        message: 'Una computadora lenta puede tener varias causas: malware, programas innecesarios, falta de memoria RAM, o disco duro lleno. Te recomiendo:\n\n1. Escaneo completo de virus\n2. Limpieza de archivos temporales\n3. Revisión de programas al inicio\n4. Evaluación de actualización de hardware\n\n¿Te gustaría que un técnico revise tu equipo? Podemos ayudarte de forma presencial o remota.'
    },
    {
        pattern: /\bvirus\b|\bmalware\b|\bhacke/,
        message: 'Los virus y malware son problemas serios. Nuestros expertos pueden:\n\n• Realizar análisis profundos con herramientas profesionales\n• Eliminar amenazas persistentes\n• Recuperar archivos afectados\n• Configurar protección preventiva\n• Educar sobre buenas prácticas de seguridad\n\n¿Prefieres atención remota inmediata o programamos una visita técnica?'
    },
    {
        pattern: /\bservidor(es)?\b|\bserver\b/,
        message: 'Trabajamos con servidores físicos y en la nube. Podemos ayudarte con:\n\n• Diagnóstico de fallas y caídas del servicio\n• Instalación y configuración de servidores\n• Actualizaciones y seguridad\n• Virtualización\n• Monitoreo preventivo\n\n¿Tu servidor está caído en este momento o se trata de un proyecto nuevo?'
    },
    {
        pattern: /\brespaldos?\b|\bbackups?\b|\bcontinuidad\b/,
        message: 'Los respaldos protegen lo más valioso de tu negocio: la información. Ofrecemos:\n\n• Respaldos automáticos locales y en la nube\n• Políticas de retención\n• Pruebas periódicas de restauración\n• Planes de continuidad operativa\n\n¿Cuántos equipos o servidores necesitas respaldar?'
    },
    {
        pattern: /\bred(es)?\b|\binternet\b|\bwi-?fi\b|\bcablead/,
        message: 'Las redes son el corazón de cualquier negocio. Ofrecemos:\n\n• Diseño de topología de red\n• Instalación de cableado estructurado\n• Configuración de routers y switches\n• Redes Wi-Fi seguras y optimizadas\n• VPN para acceso remoto\n• Monitoreo 24/7\n\n¿Cuántos usuarios/equipos necesitas conectar?'
    },
    {
        pattern: /\btienda\b|\bvend|\bventas?\b|\becommerce\b/,
        message: '¡Excelente! Las tiendas online son un gran negocio. Necesitamos:\n\n• ¿Qué productos o servicios venderás?\n• ¿Métodos de pago que necesitas?\n• ¿Control de inventario?\n• ¿Envíos nacionales o internacionales?\n• ¿Integración con redes sociales?\n\nTe ofrecemos plataformas seguras y fáciles de gestionar. ¿Cuál es tu nicho de mercado?'
    },
    {
        pattern: /\bpaginas?\b|\bsitios?\b|\bweb\b|\bredise/,
        message: 'Perfecto. Para tu página web necesitamos saber:\n\n• ¿Es para empresa, profesional o proyecto personal?\n• ¿Qué información quieres mostrar?\n• ¿Necesitas formulario de contacto?\n• ¿Tienes logo o identidad visual?\n• ¿Presupuesto aproximado?\n\nCon esta información te daremos una propuesta detallada con tiempo y costo.'
    },
    {
        pattern: /\bautomatiz|\bchatbots?\b|\bformularios?\b|\bintegr|\bprocesos?\b|\batencion\b/,
        message: 'Automatizar te ahorra tiempo y errores. Podemos:\n\n• Conectar tus sistemas para que compartan información\n• Crear formularios que envían datos directamente a donde los necesitas\n• Implementar chatbots de atención 24/7\n• Automatizar reservas, cotizaciones y seguimientos\n\n¿Qué herramientas usas hoy en tu negocio?'
    }
];

const genericResponse = 'Entiendo tu necesidad. Para darte la mejor solución, me gustaría saber más detalles:\n\n• ¿Es para uso personal o empresarial?\n• ¿Qué tan urgente es?\n• ¿Tienes un presupuesto en mente?\n• ¿Has intentado algo antes?\n\nCon esta información podré recomendarte la solución perfecta o conectar contigo con uno de nuestros especialistas.';

const affirmativePattern = /^(si|claro|ok|okay|dale|por favor|me gustaria|de acuerdo)\b/;

function processUserInput(input) {
    const text = normalizeText(input.trim());

    if (affirmativePattern.test(text)) {
        const topic = lastTopic ? ` sobre: ${lastTopic}` : '';
        addBotMessage(
            '¡Perfecto! Escríbenos por WhatsApp y un especialista te atenderá para agendar la llamada.',
            {
                href: whatsappUrl(`Hola EasyTech, me gustaría agendar una llamada${topic}.`),
                label: 'Abrir WhatsApp'
            }
        );
        return;
    }

    lastTopic = input.trim();
    const rule = keywordResponses.find(r => r.pattern.test(text));
    addBotMessage(rule ? rule.message : genericResponse);

    // Always offer to connect with human
    setTimeout(() => {
        addBotMessage('¿Te gustaría que uno de nuestros especialistas te contacte directamente para una asesoría personalizada? Responde "sí" y te comunico por WhatsApp, o déjanos tus datos en el formulario de contacto.');
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
chatbotInputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Contact Form: builds the message and opens it in WhatsApp
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(
        Array.from(formData.entries(), ([key, value]) => [key, String(value).trim()])
    );

    // Validate form
    if (!data.name || !data.email || !data.country || !data.message || !data.service) {
        showNotification('Por favor completa todos los campos requeridos.', 'error');
        return;
    }

    const serviceSelect = contactForm.querySelector('#service');
    const serviceLabel = serviceSelect.options[serviceSelect.selectedIndex].text;

    const lines = [
        'Hola EasyTech, les escribo desde el sitio web.',
        '',
        `*Nombre:* ${data.name}`,
        `*Email:* ${data.email}`
    ];
    if (data.phone) {
        lines.push(`*Teléfono:* ${data.phone}`);
    }
    lines.push(`*País:* ${data.country}`);
    lines.push(`*Servicio:* ${serviceLabel}`, '', `*Mensaje:* ${data.message}`);

    const url = whatsappUrl(lines.join('\n'));
    const whatsappWindow = window.open(url, '_blank');
    if (whatsappWindow) {
        whatsappWindow.opener = null;
    } else {
        // Popup blocked: navigate in the same tab instead
        window.location.href = url;
    }

    showNotification('Abriendo WhatsApp… solo presiona "Enviar" en el chat para completar tu mensaje.', 'success');
    contactForm.reset();

    // Track conversion
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
            'event_category': 'contact',
            'event_label': data.service
        });
    }
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.setAttribute('role', type === 'error' ? 'alert' : 'status');
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('notification-out');
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Smooth Scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Service Selection
function selectService(service) {
    openChatbot();
    handleOption(service);
}

// Header scroll effect
function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 100);
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// Reveal elements on scroll
const animateElements = document.querySelectorAll('.service-card, .step, .stat-item, .about-text');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeChatbot();
        setMenuOpen(false);
    }
});

// Current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Console branding
console.log('%c🚀 EasyTech Services S.A.', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%cSoluciones Tecnológicas Simples, Seguras y Eficientes', 'font-size: 14px; color: #6b7280;');
console.log('%c📧 info@easytechservices.cr | 🌐 easytechcr.net', 'font-size: 12px; color: #9ca3af;');
