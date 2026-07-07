# Around The U.S.

## Descripción

*Around The U.S.* es una aplicación web interactiva que permite a los usuarios explorar una galería de lugares turísticos de Estados Unidos. Los usuarios pueden editar su perfil, agregar nuevas tarjetas con imágenes personalizadas, dar "me gusta" a sus lugares favoritos, eliminar tarjetas y ver imágenes en tamaño completo a través de ventanas modales.

El proyecto está construido con JavaScript moderno (ES6+), utilizando programación orientada a objetos y módulos para una organización clara y mantenible del código.

## Propósito

El propósito principal de este proyecto es aplicar conceptos fundamentales de desarrollo frontend:

- Aplicar principios de programación Orientada a Objetos (POO) en JavaScript.
- Organizar el código en módulos reutilizables. 
- Gestionar el DOM de forma dinámica y eficiente.
- Implementar validación de formularios con feedback visual. 
- Manejar eventos y venatanas modales con buenas prácticas.

## Tecnologías y técnicas utilizadas

### Tecnologías base
- *HTML5* - Estructura semántica del documento
- *CSS3* - Estilos y diseño responsive (archivos externos)
- *JavaScript (ES6+)* - Toda la lógica completa de la aplicación.

### JavaScript - Técnicas implementadas
| Característica | Técnica |
|---------|-------------|
| Manipulación del DOM | Creación, modificación y eliminación dinámica de elementos |
| Manejo de eventos | Uso de addEventListener() para capturar interacciones de usuario |
| Template HTML | Uso de <template> para clonar estructura de tarjetas |
| Funciones flecha | Sintaxis moderna de ES6 para callbacks concisos |
| Parámetros por defecto | Manejo robusto de datos incompletos en tarjetas |
| Desestructuración de objetos | Extracción eficiente de propiedades: const { name, link } = cardData |
| Métodos de arrays | forEach() para iterar y renderizar colecciones de datos |
| Clases CSS dinámicas | classList.toggle(), add() y remove() para manejar estados interactivos |
| Validación de formularios | Campos requeridos y tipos específicos (URL), y la API de validación del navegador |
| Clases ES6 | Card y FormValidatior encapsulan la lógica y el estado de cada componente |
| Módulos ES6 | Código dividivo en Card.js, FormValidator.js, utils.js e index.js; uso de export e import. |
| Metodos privados | Convención _metodo() para encapsular detalles internos de las clases | 

### Patrones de arquitectura
- *Programación declarativa* - Funciones puras y reutilizables
- *Separación de responsabilidades* - Handlers específicos para cada acción del usuario
- *Código modular* - Organización en funciones especializadas y bien definidas
- Programación orientada a objetos: Cada entidad (tarjeta, validador) es una clase con sus propios métodos y estado.
- Separación de responsabilidades: Cada módulo tiene una función única y bien definida.
- Código declarativo: Funciones puras y reutilizables para abrir/cerrar modales.
- Escalabilidad: La estructura modular facilita añadir nuevas funcionalidades sin modificar el código existente.

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


### 4. Funcionalidades principales 2da parte
Gestión del perfil

- Editar nombre y descripción del usuario.
- El formulario se precarga con los datos actuales.
- Los cambios se reflejan en tiempo real al guardar.

### 5. CRUD de Tarjetas

| Operación | Función | Descripción |
| --------- | ------- | ----------- |
| Crear  | renderCard() + clase Card  | Crea una nueva tarjeta desde el template y la añade al contenedor |
| Leer  | renderCards()   |    Muestra todas las tarjetas del array initialCards
| Actualizar  | _handleLikeClick() (método privado)  | Alterna el estado activo del botón "Me gusta".
| Eliminar  |  _handleDeleteClick() (método privado)  |  Elimina la tarjeta del DOM de forma permanente. |

### 6. Sistema de Modales (Popups)

- Editar perfil: Formulario para actualizar datos del usuario.
- Nueva tarjeta:  Formulario para agregar nuevas imágenes a la galeria.
- Visita ampliada:  Muestra la imagen de tamaño completo con su título.

### 6. Iteracciones del usuario 
Abrir y cerrar modales

// Funciones importadas desde utils.js
openModal(modalElement)  // agrega clase `popup_is-opened`
closeModal(modalElement)  // Remueve la clase y cierra el modal.

### 7. Validación de formularios
Cada formulario es valido por una instancia de FormValidator. La validación es en tiempo real y el botón de envío permanece deshabilitado hasta que todos los campos sean válidos.

### 8. Cómo ejecutar el proyecto.

- Clona el repositorio en la máquina local.
- Abre el archivo index.html en tu navegador preferido (no es necesario un servidor, pero se recomienda usar un servidor local como Live Server de VS Code para evitar problemas con CORS al cargar imágenes externas).
- Asegúrate de que todos los archivos CSS e imágenes estén en las rutas correctas.
