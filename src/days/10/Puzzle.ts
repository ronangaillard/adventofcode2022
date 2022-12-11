import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const code = this.input.split('\n');
    let cycle = 0;
    let regX = 1;
    let previousRegX = regX;
    const signalStrengths = [] as number[];
    const indexes = [20, 60, 100, 140, 180, 220];

    for (let i = 0; i < code.length; i++) {
      if (code[i].match(/^noop/)) {
        cycle += 1;
      } else if (code[i].match(/^addx (.*)/)) {
        const [_, count] = code[i].match(/addx (.*)/);
        regX += parseInt(count);
        cycle += 2;
      } else {
        throw new Error('Unrecognized expression');
      }

      const interestingIndex = cycle - (cycle % 20);

      if (cycle >= 20 && cycle < 240 && signalStrengths[interestingIndex] === undefined && indexes.includes(interestingIndex)) {
        const regValue = (interestingIndex === cycle) && !code[i].match(/^addx (.*)/) ? regX : previousRegX;

        signalStrengths[interestingIndex] = (interestingIndex) * regValue;
      }

      previousRegX = regX;
    }


    return signalStrengths.reduce((prev, current) => prev + current, 0).toString();
  }

  public getFirstExpectedResult(): string {
    return '17840';
  }

  public solveSecond(): string {
    const code = this.input.split('\n');
    let cycle = 0;
    let regX = 1;

    const drawPixel = () => {
      if (Math.abs((cycle % 40) - regX) > 1) {
        process.stdout.write('.');
      } else {
        process.stdout.write('#');
      }
      if ((cycle % 40) === 39) {
        console.log('');
      }
    };

    for (let i = 0; i < code.length; i++) {
      // draw screen
      drawPixel();

      if (code[i].match(/^noop/)) {
        cycle += 1;
      } else if (code[i].match(/^addx (.*)/)) {
        const [_, count] = code[i].match(/addx (.*)/);
        cycle += 1;
        drawPixel();
        regX += parseInt(count);
        cycle += 1;
      } else {
        throw new Error('Unrecognized expression');
      }
    }

    return '';
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 1 solution 2';
  }
}
