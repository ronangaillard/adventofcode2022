import Puzzle from '../../types/AbstractPuzzle';

interface TreeNodeType {
  name: string;
  isFolder: boolean;
  size?: number;
  topFolder?: TreeNode;
}

class TreeNode {
  public descendants: TreeNode[];
  public value: TreeNodeType;

  constructor(value: TreeNodeType) {
    this.value = value;
    this.descendants = [];
  }

  computeSize(): number {
    if (this.value.size) {
      return this.value.size;
    }

    const selfSize = this.descendants
      .map((d) => d.computeSize())
      .reduce((prev, current) => prev + current, 0);

    this.value.size = selfSize;

    return selfSize;
  }

  computeSizeUnder100000(): number {
    const subSize = this.descendants
      .map((d) => d.computeSizeUnder100000())
      .reduce((prev, current) => prev + current, 0);

    if (this.value.size < 100000 && this.value.isFolder) {
      return this.value.size + subSize;
    } else {
      return subSize;
    }
  }

  findSmallerFolder(minSize: number): number {
    const smallerDescendant = Math.min(
      ...this.descendants.map((d) => d.findSmallerFolder(minSize))
    );

    if (this.value.size > minSize && this.value.size < smallerDescendant) {
      return this.value.size;
    } else {
      return smallerDescendant;
    }
  }
}

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const root = new TreeNode({ name: '/', isFolder: true });

    const lines = this.input.split('\n');

    let currentNode = root;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      // command
      if (line.startsWith('$')) {
        if (line.match(/cd (.*)/g)) {
          const [_, folderName] = line.match(/cd (.*)/);
          if (folderName === '..') {
            currentNode = currentNode.value.topFolder;

            if (currentNode === undefined) {
              throw new Error(`Cannot find folder top folder`);
            }
          } else {
            currentNode = currentNode.descendants.find(
              (d) => d.value.name === folderName
            );

            if (currentNode === undefined) {
              throw new Error(`Cannot find folder ${folderName}`);
            }
          }
        }
      }

      // discovering new folder
      if (line.match(/^dir (.*)/)) {
        const [_, folderName] = line.match(/dir (.*)/);

        currentNode.descendants.push(
          new TreeNode({
            name: folderName,
            isFolder: true,
            topFolder: currentNode,
          })
        );
      }

      // discovering new file
      if (line.match(/^(\d*) (.*)/)) {
        const [_, size, folderName] = line.match(/(\d*) (.*)/);

        currentNode.descendants.push(
          new TreeNode({
            name: folderName,
            isFolder: false,
            size: parseInt(size),
          })
        );
      }
    }

    root.computeSize();

    return root.computeSizeUnder100000().toString();
  }

  public getFirstExpectedResult(): string {
    return '1325919';
  }

  public solveSecond(): string {
    const root = new TreeNode({ name: '/', isFolder: true });

    const lines = this.input.split('\n');

    let currentNode = root;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      // command
      if (line.startsWith('$')) {
        if (line.match(/cd (.*)/g)) {
          const [_, folderName] = line.match(/cd (.*)/);
          if (folderName === '..') {
            currentNode = currentNode.value.topFolder;

            if (currentNode === undefined) {
              throw new Error(`Cannot find folder top folder`);
            }
          } else {
            currentNode = currentNode.descendants.find(
              (d) => d.value.name === folderName
            );

            if (currentNode === undefined) {
              throw new Error(`Cannot find folder ${folderName}`);
            }
          }
        }
      }

      // discovering new folder
      if (line.match(/^dir (.*)/)) {
        const [_, folderName] = line.match(/dir (.*)/);

        currentNode.descendants.push(
          new TreeNode({
            name: folderName,
            isFolder: true,
            topFolder: currentNode,
          })
        );
      }

      // discovering new file
      if (line.match(/^(\d*) (.*)/)) {
        const [_, size, folderName] = line.match(/(\d*) (.*)/);

        currentNode.descendants.push(
          new TreeNode({
            name: folderName,
            isFolder: false,
            size: parseInt(size),
          })
        );
      }
    }

    root.computeSize();

    const sizeAvailable = 70000000 - root.value.size;
    const sizeToDelete = 30000000 - sizeAvailable;

    return root.findSmallerFolder(sizeToDelete).toString();
  }

  public getSecondExpectedResult(): string {
    return '2050735';
  }
}
