import numpy as np
import random

class Game2048:
    def __init__(self):
        self.grid_size = 4
        self.grid = np.zeros((self.grid_size, self.grid_size), dtype=int)
        self.score = 0
        self.add_new_tile()
        self.add_new_tile()

    def add_new_tile(self):
        empty_cells = [(r, c) for r in range(self.grid_size) for c in range(self.grid_size) if self.grid[r, c] == 0]
        if empty_cells:
            r, c = random.choice(empty_cells)
            self.grid[r, c] = 2 if random.random() < 0.9 else 4

    def compress(self, row):
        row = [num for num in row if num != 0]
        row += [0] * (self.grid_size - len(row))
        return row

    def merge(self, row):
        for i in range(self.grid_size - 1):
            if row[i] == row[i + 1] and row[i] != 0:
                row[i] *= 2
                row[i + 1] = 0
                self.score += row[i]
        return row

    def move_left(self):
        for i in range(self.grid_size):
            self.grid[i] = self.compress(self.grid[i])
            self.grid[i] = self.merge(self.grid[i])
            self.grid[i] = self.compress(self.grid[i])
        self.add_new_tile()

    def move_right(self):
        self.grid = np.fliplr(self.grid)
        self.move_left()
        self.grid = np.fliplr(self.grid)

    def move_up(self):
        self.grid = self.grid.T
        self.move_left()
        self.grid = self.grid.T

    def move_down(self):
        self.grid = np.flipud(self.grid.T)
        self.move_left()
        self.grid = np.flipud(self.grid.T)

    def is_game_over(self):
        if np.any(self.grid == 0):
            return False
        for i in range(self.grid_size):
            for j in range(self.grid_size - 1):
                if self.grid[i, j] == self.grid[i, j + 1] or self.grid[j, i] == self.grid[j + 1, i]:
                    return False
        return True
