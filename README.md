# Codenames Solver

Tento projekt se zaměřuje na optimalizaci hry Krycí jména. Využívá různé algoritmy, například i steganografii, s cílem rychle a efektivně uhodnout nebo předat nápovědu.

**Demo:** [https://codenames.krychlic.com](https://codenames.krychlic.com)

---

## Dostupné algoritmy

### Dictionary

Využívá faktu, že obě strany znají seřazený slovník českých slov. S pomocí toho mapuje libovolnou konfiguraci na právě jednu kombinaci `word` a `hint` čímž pádem je schopen vyhrát libovolnou pozici s 9 či méně agenty v jednom tahu.

---

## Přispívání

Chcete přidat vlastní algoritmus?

1. Implementujte abstraktní třídu `Algorithm` v souboru `src/lib/algorithms/algorithm.ts`. (Jakožto inspiraci můžete využít `src/lib/algorithms/dictionary.ts`)
2. Přidejte instanci Vašeho algoritmu do mapy `algorithms` v `src/App.tsx`.
3. Otevřete pull request s popisem, jak se změny liší od stávající implementace.

---

## Instalace a spuštění

1. **Instalace závislostí**

    ```bash
    pnpm install
    ```

2. **Vygenerování lookup table**  
   (první musíte vytvořit složky `public/algorithms/dictionary`)

    ```bash
    node util.js
    ```

3. **Spuštění vývojového serveru**
    ```bash
    pnpm run dev
    ```
