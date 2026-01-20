# EasyTech Services S.A. - Sitio Web Corporativo

## 🚀 Despliegue en Vercel

### Opción 1: Via GitHub (Recomendado)

1. **Subir a GitHub**
   ```bash
   git add .
   git commit -m "Initial commit - EasyTech Services website"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/easytech-services.git
   git push -u origin main
   ```

2. **Conectar con Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Clic en "New Project"
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente que es un sitio estático
   - Clic en "Deploy"

### Opción 2: Vercel CLI

1. **Instalar Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Desplegar directamente**
   ```bash
   vercel --prod
   ```

## 📁 Estructura del Proyecto

```
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Funcionalidad JavaScript
├── README.md           # Este archivo
└── .gitignore          # Archivos ignorados por Git
```

## 🎯 Características

- ✅ Diseño responsive para todos los dispositivos
- ✅ Chatbot inteligente con navegación guiada
- ✅ Formulario de contacto funcional
- ✅ Animaciones y microinteracciones
- ✅ Optimizado para SEO
- ✅ Accesibilidad mejorada

## 🔧 Personalización

Para personalizar el sitio:

1. **Editar información de contacto** en `index.html`
2. **Modificar colores** en `styles.css` (variables CSS)
3. **Ajustar textos** en los archivos HTML
4. **Configurar dominio personalizado** en Vercel Dashboard

## 📞 Contacto

- **Email**: info@easytechservices.cr
- **Teléfono**: +506 2222-3333
- **WhatsApp**: +506 8888-9999
- **Ubicación**: San José, Costa Rica

---

© 2024 EasyTech Services S.A. Todos los derechos reservados.
