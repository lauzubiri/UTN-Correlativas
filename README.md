# 🎓 UTN FRLP Academic Planner (Plan 2023)

Una aplicación web interactiva diseñada para estudiantes de Ingeniería en Sistemas de la UTN FRLP. Permite visualizar el plan de estudios, marcar el progreso académico y entender las correlatividades de forma intuitiva.

Desarrollada utilizando **Astro** como base estática y **React** para las islas de interactividad.

## 🚀 Tech Stack

* **Core:** [Astro](https://astro.build/) (Static Site Generation + Islands Architecture)
* **UI/Logic:** [React](https://reactjs.org/) (Hooks personalizados & State Management)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Diseño Responsive & Utility-first)
* **Language:** [TypeScript](https://www.typescriptlang.org/) (Tipado estricto para robustez)
* **Data:** JSON estructurado basado en la Ordenanza 1877 (Plan 2023).

## ✨ Características Clave

### 1. 🧠 Algoritmo Recursivo de Correlativas (`useMaterias`)
Implementación de un **Custom Hook** que maneja la lógica de dependencias bidireccional:
* **Cascada Futura:** Al desmarcar una materia, el sistema recorre recursivamente el grafo hacia adelante para desmarcar automáticamente todas las materias que dependían de ella, evitando estados inconsistentes.
* **Cascada Pasada:** Al aprobar un año completo, el sistema busca hacia atrás (ancestros) para asegurar que todos los requisitos previos estén cumplidos.

### 2. 🖱️ UX Avanzada: Drag-to-Scroll (`useDragScroll`)
Para mejorar la navegación en Desktop sin perder la sensación nativa en Mobile, se desarrolló un hook matemático que permite arrastrar la grilla horizontalmente ("grab & drag"), calculando el diferencial de movimiento del mouse (`mousemove`) para ajustar el `scrollLeft` del contenedor.

### 3. 🔦 Feedback Visual Proactivo
En lugar de listas de texto aburridas, el sistema ilumina la interfaz:
* Si intentas marcar una materia bloqueada, el sistema **resalta (Highlight)** visualmente en la grilla cuáles son las materias faltantes exactas que necesitas aprobar.
* Implementación de notificaciones tipo "Toast" no intrusivas.

### 4. 💾 Persistencia de Datos
Uso de `localStorage` sincronizado con `useEffect` para guardar el progreso del estudiante en el navegador automáticamente.

## 📂 Estructura del Proyecto

El código sigue una arquitectura modular y escalable:

```bash
src/
├── components/
│   └── planificador/       # Módulo encapsulado del planificador
│       ├── index.tsx       # Componente orquestador
│       ├── MateriaCard.tsx # UI de Tarjeta (Presentational Component)
│       └── Toast.tsx       # Sistema de notificaciones
├── hooks/
│   ├── useMaterias.ts      # Lógica de negocio (Grafo de correlativas)
│   └── useDragScroll.ts    # Lógica de UI (Física del scroll)
├── data/
│   └── materias.ts         # Fuente de verdad (Plan de estudios 2023)
└── pages/
    └── index.astro         # Punto de entrada (Islands architecture)
