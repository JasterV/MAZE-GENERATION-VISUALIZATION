function createStack() {
    let items = [];
    return {
        push(value) {
            items.push(value);
        },
        pop() {
            if (items.length == 0)
                throw new Error("StackUnderflow");
            return items.pop();
        },
        peek() {
            return items[items.length - 1];
        },
        isEmpty() {
            return items.length == 0;
        },
    }
}

function createGrid(rows, cols) {
    /**
     * Returns an object that represents Grid of rows x cols dimensions
     */
    let cells = [];
    for (let i = 0; i < rows; i++)
        for (let j = 0; j < cols; j++)
            cells.push(createCell(i, j));
    return {
        rows,
        cols,
        getCell(i, j) {
            if (i >= rows || i < 0 || j >= cols || j < 0)
                return null;
            let index = i * cols + j;
            return cells[index];
        },
        getCellNeighbours(cell) {
            let neighbours = [];
            let bottom = this.getCell(cell.i + 1, cell.j);
            let top = this.getCell(cell.i - 1, cell.j);
            let left = this.getCell(cell.i, cell.j - 1);
            let right = this.getCell(cell.i, cell.j + 1);
            if (bottom !== null)
                neighbours.push(bottom);
            if (top !== null)
                neighbours.push(top);
            if (left !== null)
                neighbours.push(left);
            if (right !== null)
                neighbours.push(right);
            return neighbours;
        },
        removeWallBetween(cell, neighbour) {
            if (cell.i < neighbour.i && cell.j == neighbour.j) {
                cell.walls.bottom = false;
                neighbour.walls.top = false;
            } else if (cell.i > neighbour.i && cell.j == neighbour.j) {
                cell.walls.top = false;
                neighbour.walls.bottom = false;
            } else if (cell.i == neighbour.i && cell.j < neighbour.j) {
                cell.walls.right = false;
                neighbour.walls.left = false;
            } else if (cell.i == neighbour.i && cell.j > neighbour.j) {
                cell.walls.left = false;
                neighbour.walls.right = false;
            }
        },
        show() {
            fill(255);
            for (let i = 0; i < cells.length; i++)
                cells[i].show(200);
        }
    }
}

function createCell(i, j) {
    /**
     * Returns an object that represents a Cell
     * on a grid
     */
    let x = j * w;
    let y = i * w;
    let walls = {
        top: true,
        left: true,
        bottom: true,
        right: true,
    }
    return {
        i,
        j,
        walls,
        show(color) {
            stroke(0);
            if (walls.top)
                line(x, y, x + w, y);
            if (walls.left)
                line(x, y, x, y + w);
            if (walls.bottom)
                line(x, y + w, x + w, y + w);
            if (walls.right)
                line(x + w, y, x + w, y + w);
            noStroke();
            fill(color);
            rect(x, y, w, w);
        }
    }
}
