const windowHeight = 800;
const windowWidth = 800;
const w = 40;
let cols, rows;
let grid;

// Data structures for implementing
// Depth-first search
const stack = createStack();
const visiteds = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(51);
    // Setting Frame Rate to 20 
    // to visualize better the maze
    // generation algorithm
    frameRate(20);
    cols = floor(width / w);
    rows = floor(height / w);
    grid = createGrid(rows, cols);
    // Pushing the initial cell
    // to the stack and setting it 
    // to visited 
    let init_cell = grid.getCell(0, 0);
    visiteds.push(init_cell);
    stack.push(init_cell);
}

function draw() {
    background(255);
    if (!stack.isEmpty()) {
        let currCell = stack.pop();
        // Painting the current cell 
        // to help to visualize
        fill(255, 0, 200);
        rect(currCell.j * w, currCell.i * w, w, w);
        let neighbours = grid.getCellNeighbours(currCell)
                             .filter((value) => !visiteds.includes(value));
        if (neighbours.length > 0) {
            stack.push(currCell);
            let neighbour = neighbours[Math.floor(Math.random() * neighbours.length)];
            grid.removeWallBetween(currCell, neighbour);
            visiteds.push(neighbour);
            stack.push(neighbour);
        }
    }
    grid.show();
}

