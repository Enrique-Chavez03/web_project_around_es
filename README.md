# Around The U.S.

## Descripción

*Around The U.S.* es una aplicación web interactiva que permite a los usuarios explorar una galería de lugares turísticos de Estados Unidos. Los usuarios pueden editar su perfil, agregar nuevas tarjetas con imágenes personalizadas, dar "me gusta" a sus lugares favoritos, eliminar tarjetas y ver imágenes en tamaño completo a través de ventanas modales.

El proyecto demuestra la manipulación dinámica del DOM, gestión de eventos y creación de elementos utilizando JavaScript puro (Vanilla JS), sin frameworks externos.

## Propósito

El propósito principal de este proyecto es aplicar conceptos fundamentales de desarrollo frontend:

- Manipulación avanzada del DOM
- Creación dinámica de elementos HTML
- Gestión de eventos y formularios
- Implementación de ventanas modales (popups)
- Organización de código con funciones reutilizables

## Tecnologías y técnicas utilizadas

### Tecnologías base
- *HTML5* - Estructura semántica del documento
- *CSS3* - Estilos y diseño responsive (archivos externos)
- *JavaScript (ES6+)* - Toda la lógica interactiva del sitio

### JavaScript - Técnicas implementadas
| Técnica | Descripción |
|---------|-------------|
| Manipulación del DOM | Creación, modificación y eliminación dinámica de elementos |
| Manejo de eventos | Uso de addEventListener() para capturar interacciones de usuario |
| Template HTML | Uso de <template> para clonar estructura de tarjetas |
| Funciones flecha | Sintaxis moderna de ES6 para callbacks concisos |
| Parámetros por defecto | Manejo robusto de datos incompletos en tarjetas |
| Desestructuración de objetos | Extracción eficiente de propiedades: const { name, link } = cardData |
| Métodos de arrays | forEach() para iterar y renderizar colecciones de datos |
| Clases CSS dinámicas | classList.toggle() para manejar estados interactivos |
| Validación de formularios | Campos requeridos y tipos específicos (URL) |

### Patrones de arquitectura
- *Programación declarativa* - Funciones puras y reutilizables
- *Separación de responsabilidades* - Handlers específicos para cada acción del usuario
- *Código modular* - Organización en funciones especializadas y bien definidas

## Funcionalidades principales

### 1. Gestión de Perfil
- Editar nombre y descripción del usuario
- Formulario con valores pre-cargados del perfil actual
- Actualización en tiempo real al guardar cambios

### 2. CRUD de Tarjetas

| Operación | Función | Descripción |
|-----------|---------|-------------|
| *Crear* | getCardElement() | Crea nuevas tarjetas desde un template HTML |
| *Leer* | renderCards() | Muestra todas las tarjetas del array inicial |
| *Actualizar* | handleLikeButton() | Cambia el estado visual del botón "me gusta" |
| *Eliminar* | handleDeleteCard() | Elimina tarjetas del DOM permanentemente |

### 3. Sistema de Modales (Popups)
La aplicación cuenta con tres ventanas modales:

- *Editar perfil* - Formulario para actualizar datos del usuario
- *Nueva tarjeta* - Formulario para agregar nuevas imágenes a la galería
- *Vista ampliada* - Muestra la imagen en tamaño completo con su título

### 4. Interacciones del usuario

#### Abrir y cerrar modales
```javascript
openModal(modalElement)   // Agrega clase 'popup_is-opened'
closeModal(modalElement)  // Remueve la clase y cierra el modal
