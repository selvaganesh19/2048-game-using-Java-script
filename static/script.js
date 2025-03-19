document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("game-board");
    const scoreElement = document.getElementById("score");
    let grid = Array(4).fill().map(() => Array(4).fill(0));
    let score = 0;

    function drawBoard() {
        board.innerHTML = "";
        grid.forEach(row => {
            row.forEach(value => {
                let tile = document.createElement("div");
                tile.classList.add("tile");
                if (value) {
                    tile.classList.add(`tile-${value}`);
                    tile.textContent = value;
                } else {
                    tile.textContent = "";
                }
                board.appendChild(tile);
            });
        });
        scoreElement.textContent = score;
    }

    function slide(row) {
        let newRow = row.filter(num => num); // Remove zeros
        while (newRow.length < 4) newRow.push(0); // Fill with zeros
        return newRow;
    }

    function merge(row) {
        for (let i = 0; i < 3; i++) {
            if (row[i] && row[i] === row[i + 1]) {
                row[i] *= 2;
                score += row[i];
                row[i + 1] = 0;
            }
        }
        return slide(row);
    }

    function move(direction) {
        let moved = false;
        let rotated = rotateGrid(direction);
        let newGrid = rotated.map(row => {
            let newRow = slide(row);
            newRow = merge(newRow);
            if (JSON.stringify(newRow) !== JSON.stringify(row)) moved = true;
            return newRow;
        });

        grid = rotateGridBack(newGrid, direction);
        if (moved) {
            generateTile();
            drawBoard();
            if (isGameOver()) setTimeout(() => alert("Game Over!"), 200);
        }
    }

    function rotateGrid(direction) {
        if (direction === "left") return grid;
        if (direction === "right") return grid.map(row => row.reverse());
        if (direction === "up") return grid[0].map((_, i) => grid.map(row => row[i]));
        if (direction === "down") return grid[0].map((_, i) => grid.map(row => row[i]).reverse());
    }

    function rotateGridBack(grid, direction) {
        if (direction === "left") return grid;
        if (direction === "right") return grid.map(row => row.reverse());
        if (direction === "up") return grid[0].map((_, i) => grid.map(row => row[i]));
        if (direction === "down") return grid[0].map((_, i) => grid.map(row => row[i]).reverse());
    }

    function generateTile() {
        let emptyTiles = [];
        grid.forEach((row, r) => row.forEach((cell, c) => {
            if (!cell) emptyTiles.push([r, c]);
        }));

        if (emptyTiles.length) {
            let [r, c] = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
            grid[r][c] = Math.random() > 0.9 ? 4 : 2; // Ensures variety
        }
    }

    function isGameOver() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (!grid[i][j]) return false;
                if (j < 3 && grid[i][j] === grid[i][j + 1]) return false;
                if (i < 3 && grid[i][j] === grid[i + 1][j]) return false;
            }
        }
        return true;
    }

    function restartGame() {
        grid = Array(4).fill().map(() => Array(4).fill(0));
        score = 0;
        generateTile();
        generateTile();
        drawBoard();
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") move("left");
        else if (e.key === "ArrowRight") move("right");
        else if (e.key === "ArrowUp") move("up");
        else if (e.key === "ArrowDown") move("down");
    });

    document.querySelector("button").addEventListener("click", restartGame);

    restartGame();
});
