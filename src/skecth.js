const windowHeight = 800;
const windowWidth = 1000;
const w = 40;
let cols, rows;
let grid;

// Data structures for implementing
// Depth-first search
const stack = createStack();
const visiteds = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    // Setting Frame Rate to 30 
    // to visualize better the maze
    // generation algorithm
    frameRate(60);
    background(0);
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
    if (!stack.isEmpty()) {
        let currCell = stack.pop();
        // Paint the cell in pink color if we are
        // Removing it from the Stack
        currCell.show(color(255,0,100));
        let neighbours = grid.getCellNeighbours(currCell)
                             .filter((value) => !visiteds.includes(value));
        if (neighbours.length > 0) {
            stack.push(currCell);
            // Paint the cell in white if
            // we still pushing into the stack
            currCell.show(255);
            let neighbour = neighbours[Math.floor(Math.random() * neighbours.length)];
            grid.removeWallBetween(currCell, neighbour);
            visiteds.push(neighbour);
            stack.push(neighbour);
        }
    } else{
        grid.show();
        noLoop();
    }
}

