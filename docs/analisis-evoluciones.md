# Análisis de funcionalidad: consulta rápida de evoluciones

**Estado:** análisis aprobado en conversación (2026-07-22). Pendiente de implementación.

## 1. Objetivo y caso de uso

Mientras se juega (en combate, tras una captura, o simplemente avanzando), poder consultar
en segundos **a qué evoluciona un Pokémon, a qué nivel / bajo qué condición, y cuánto
esfuerzo cuesta** conseguirlo en *Pokémon Esmeralda* concretamente.

Decisiones tomadas:

| Decisión | Elección |
|---|---|
| Alcance | Solo Esmeralda primero; diseño replicable a gen 4/5/6 |
| Cobertura | Pokédex regional de Hoenn completa (202 especies) |
| Puntos de entrada UI | Sprites clicables + buscador Ctrl+K + sección dedicada |
| Origen de datos | Fichero estático curado (generado una vez desde PokéAPI) |

## 2. Contexto técnico del proyecto

- Sitio 100% estático, sin build ni dependencias: HTML + CSS + JS vanilla (IIFE), GitHub Pages.
- Dos pantallas por guía: `index.html` (referencia, secciones con sidebar) y `jugando.html`
  (compañera paso a paso; datos en `assets/js/companion.js` → array `STOPS`, mapa `NAME`
  con ~90 Pokémon, sprites desde el CDN de PokéAPI en GitHub).
- Buscador global compartido (`assets/js/search.js`, Ctrl+K) que indexa el DOM de la página actual.
- Estado en `localStorage` (progreso, tema, parada actual, filtro).

La funcionalidad debe respetar este estilo: **sin frameworks, sin red en tiempo de consulta,
ficheros JS con datos embebidos**.

## 3. Capa de datos

### 3.1 Fichero `assets/js/evolutions.js`

Un objeto global (mismo patrón IIFE/global que `companion.js`) indexado por nº de Pokédex
Nacional, con las 202 especies de Hoenn (y los miembros de sus familias aunque caigan fuera,
p. ej. bebés por incienso):

```js
window.EVOS = {
  280: { name: "Ralts", family: [280, 281, 282],
         evolvesTo: [{ to: 281, method: "level", level: 20 }] },
  281: { name: "Kirlia", family: [280, 281, 282],
         evolvesTo: [{ to: 282, method: "level", level: 30 }] },
  349: { name: "Feebas", family: [349, 350],
         evolvesTo: [{ to: 350, method: "beauty",
                       how: "Sube su Belleza al máximo con Pokoblocks azules y sube 1 nivel",
                       link: "feebas" }] },
  ...
};
```

Campos por arista de evolución:

- `to` — id de la especie resultante.
- `method` — `level | stone | trade | tradeItem | happiness | beauty | special`.
- `level` / `item` / `condition` según método.
- `how` — texto corto **específico de Esmeralda**: dónde está la piedra, cómo hacer el
  intercambio en emulador, etc. Aquí vive el "esfuerzo que me requeriría".
- `link` — clave opcional hacia secciones existentes de la guía (`feebas`, `pokedex`, `emu`,
  `cria`…), reutilizando el patrón `L` de `companion.js`.
- `note` — avisos (p. ej. "no obtenible en Esmeralda").

Casos con estructura especial:

- **Ramas**: `evolvesTo` es un array → Wurmple (Silcoon/Cascoon, aleatorio por personalidad),
  Clamperl (Huntail/Gorebyss según objeto + intercambio), Eevee (5 ramas en gen 3),
  Tyrogue (por stats, línea Nacional).
- **Nincada**: arista normal a Ninjask (Nv. 20) + `bonus: { to: 292, condition: "hueco libre
  en el equipo + una Poké Ball en la mochila" }` para Shedinja.
- **Bebés inversos**: Azurill y Wynaut se marcan con `obtainedBy: "huevo con incienso"` para
  que la ficha explique cómo se consigue el eslabón inferior de la cadena.

Peso estimado: 15–30 KB sin minificar. Irrelevante para la carga.

### 3.2 Generación + curación

Script one-off `scripts/build-evodata.mjs` (Node, se ejecuta en desarrollo, **no** en runtime):

1. Descarga de PokéAPI las `evolution-chain` de las 202 especies de Hoenn.
2. Filtra métodos a reglas de gen 3 (descarta evoluciones de gen 4+ como Magnezone, Dusknoir,
   Gallade, Froslass, Sylveon…; descarta objetos/mecánicas inexistentes en RSE).
3. Emite `assets/js/evolutions.js` con los `how` vacíos.

Después, **pasada de curación manual** (esto es lo que da valor y lo que PokéAPI no sabe):

- Localización de piedras en Esmeralda: Piedra Fuego (Sendero Ígneo), Trueno (Nueva Malvalona),
  Hoja (Ruta 119), Agua (Barco Abandonado), Lunar (Cascada Meteoro), Solar (Centro Espacial de
  Algaria), y el cazatesoros de la Ruta 124 (fragmentos → piedras).
- Evoluciones por intercambio: nota "en emulador: dos instancias de mGBA (Club de Intercambio)
  o PKHeX" con enlace a la sección Emulador ya existente.
- Amistad: cómo subirla rápido (caminar, vitaminas, no debilitarse) y el aviso inverso de la
  Piedra Eterna.
- **No obtenibles en Esmeralda**: Espeon/Umbreon (RSE no tiene ciclo día/noche válido para
  evolución → solo vía Colosseum/XD), evoluciones de intercambio con juegos FRLG para líneas
  Nacionales, etc. Se muestran atenuadas con la explicación, no se ocultan.
