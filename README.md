# 🎓 UTN FRLP - Planificador de Correlativas Inteligente

![Astro](https://img.shields.io/badge/Astro-0C111A?style=for-the-badge&logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

Una aplicación full-stack diseñada para que los estudiantes de la **Universidad Tecnológica Nacional (FRLP)** gestionen su progreso académico de forma visual, aplicando las reglas de correlatividades del **Plan 2023 (Ordenanza 1878)**.

🌐 **[Ver la aplicación en vivo (Deploy en Vercel)](https://utn-correlativas.vercel.app/)** 
## ✨ Características Principales

* **Ciclo de Estado Triple:** Gestión avanzada de materias en tres niveles: *Pendiente*, *Cursada* (Regular) y *Aprobada* (Final), con indicadores visuales diferenciados (íconos de librito y check).
* **Validación Lógica en Tiempo Real:** Interfaz reactiva que habilita o bloquea materias basándose en el cumplimiento de correlativas previas.
* **Gestión de Estados en Cascada:** Implementación de algoritmos basados en grafos para la selección y deselección recursiva de materias y sus dependencias.
* **Persistencia Inteligente:** Sistema híbrido que detecta automáticamente si el usuario está autenticado para sincronizar con la nube o mantener los datos localmente via `localStorage`.

## 🏗️ Arquitectura y Decisiones de Ingeniería

Este proyecto fue diseñado bajo principios de **Scalability** y **Clean Code**, priorizando un alto rendimiento y seguridad:

1.  **Arquitectura de Islas (Astro):** Se utiliza Astro para minimizar el bundle de JavaScript, hidratando únicamente los componentes de React que gestionan la interactividad del planificador.
2.  **Seguridad a nivel de Datos (RLS):** Implementación de **Row Level Security** en PostgreSQL (Supabase), garantizando que cada estudiante solo pueda leer y escribir su propio progreso mediante políticas de seguridad robustas.
3.  **Abstracción de Lógica (Hooks):** Uso de Hooks personalizados (`useMaterias`) para desacoplar las reglas de negocio de la UTN de la capa de presentación, facilitando el mantenimiento y el testing.

## 🧠 Desafíos Técnicos Resueltos

### 1. Modelado de Grafos (DAG)
El plan de estudios no es una lista lineal, sino un **Grafo Acíclico Dirigido (DAG)**. 
- Desarrollé algoritmos **recursivos** para manejar el "Efecto Dominó": si un usuario desmarca una materia como aprobada, el sistema recorre el grafo hacia adelante para deshabilitar automáticamente todas las materias que pierden su sustento lógico.

### 2. Sincronización de Estado Híbrido y Race Conditions
Uno de los mayores retos fue evitar inconsistencias entre el inicio de sesión y el estado local:
- Implementé una lógica de guardado directo por eventos para mitigar *race conditions* que ocurrían con autoguardados basados en estados asíncronos de React.

## 📈 Metodología de Desarrollo

Para este proyecto, adopté un enfoque de **Desarrollo Asistido por IA (LLMs)**, actuando como arquitecto y revisor técnico. Esta metodología me permitió delegar el código *boilerplate* y enfocar mis esfuerzos en la optimización de los algoritmos de grafos, la normalización de la base de datos y la implementación de políticas de seguridad en Supabase.

## 🚀 Instalación y Uso Local

```bash
# 1. Clonar el repositorio
git clone [https://github.com/lauzubiri/UTN-Correlativas.git](https://github.com/lauzubiri/UTN-Correlativas.git)

# 2. Instalar dependencias
pnpm install

# 3. Configurar variables de entorno (.env)
PUBLIC_SUPABASE_URL=tu_url_aqui
PUBLIC_SUPABASE_ANON_KEY=tu_key_aqui

# 4. Iniciar servidor de desarrollo
pnpm dev
