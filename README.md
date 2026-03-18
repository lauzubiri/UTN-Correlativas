# 🎓 UTN FRLP - Mapa de Correlativas Interactivo

![Astro](https://img.shields.io/badge/Astro-0C111A?style=for-the-badge&logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

Una aplicación web escalable de tipo SPA (Single Page Application) diseñada para ayudar a los estudiantes de la **Universidad Tecnológica Nacional (FRLP)** a planificar su carrera, visualizar sus materias aprobadas y calcular automáticamente las correlatividades habilitadas.

🌐 **[Ver la aplicación en vivo (Deploy en Vercel)](https://utn-correlativas.vercel.app/)** 

## ✨ Características Principales

* **Multi-Carrera:** Soporte arquitectónico para múltiples planes de estudio (Ingeniería en Sistemas, Ingeniería Industrial).
* **Validación Lógica en Tiempo Real:** Interfaz reactiva que ilumina las materias habilitadas basándose en los requisitos cumplidos (cursadas, finales, cantidad de materias aprobadas).
* **Gestión de Estados en Cascada:** Implementación de algoritmos basados en grafos para la selección/deselección recursiva de materias y sus dependencias (hacia adelante y hacia atrás).
* **Persistencia de Datos:** Uso de `localStorage` para que el estudiante no pierda su progreso al cerrar el navegador.

## 🧠 Arquitectura y Decisiones de Ingeniería

Este proyecto fue refactorizado con un enfoque en la **Escalabilidad** y **Clean Code**:

1. **Estandarización de Datos (Normalización):** Se migró de un sistema de correlativas simples a un modelo de `Requisitos` tipado estrictamente con TypeScript. Esto permite que la interfaz sea *agnóstica* a la carrera y pueda manejar reglas de negocio complejas (ej. "Tener 5 finales aprobados para cursar").
2. **Carga Diferida (Lazy Loading):**
   Los JSON de las carreras se cargan bajo demanda utilizando importaciones dinámicas (`import()`), optimizando el peso inicial (bundle size) de la aplicación.
3. **Componentización Eficiente:**
   Uso de Hooks personalizados (`useMaterias`) para separar la lógica de negocio (reglas de la UTN) de la capa de presentación (React UI).

## 🚀 Instalación y Uso Local

Si querés correr el proyecto en tu máquina:

```bash
# 1. Clonar el repositorio
git clone [https://github.com/lauzubiri/UTN-Correlativas.git](https://github.com/lauzubiri/UTN-Correlativas.git)

# 2. Instalar las dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
