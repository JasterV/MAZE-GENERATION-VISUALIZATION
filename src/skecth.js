const windowHeight = 800;
const windowWidth = 1000;
const w = 40;
let cols, rows;
let grid;

// Data structures for implementing
// Depth-first search
const stack = createStack();

function setup() {
    createCanvas(windowWidth, windowHeight);
    // Setting Frame Rate to 30 
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
    init_cell.setVisited();
    stack.push(init_cell);
}

function draw() {
    background(0);
    grid.show();
    if (!stack.isEmpty()) {
        let currCell = stack.pop();
        let neighbours = grid.getCellNeighbours(currCell)
                             .filter((value) => !value.isVisited());
        // Show the current cell in pink
        currCell.show(color(255, 0, 200));
        if (neighbours.length > 0) {
            stack.push(currCell);
            let neighbour = neighbours[Math.floor(Math.random() * neighbours.length)];
            grid.removeWallBetween(currCell, neighbour);
            neighbour.setVisited();
            stack.push(neighbour);
        }
    } else
        noLoop();
}

