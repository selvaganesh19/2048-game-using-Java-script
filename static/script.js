// script.js

document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("game-board");
  const scoreElement = document.getElementById("score");
  const restartBtn = document.getElementById("restart-btn");
  const installBtn = document.getElementById("install-btn");
  const moveSound = document.getElementById("move-sound");
  const mergeSound = document.getElementById("merge-sound");

  let grid = Array(4).fill().map(() => Array(4).fill(0));
  let score = 0;
  let highScore = localStorage.getItem("highScore") || 0;

  function drawBoard() {
    board.innerHTML = "";
    grid.forEach(row => {
      row.forEach(value => {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        if (value) {
          tile.classList.add(`tile-${value}`);
          tile.textContent = value;
        }
        board.appendChild(tile);
      });
    });
    scoreElement.textContent = score;
  }

  function slide(row) {
    let arr = row.filter(val => val);
    while (arr.length < 4) arr.push(0);
    return arr;
  }

  function merge(row) {
    for (let i = 0; i < 3; i++) {
      if (row[i] && row[i] === row[i + 1]) {
        row[i] *= 2;
        score += row[i];
        if (mergeSound) mergeSound.play();
        row[i + 1] = 0;
      }
    }
    return slide(row);
  }

  function move(direction) {
    let moved = false;
    let rotated = rotateGrid(direction);
    const newGrid = rotated.map(row => {
      const original = [...row];
      let newRow = slide(row);
      newRow = merge(newRow);
      if (JSON.stringify(newRow) !== JSON.stringify(original)) moved = true;
      return newRow;
    });
    grid = rotateGridBack(newGrid, direction);
    if (moved) {
      if (moveSound) moveSound.play();
      generateTile();
      drawBoard();
      if (isGameOver()) setTimeout(() => alert("Game Over!"), 200);
    }
  }

  function rotateGrid(direction) {
    if (direction === "left") return grid;
    if (direction === "right") return grid.map(row => [...row].reverse());
    if (direction === "up") return grid[0].map((_, i) => grid.map(row => row[i]));
    if (direction === "down") return grid[0].map((_, i) => grid.map(row => row[i]).reverse());
  }

  function rotateGridBack(rotated, direction) {
    if (direction === "left") return rotated;
    if (direction === "right") return rotated.map(row => [...row].reverse());
    if (direction === "up") return rotated[0].map((_, i) => rotated.map(row => row[i]));
    if (direction === "down") return rotated[0].map((_, i) => rotated.map(row => row[i]).reverse());
  }

  function generateTile() {
    const emptyTiles = [];
    grid.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell === 0) emptyTiles.push([r, c]);
      });
    });
    if (emptyTiles.length > 0) {
      const [r, c] = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
      grid[r][c] = Math.random() > 0.9 ? 4 : 2;
    }
  }

  function isGameOver() {
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (grid[r][c] === 0) return false;
        if (c < 3 && grid[r][c] === grid[r][c + 1]) return false;
        if (r < 3 && grid[r][c] === grid[r + 1][c]) return false;
      }
    }
    return true;
  }

  restartBtn.addEventListener("click", () => {
    grid = Array(4).fill().map(() => Array(4).fill(0));
    score = 0;
    generateTile();
    generateTile();
    drawBoard();
  });

  window.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") move("left");
    else if (e.key === "ArrowRight") move("right");
    else if (e.key === "ArrowUp") move("up");
    else if (e.key === "ArrowDown") move("down");
  });

  let touchStartX = 0;
  let touchStartY = 0;
  window.addEventListener("touchstart", e => {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  });
  window.addEventListener("touchend", e => {
    if (e.changedTouches.length === 1) {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 30) move("right");
        else if (dx < -30) move("left");
      } else {
        if (dy > 30) move("down");
        else if (dy < -30) move("up");
      }
    }
  });

  window.addEventListener("beforeinstallprompt", e => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.hidden = false;
  });

  installBtn?.addEventListener("click", () => {
    installBtn.hidden = true;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choice => {
      if (choice.outcome !== "accepted") {
        installBtn.hidden = false;
      }
      deferredPrompt = null;
    });
  });

  restartBtn.click();
});
