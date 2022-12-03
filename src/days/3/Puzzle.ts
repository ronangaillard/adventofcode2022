import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  private charToPriority = (char: string) => {
    // uppercase letter
    if (char.toUpperCase() === char) {
      return char.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
    }
    return char.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
  };

  public solveFirst(): string {
    const rucksacks = this.input.split('\n');
    const commonItems = rucksacks.map((rucksack) => {
      const [compartment1, compartment2] = [
        rucksack.slice(0, rucksack.length / 2),
        rucksack.slice(rucksack.length / 2),
      ];

      if (compartment1.length !== compartment2.length) {
        throw new Error("Compartments don't have same length");
      }

      for (const char of compartment1) {
        if (compartment2.includes(char)) {
          return char;
        }
      }

      throw new Error('Mo matching char');
    });

    const priority = commonItems.reduce((prev, current) => {
      // uppercase letter
      if (current.toUpperCase() === current) {
        return current.charCodeAt(0) - 'A'.charCodeAt(0) + 27 + prev;
      }
      return current.charCodeAt(0) - 'a'.charCodeAt(0) + 1 + prev;
    }, 0);

    return priority.toString();
  }

  public getFirstExpectedResult(): string {
    return '8233';
  }

  public solveSecond(): string {
    const rucksacks = this.input.split('\n');
    let priority = 0;

    for (let i = 0; i < rucksacks.length; i += 3) {
      for (const char of rucksacks[i]) {
        if (
          rucksacks[i + 1].includes(char) &&
          rucksacks[i + 2].includes(char)
        ) {
          priority += this.charToPriority(char);
          break;
        }
      }
    }

    return priority.toString();
  }

  public getSecondExpectedResult(): string {
    return '2821';
  }
}
