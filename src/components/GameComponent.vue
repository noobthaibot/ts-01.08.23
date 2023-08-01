<template>
  <v-card class="mx-auto" dark>
    <v-card-title>
      <h2>Size Grid</h2>
    </v-card-title>
    <v-container class="dark-background" fluid>
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="sizeX" label="Size X" type="number" @input="resizeGrid" />
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="sizeY" label="Size Y" type="number" @input="resizeGrid" />
        </v-col>
      </v-row>
      <v-row class="d-flex align-center justify-center">
        <v-col v-for="(row, rowIndex) in grid" :key="rowIndex" cols="auto" class="grid-row">
          <v-col v-for="(square, colIndex) in row" :key="colIndex" cols="auto">
            <div
                class="square"
                :style="{ backgroundColor: square ? 'blue' : 'white' }"
                @mouseover="toggleSquare(rowIndex, colIndex)"
            />
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { ref, reactive } from 'vue';

export default {
  setup() {
    const sizeX = ref(10);
    const sizeY = ref(10);
    const grid = reactive(createGrid(sizeX.value, sizeY.value));

    function createGrid(x, y) {
      return Array.from({ length: y }, () => Array(x).fill(false));
    }

    function resizeGrid() {
      const newX = parseInt(sizeX.value);
      const newY = parseInt(sizeY.value);

      if (!isNaN(newX) && !isNaN(newY)) {
        grid.splice(0, grid.length, ...createGrid(newX, newY));
      }
    }

    function toggleSquare(rowIndex, colIndex) {
      grid[rowIndex][colIndex] = !grid[rowIndex][colIndex];
    }

    return {
      sizeX,
      sizeY,
      grid,
      resizeGrid,
      toggleSquare,
    };
  },
};
</script>

<style lang="scss">
.v-col {
  padding: 0 !important;
}
.grid-row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.square {
  width: 36px;
  height: 36px;
  border: 1px solid #ccc;
  cursor: pointer;
  background-color: white;
}

.dark-background {
  background-color: #2d2d2d;
  color: #fff;
}

.v-application--is-dark .dark-background {
  background-color: #424242;
}

.v-application--is-dark .square {
  border: 1px solid #ccc;
  background-color: #424242;
}

.v-application--is-dark .square:hover {
  background-color: white;
}
</style>