- Peculiaridades ya documentadas en la guía (Feebas→Milotic, Wurmple aleatorio, truco
  Shedinja): la ficha enlaza a esas secciones en vez de duplicar el texto largo.

Los nombres de especie se mantienen en inglés (la localización española de los juegos no los
traduce y toda la guía ya los usa así). El mapa `NAME` de `companion.js` queda redundante:
`spriteHTML()` puede resolver el nombre desde `EVOS` con fallback al mapa actual.

## 4. Capa de UI

### 4.1 Componente central: ficha emergente (`assets/js/evoview.js` + `assets/css/evo.css`)

Un único componente compartido por las tres vías de entrada. `EvoView.open(id)` muestra:

- **Cadena completa** de la familia con sprites (CDN PokéAPI ya usado), resaltando el Pokémon
  consultado, con flechas y la condición bajo cada flecha:
  `Aron ──Nv. 32──▶ Lairon ──Nv. 42──▶ Aggron`.
- **Badge por método**: 📈 nivel · 💎 piedra · 🔁 intercambio · 💞 amistad · ✨ especial.
- **Nota de esfuerzo** (`how`): dónde conseguir la piedra, cómo intercambiar en emulador…
- Enlaces `📖` a las secciones de la guía cuando existan (mismo estilo `wt-hl__link`).
- Ramas en vertical (Wurmple, Eevee, Clamperl); bonus de Shedinja como rama especial.

Formato: **bottom-sheet en móvil, modal centrado en escritorio** (el caso de uso es jugar con
la guía en el móvil o en una segunda pantalla). `role="dialog"`, cierre con Esc / toque fuera,
sin dependencias.

### 4.2 Integración 1 — sprites clicables (`jugando.html`)

- Los `.wt-sprite` que ya se renderizan en cada parada/ficha pasan a ser botones que llaman a
  `EvoView.open(id)`. Cambio mínimo en `companion.js` (delegación de eventos en `#wtTimeline`,
  igual que ya se hace con `[data-here]`).
- Afinado visual: cursor pointer + pequeño indicador para que se descubra que son tocables.

### 4.3 Integración 2 — buscador Ctrl+K (`search.js`)

- Al construir el índice, si `window.EVOS` existe se añaden entradas sintéticas por especie:
  sección `🧬 Evolución`, título `Aron → Lairon (Nv. 32) → Aggron (Nv. 42)`.
- `pick()` distingue este tipo de resultado y abre la ficha en vez de hacer scroll.
- Con esto se cubre el caso "me encuentro un Pokémon que no sale en ninguna ficha de la guía":
  cualquier especie de Hoenn es consultable desde cualquier página.

### 4.4 Integración 3 — sección "🧬 Evoluciones" (`index.html`)

- Nueva sección con entrada en el sidebar, renderizada por JS desde `EVOS` (a diferencia del
  resto del contenido estático; es la opción que evita mantener 202 fichas a mano).
- Vista tipo Pokédex: rejilla de cadenas, con chips de filtro por método (reutilizando el
  estilo `wt-chip`) — "ver todo lo que evoluciona por piedra", "todo lo de intercambio", etc.
- Cada cadena abre la misma ficha emergente al tocarla.
- Se añade el atajo `evos` al mapa `L` de `companion.js` para poder enlazarla desde las paradas.

## 5. Ficheros afectados

```
assets/js/evolutions.js    NUEVO  · datos (202 especies, curados para Esmeralda)
assets/js/evoview.js       NUEVO  · ficha emergente compartida
assets/css/evo.css         NUEVO  · estilos de ficha + sección
scripts/build-evodata.mjs  NUEVO  · generador one-off (desarrollo)
assets/js/companion.js     EDIT   · sprites clicables, NAME → fallback a EVOS, atajo L.evos
assets/js/search.js        EDIT   · entradas sintéticas de evolución en el índice
jugando.html               EDIT   · cargar evolutions.js, evoview.js, evo.css
index.html                 EDIT   · idem + sección #evoluciones + enlace en sidebar
```

Sin cambios en el modelo de `localStorage` (la ficha no tiene estado persistente).

## 6. Plan por fases

1. **Datos** — script generador + curación manual de Esmeralda. *Es el grueso del esfuerzo.*
2. **Ficha emergente** + sprites clicables en `jugando.html` (ya cubre el 80% del caso de uso).
3. **Buscador** — especies consultables desde Ctrl+K en ambas pantallas.
4. **Sección dedicada** en `index.html` con filtros por método.
5. *(Futuro)* Réplica a gen 4/5/6: `evoview.js` se parametriza (ruta de sprites por gen) y solo
   hace falta un `evolutions.js` por generación con su curación propia (Sinnoh reintroduce
   hora del día y nuevos objetos; Kalos añade amistad+tipo, etc.).

## 7. Riesgos y casos límite

- **Fidelidad gen 3**: el mayor riesgo es dar datos "modernos" incorrectos (PokéAPI describe la
  última generación). Mitigación: filtro por gen en el generador + lista de curación explícita
  (sección 3.2) + validación cruzada con la propia guía.
- **Sprites**: dependen del CDN de PokéAPI (patrón ya asumido en todo el sitio); existe el
  fallback `onerror` actual que muestra el nombre.
- **Consistencia**: pequeño script/check de desarrollo que verifique que todo id usado en
  `STOPS[].mons` y en `EVOS[].evolvesTo[].to` existe en `EVOS`.
- **Rendimiento**: nulo; todo estático y local, sprites con `loading="lazy"`.
