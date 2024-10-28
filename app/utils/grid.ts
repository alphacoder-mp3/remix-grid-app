// File: app/utils/grid.ts
import type { Position, QuizComponent } from './types';

export const GRID_SIZE = 12;
export const MIN_COMPONENT_WIDTH = 2;
export const MIN_COMPONENT_HEIGHT = 2;

interface GridCell {
  x: number;
  y: number;
  occupied: boolean;
}

export const calculateGridPosition = (
  mouseX: number,
  mouseY: number,
  gridElement: DOMRect
): Position => {
  const relativeX = mouseX - gridElement.left;
  const relativeY = mouseY - gridElement.top;

  const cellWidth = gridElement.width / GRID_SIZE;
  const cellHeight = gridElement.height / GRID_SIZE;

  return {
    x: Math.floor(relativeX / cellWidth),
    y: Math.floor(relativeY / cellHeight),
  };
};

export const checkCollision = (
  components: QuizComponent[],
  newPosition: Position,
  componentSize: { width: number; height: number }
): boolean => {
  const grid: GridCell[][] = Array(GRID_SIZE)
    .fill(null)
    .map(() =>
      Array(GRID_SIZE)
        .fill(null)
        .map(() => ({ occupied: false }))
    );

  components.forEach(component => {
    for (
      let x = component.position.x;
      x <
      component.position.x +
        (component.settings?.size?.width || MIN_COMPONENT_WIDTH);
      x++
    ) {
      for (
        let y = component.position.y;
        y <
        component.position.y +
          (component.settings?.size?.height || MIN_COMPONENT_HEIGHT);
        y++
      ) {
        if (x < GRID_SIZE && y < GRID_SIZE) {
          grid[x][y].occupied = true;
        }
      }
    }
  });

  for (let x = newPosition.x; x < newPosition.x + componentSize.width; x++) {
    for (let y = newPosition.y; y < newPosition.y + componentSize.height; y++) {
      if (
        x >= GRID_SIZE ||
        y >= GRID_SIZE ||
        x < 0 ||
        y < 0 ||
        grid[x][y].occupied
      ) {
        return true;
      }
    }
  }

  return false;
};

export const snapToGrid = (position: Position): Position => ({
  x: Math.round(position.x),
  y: Math.round(position.y),
});

export const getDefaultComponentSize = (type: string) => {
  switch (type) {
    case 'progress':
      return { width: 12, height: 1 };
    case 'timer':
      return { width: 2, height: 1 };
    case 'question':
      return { width: 12, height: 2 };
    case 'image':
      return { width: 6, height: 4 };
    case 'options':
      return { width: 12, height: 4 };
    default:
      return { width: MIN_COMPONENT_WIDTH, height: MIN_COMPONENT_HEIGHT };
  }
};
