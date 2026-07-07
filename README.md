# Guías 100% Pokémon 🟢🔵⚫🔴

Wiki web **completa, visual e interactiva** para completar al 100% en emulador los grandes juegos de Pokémon:

| Guía | Juego de referencia | Carpeta |
|---|---|---|
| 🟢 Gen 3 · Hoenn | Pokémon Esmeralda | `/` (raíz) |
| 🔵 Gen 4 · Sinnoh | Pokémon Platino | `gen4/` |
| ⚫ Gen 5 · Teselia | Pokémon Negro 2 / Blanco 2 | `gen5/` |
| 🔴 Gen 6 · Kalos | Pokémon X / Y | `gen6/` |

👉 Abre `index.html` (guía de referencia) o `jugando.html` (compañera paso a paso para llevar mientras juegas). Cada generación tiene sus dos páginas equivalentes.

## Dos modos por guía

- **`index.html`** — Guía de referencia 100%: gimnasios, legendarios, puzzles, instalaciones de combate, Pokédex… con seguimiento de progreso por categorías.
- **`jugando.html`** — Compañera de juego: la ruta paso a paso con **solo lo importante y lo no obvio** (objetos clave, capturas que merecen la pena, secretos fáciles de perderse), sprites oficiales, marcador de "📍 Estoy aquí" y filtros (No perder / Secretos / Combates…).

## Qué incluye (ejemplo: Esmeralda)

- 🏅 **Gimnasios y Liga** — tipos, MTs, estrategias y las revanchas del PokéNav.
- 🌟 **Todos los legendarios** — Groudon, Kyogre, Rayquaza, los Regis, Latios/Latias y los de evento (Deoxys, Mew, Ho-Oh, Lugia, Jirachi).
- 🧩 **Puzzles Braille resueltos** — Cámara Sellada, santuarios Regi y la secuencia exacta del triángulo de Deoxys.
- 🏝️ **Islas y áreas secretas** — Isla Espejismo, Cueva Artesana, Pasadizo Desértico (¡Ditto!), Safari ampliada, el combate secreto contra Máximo…
- 🎟️ **Tickets de evento** con códigos Gameshark para emulador.
- ⚔️ **Frontera de Batalla** — las 7 instalaciones, cuándo aparece cada Cerebro y los 14 símbolos.
- 📕 **Pokédex Nacional (386)**, 🐟 **Feebas → Milotic**, 🎀 **Concursos**, 🎓 **Tutores**, 🥚 **Cría/EVs/IVs**.

## Características

- ✅ **Seguimiento de progreso**: marca casillas y tu avance se guarda en el navegador (`localStorage`).
- 📊 Panel con anillo de progreso global y barras por categoría.
- 🔎 **Buscador global** en cada página (`Ctrl+K` o `/`).
- 📱 **Responsive** (menú lateral colapsable en móvil) y accesible por teclado.
- 🌙 **Tema claro / oscuro** compartido entre páginas.

## Estructura

```
index.html / jugando.html      # Guía Gen 3 (Esmeralda)
gen4/ gen5/ gen6/              # Guías Gen 4, 5 y 6 (misma estructura)
assets/css/style.css           # Diseño compartido (tema Esmeralda, responsive)
assets/css/companion.css       # Estilos de la compañera paso a paso
assets/js/app.js               # Progreso, tema, navegación, acordeones, pestañas
assets/js/search.js            # Buscador global (Ctrl+K)
assets/js/companion.js         # Datos + renderer de la ruta paso a paso
```

> Recurso educativo de fans. Pokémon © Nintendo / Game Freak / The Pokémon Company. Datos contrastados con Bulbapedia, WikiDex y Serebii.
