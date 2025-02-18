import { Algorithm, Grid, Word, Hint, Explanation } from "./algorithm";

export class CombinatorialAlgorithm extends Algorithm {
    readonly name = "Optimized Spy Encoder";
    private dictionary: string[] = [];
    private static comb: number[][] | null = null;
    private static readonly TOTAL_8 = 1081575; // C(25,8)

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
        
        
        // Calculate base rank
        const baseRank = k === 8 
            ? CombinatorialAlgorithm.rankCombination(positions, 8)
            : CombinatorialAlgorithm.TOTAL_8 + CombinatorialAlgorithm.rankCombination(positions, 9);

        // Split into hint and main encoding
        let hintValue = baseRank % 10;
        const mainRank = Math.floor(baseRank / 10);
        const base = this.dictionary.length + 10;

        // Encode main part
        let encodedValue = '';
        let current = mainRank;
        do {
            const digit = current % base;
            encodedValue = (digit < 10 ? digit.toString() : this.dictionary[digit - 10]) + 
                         encodedValue;
            current = Math.floor(current / base);
        } while (current > 0);

        if (k !== 8 && k !== 9) {
            encodedValue = '';
            hintValue = 0;
        };
        return this.addFinalEncodeStep(
            "Encoded",
            encodedValue,
            hintValue.toString() as Hint,
            explanation
        );
    }

    decode = async (word: Word, hint: Hint): Promise<[Grid, Explanation]> => {
        const explanation = [this.getInitialDecodeStep(word, hint)];
        
        // Parse numeric hint
        const hintValue = parseInt(hint, 10);
        if (isNaN(hintValue) || hintValue < 0 || hintValue > 9) {
            throw new Error('Invalid hint value');
        }

        // Decode main part
        const base = this.dictionary.length + 10;
        let mainRank = 0;
        const symbols = word

        for (const symbol of symbols) {
            let value = parseInt(symbol, 10);
            if (isNaN(value)) {
                value = 10 + this.dictionary.indexOf(symbol);
                if (value < 10) throw new Error('Invalid symbol');
            }
            mainRank = mainRank * base + value;
        }

        // Reconstruct full rank
        const fullRank = mainRank * 10 + hintValue;

        // Determine spy count
        const k = fullRank < CombinatorialAlgorithm.TOTAL_8 ? 8 : 9;
        const adjustedRank = k === 8 
            ? fullRank 
            : fullRank - CombinatorialAlgorithm.TOTAL_8;

        // Get positions
        const positions = CombinatorialAlgorithm.unrankCombination(adjustedRank, k);

        // Convert to grid
        const grid: Grid = Array.from({ length: 5 }, () => 
            Array(5).fill(false)
        ) as Grid;
        
        for (const pos of positions) {
            const row = Math.floor(pos / 5);
            const col = pos % 5;
            grid[row][col] = true;
        }

        return this.addFinalDecodeStep("Decoded", grid, explanation);
    }


    protected loadDataset = async () => {
        // Load your Czech dictionary here
        // Example: this.dictionary = await fetchDictionary();
        this.dictionary = await fetch("/algorithms/dictionary/dictionary.json").then(res => res.json()) as string[];
        return { loaded: true, message: "Slovník načten" };
    }
}