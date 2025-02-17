# Codenames Solver (🇨🇿)

[English version below](#english)

Tento projekt se zaměřuje na optimalizaci hry Krycí jména. Využívá různé algoritmy s cílem rychle a efektivně uhodnout nebo předat nápovědu.

**Demo:** [https://codenames.krychlic.com](https://codenames.krychlic.com)

## Dostupné algoritmy

### Dictionary

Využívá faktu, že obě strany znají seřazený slovník českých slov. S pomocí toho mapuje libovolnou konfiguraci `Grid` s 9 či méně agenty na právě jednu kombinaci `word` a `hint`, čímž je schopen vyhrát libovolnou pozici v jednom tahu.

## Instalace a spuštění

1. **Instalace závislostí**

    ```bash
    pnpm install
    ```

2. **Vygenerování lookup table**  
   Nejprve vytvořte složku `public/algorithms/dictionary`, poté spusťte:

    ```bash
    node util.js
    ```

3. **Spuštění aplikace**
    ```bash
    pnpm run dev
    ```

## Přispívání

Chcete přidat vlastní algoritmus?

1. Implementujte abstraktní třídu `Algorithm` v `src/lib/algorithms/algorithm.ts`
2. Přidejte instanci algoritmu do mapy `algorithms` v `src/App.tsx`
3. Otevřete pull request s popisem změn

## Slovníček pojmů

-   `Grid`: Herní pole 5×5, strukturované jako pole 5 řádků boolean hodnot
-   `Word`: Spisovné české slovo nebo ustálené slovní spojení (bez zkratek a cizích slov)
-   `Hint`: Číselná nápověda (0-9 nebo ∞)

<h1 id="english">Codenames Solver (🇬🇧)</h1>

This project focuses on optimizing the game Codenames. It uses various algorithms to quickly and efficiently guess or give clues.

**Demo:** [https://codenames.krychlic.com](https://codenames.krychlic.com)

## Available Algorithms

### Dictionary

Uses the fact that both sides know a sorted dictionary of Czech words. It maps any `Grid` configuration with 9 or fewer agents to exactly one `word` and `hint` combination, allowing it to win any position in a single turn.

## Installation and Setup

1. **Install dependencies**

    ```bash
    pnpm install
    ```

2. **Generate lookup table**  
   First create the `public/algorithms/dictionary` folder, then run:

    ```bash
    node util.js
    ```

3. **Start the application**
    ```bash
    pnpm run dev
    ```

## Contributing

Want to add your own algorithm?

1. Implement the abstract `Algorithm` class in `src/lib/algorithms/algorithm.ts`
2. Add your algorithm instance to the `algorithms` map in `src/App.tsx`
3. Open a pull request describing your changes

## Glossary

-   `Grid`: 5×5 game board, structured as an array of 5 rows of boolean values
-   `Word`: Standard Czech word or established phrase (no abbreviations or foreign words)
-   `Hint`: Numerical hint (0-9 or ∞)

---

By K0stka, 2025
