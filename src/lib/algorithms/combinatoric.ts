import { Algorithm, Grid, Word, Hint, Explanation } from "./algorithm";

export class CombinatorialAlgorithm extends Algorithm {
    readonly name = "Kombinatorické kódování";
    private dictionary: string[] = [];
    private static comb: number[][] | null = null;

    constructor() {
        super();
        if (!CombinatorialAlgorithm.comb) {
            CombinatorialAlgorithm.precomputeCombinations();
        }
    }

    private static precomputeCombinations() {
        const comb = Array.from({ length: 26 }, () => Array(10).fill(0));
        for (let n = 0; n <= 25; n++) {
            comb[n][0] = 1;
            for (let k = 1; k <= Math.min(n, 9); k++) {
                comb[n][k] = comb[n - 1][k - 1] + comb[n - 1][k];
            }
        }
        CombinatorialAlgorithm.comb = comb;
    }

    private static rankCombination(positions: number[], k: number): number {
        const comb = CombinatorialAlgorithm.comb!;
        let rank = 0;
        positions.sort((a, b) => a - b);
        
        for (let i = 0; i < k; i++) {
            const prev = i === 0 ? -1 : positions[i - 1];
            for (let j = prev + 1; j < positions[i]; j++) {
                rank += comb[25 - j][k - i - 1];
            }
        }
        return rank;
    }

    private static unrankCombination(rank: number, k: number): number[] {
        const comb = CombinatorialAlgorithm.comb!;
        const positions: number[] = [];
        let remainingRank = rank;
        let prev = -1;

        for (let i = 0; i < k; i++) {
            let j = prev + 1;
            while (true) {
                const cnt = comb[25 - j][k - i - 1];
                if (remainingRank < cnt) break;
                remainingRank -= cnt;
                j++;
            }
            positions.push(j);
            prev = j;
        }
        return positions;
    }

    encode = async (grid: Grid): Promise<[Word, Hint, Explanation]> => {
        const explanation = [this.getInitialEncodeStep(grid)];
        const positions: number[] = [];
        
        // Convert grid to positions (0-24)
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                if (grid[row][col]) {
                    positions.push(row * 5 + col);
                }
            }
        }

        const k = positions.length;
        if (k !== 8 && k !== 9) throw new Error('Neplatný počet špionů');
        const hint = k === 8 ? '8' : '9';

        // Convert to combinatorial index
        const rank = CombinatorialAlgorithm.rankCombination(positions, k);
        
        // Convert to mixed-base number
        const base = 10 + this.dictionary.length;
        const digits: number[] = [];
        let num = rank;
        
        do {
            digits.push(num % base);
            num = Math.floor(num / base);
        } while (num > 0);
        
        // Convert digits to symbols
        const symbols = digits.reverse().map(d => 
            d < 10 ? d.toString() : this.dictionary[d - 10]
        );

        return this.addFinalEncodeStep(
            "Zakódováno",
            symbols.join('∞'),
            hint as Hint,
            explanation
        );
    }

    decode = async (word: Word, hint: Hint): Promise<[Grid, Explanation]> => {
        const explanation = [this.getInitialDecodeStep(word, hint)];
        
        // Validate hint
        if (!['8', '9'].includes(hint)) throw new Error('Neplatný hint');
        const k = parseInt(hint, 10) as 8 | 9;

        // Convert from mixed-base number
        const base = 10 + this.dictionary.length;
        const symbols = word.split('∞');
        let rank = 0;

        for (const symbol of symbols) {
            let value: number;
            if (/^\d+$/.test(symbol)) {
                value = parseInt(symbol, 10);
            } else {
                value = 10 + this.dictionary.indexOf(symbol);
                if (value < 10) throw new Error('Neplatný symbol');
            }
            rank = rank * base + value;
        }

        // Convert to positions
        const positions = CombinatorialAlgorithm.unrankCombination(rank, k);
        
        // Convert positions to grid
        const grid: Grid = Array.from({ length: 5 }, () => 
            Array(5).fill(false)
        ) as Grid;
        
        for (const pos of positions) {
            const row = Math.floor(pos / 5);
            const col = pos % 5;
            grid[row][col] = true;
        }

        return this.addFinalDecodeStep("Dekódováno", grid, explanation);
    }

    protected loadDataset = async () => {
        // Load your Czech dictionary here
        // Example: this.dictionary = await fetchDictionary();
        this.dictionary = await fetch("/algorithms/dictionary/dictionary.json").then(res => res.json()) as string[];
        return { loaded: true, message: "Slovník načten" };
    }
}