import Puzzle from '../../types/AbstractPuzzle';
import cloneDeep = require('lodash.clonedeep');

export default class ConcretePuzzle extends Puzzle {
  private isInRightOrder = (a: number | number[], b: number | number[]): boolean => {
    if (!Array.isArray(a) && !Array.isArray(b)) {
      const diff = a - b;
      if (diff === 0) {
        return undefined;
      }
      if (diff < 0) {
        return true;
      }
      return false;
    }

    const [leftArray, rightArray] = [a, b].map((x) => Array.isArray(x) ? x : [x]);
    while (leftArray.length && rightArray.length) {
      const result = this.isInRightOrder(leftArray.shift(), rightArray.shift());
      if (result !== undefined) {
        return result;
      }
    }
    if (leftArray.length) {
      return false;
    }
    if (rightArray.length) {
      return true;
    }
    return undefined;
  };

  private sort = (a: number | number[], b: number | number[]): number => {
    if (!Array.isArray(a) && !Array.isArray(b)) {
      return a - b;
    }

    const [leftArray, rightArray] = [a, b].map((x) => Array.isArray(x) ? x : [x]);
    while (leftArray.length && rightArray.length) {
      const result = this.sort(leftArray.shift(), rightArray.shift());
      if (result !== 0) {
        return result;
      }
    }
    if (leftArray.length) {
      return 1;
    }
    if (rightArray.length) {
      return -1;
    }
    return 0;
  };

  public solveFirst(): string {
    const packetPairs = this.input.split('\n\n').map(pair => pair.split('\n').map(single => JSON.parse(single)));



    return packetPairs.map(([a, b]) => this.isInRightOrder(a, b)).reduce((prev: number, current, i) => current ? prev + i + 1 : prev, 0).toString();
  }

  public getFirstExpectedResult(): string {
    return '6272';
  }

  public solveSecond(): string {
    const packetPairs = this.input.split('\n').filter(x => x.length !== 0).map(single => JSON.parse(single));
    packetPairs.push([[2]], [[6]]);

    packetPairs.sort((a, b) => this.sort(cloneDeep(a), cloneDeep(b)));

    return ((packetPairs.findIndex(item => JSON.stringify(item) === JSON.stringify([[2]])) + 1) * (packetPairs.findIndex(item => JSON.stringify(item) === JSON.stringify([[6]])) + 1)).toString();
  }

  public getSecondExpectedResult(): string {
    return '22288';
  }
}
