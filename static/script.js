document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("game-board");
  const scoreElement = document.getElementById("score");
  const highScoreElement = document.getElementById("high-score");
  const restartBtn = document.getElementById("restart-btn");
  const moveSound = document.getElementById("move-sound");
  const mergeSound = document.getElementById("merge-sound");
  const gameOverSound = document.getElementById("gameover-sound");
  const bgMusic = document.getElementById("bg-music");
  const overlay = document.getElementById("game-over-overlay");

  let grid = Array.from({ length: 4 }, () => Array(4).fill(0));
  let score = 0;
  let highScore = parseInt(localStorage.getItem("highScore")) || 0;

  function updateScoreDisplay() {
    scoreElement.textContent = score;
    highScoreElement.textContent = highScore;
  }

  function updateHighScore() {
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
    }
    updateScoreDisplay();
  }

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
    updateScoreDisplay();
  }

  function slide(row) {
    const arr = row.filter(val => val);
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
    const rotated = rotateGrid(direction);
    const newGrid = rotated.map(row => {
      const original = [...row];
      let newRow = slide(row);
      newRow = merge(newRow);
      if (JSON.stringify(original) !== JSON.stringify(newRow)) moved = true;
      return newRow;
    });
    grid = rotateGridBack(newGrid, direction);
    if (moved) {
      if (moveSound) moveSound.play();
      generateTile();
      drawBoard();
      updateHighScore();
      if (isGameOver()) {
        setTimeout(() => {
          if (gameOverSound) gameOverSound.play();
          overlay.classList.remove("hidden");
        }, 300);
      }
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
    const empty = [];
    grid.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell === 0) empty.push([r, c]);
      });
    });
    if (empty.length > 0) {
      const [r, c] = empty[Math.floor(Math.random() * empty.length)];
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

  function resetGame() {
    grid = Array.from({ length: 4 }, () => Array(4).fill(0));
    score = 0;
    generateTile();
    generateTile();
    drawBoard();
    overlay.classList.add("hidden");
  }

  restartBtn.addEventListener("click", resetGame);

  window.addEventListener("keydown", e => {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
      move(e.key.replace("Arrow", "").toLowerCase());
    }
  });

  // Touch swipe
  let touchStartX = 0, touchStartY = 0;
  window.addEventListener("touchstart", e => {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  });
  window.addEventListener("touchend", e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy)) {
      dx > 30 ? move("right") : dx < -30 && move("left");
    } else {
      dy > 30 ? move("down") : dy < -30 && move("up");
    }
  });

  // Autoplay background music on interaction
  document.body.addEventListener("click", () => {
    if (bgMusic && bgMusic.paused) {
      bgMusic.play().catch(() => {});
    }
  }, { once: true });

  // Init game
  resetGame();
});
