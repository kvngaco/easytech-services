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
- ✅ Formulario de contacto que envía el mensaje por WhatsApp
- ✅ Animaciones y microinteracciones
- ✅ Optimizado para SEO
- ✅ Accesibilidad mejorada

## 🔧 Personalización

### Número de WhatsApp

El formulario de contacto y el chatbot abren WhatsApp con el mensaje ya escrito.
El número que recibe los mensajes se configura en `script.js`:

```js
const WHATSAPP_NUMBER = '50661386223'; // código de país + número, sin espacios ni signos
```

Si cambias el número, actualiza también los enlaces `https://wa.me/...` en `index.html`
(sección Contacto y footer).

### Otros cambios

1. **Editar información de contacto** en `index.html` (incluye los datos estructurados JSON-LD del `<head>`)
2. **Modificar colores** en `styles.css` (variables CSS)
3. **Ajustar textos** en los archivos HTML
4. **Configurar dominio personalizado** en Vercel Dashboard

## 📞 Contacto

- **Email**: info@easytechcr.net
- **Teléfono**: +506 6138-6223
- **WhatsApp**: +506 6138-6223
- **Oficina central**: San José, Costa Rica
- **Cobertura**: Costa Rica, Perú y Argentina
- **Sitio web**: https://easytechcr.net

---

© EasyTech Services S.A. Todos los derechos reservados.
