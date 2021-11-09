import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import cloneDeep from 'lodash/cloneDeep';

import styles from '../styles/Home.module.scss';

import useStore from '../store';

const GRID_NX = 20;
const GRID_NY = 20;

const ALIVE = 1 as const;
const DEAD = 0 as const;
type Cell = typeof DEAD | typeof ALIVE;

type Grid = Cell[][];

type Game = {
  readonly ny: number;
  readonly nx: number;
  t: number;
  tickMs: number;
  grid: Grid;
};

const plotLife = (game: Game, py: number, px: number, pattern: Grid): Game => {
  const grid = cloneDeep(game.grid);
  const plot = (y: number, x: number, life: Cell) => {
    if (0 <= y && y < game.ny) {
      if (0 <= x && x < game.nx) {
        grid[y][x] = life;
      }
    }
  };
  const h = pattern.length;
  const w = pattern[0].length;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      plot(py + y, px + x, pattern[y][x]);
    }
  }
  return { ...game, grid };
};

type plotFunc = (game: Game, py: number, px: number) => Game;

// prettier-ignore
const plotBlinker: plotFunc = (game, py, px) =>
  plotLife(game, py, px, [
    [ALIVE],
    [ALIVE],
    [ALIVE]
  ]);

// prettier-ignore
const plotGlider: plotFunc = (game, py, px) =>
  plotLife(game, py, px, [
    [1,1,1],
    [1,0,0],
    [0,1,0],
  ]);

// prettier-ignore
const plotOctagon: plotFunc = (game, py, px): Game =>
  plotLife(game, py, px, [
    [0,0,1,0,0,1,0,0],
    [0,0,1,0,0,1,0,0],
    [1,1,0,1,1,0,1,1],
    [0,0,1,0,0,1,0,0],
    [0,0,1,0,0,1,0,0],
    [1,1,0,1,1,0,1,1],
    [0,0,1,0,0,1,0,0],
    [0,0,1,0,0,1,0,0],
  ]);

const countAlive = (game: Game, y: number, x: number): number => {
  let count = 0;
  const countUp = (y: number, x: number) => {
    if (0 <= y && y < game.ny) {
      if (0 <= x && x < game.nx) {
        if (game.grid[y][x] === ALIVE) {
          count++;
        }
      }
    }
  };
  countUp(y - 1, x - 1);
  countUp(y - 1, x);
  countUp(y - 1, x + 1);
  countUp(y, x - 1);
  // countUp(y   , x    );
  countUp(y, x + 1);
  countUp(y + 1, x - 1);
  countUp(y + 1, x);
  countUp(y + 1, x + 1);
  return count;
};

const advance = (game: Game): Game => {
  const grid = cloneDeep(game.grid);

  for (let y = 0; y < game.ny; y++) {
    for (let x = 0; x < game.nx; x++) {
      const alive = countAlive(game, y, x);

      // セルが死んでいる
      if (!game.grid[y][x]) {
        // 誕生
        if (alive === 3) {
          grid[y][x] = ALIVE;
        }
      }
      // セルが生きている
      else {
        // 過密
        if (4 <= alive) {
          grid[y][x] = DEAD;
        }
        // 生存
        else if (alive === 2 || alive === 3) {
          // grid[y][x] = true;
        }
        // 過疎
        else if (alive <= 1) {
          grid[y][x] = DEAD;
        }
      }
    }
  }

  return { ...game, t: game.t + 1, grid };
};

const initialGameState = {
  ny: GRID_NY,
  nx: GRID_NX,
  t: 0,
  tickMs: 1000,
  grid: [...Array(GRID_NY)].map(() => [...Array(GRID_NX)].fill(DEAD)),
};

const Home: React.VFC = () => {
  const { user } = useStore();

  const [game, setGame] = React.useState<Game>(cloneDeep(initialGameState));

  // 一度だけブリンカーをプロット
  const [initialized, setInitialized] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (initialized) return;
    const cy = Math.floor(GRID_NY / 2 + 0.5);
    const cx = Math.floor(GRID_NX / 2 + 0.5);
    let g = cloneDeep(initialGameState);
    g = plotBlinker(g, cy + 5, cx - 8);
    g = plotGlider(g, cy + 5, cx + 5);
    g = plotOctagon(g, 1, 5);
    setGame(g);
    setInitialized(true);
  }, [game, initialized]);

  // ゲーム時間進行（tickMs毎にsetGameされて再レンダー）
  React.useEffect(() => {
    if (!game.grid) return;
    const timerId = setTimeout(() => setGame(advance(game)), game.tickMs);
    return () => {
      clearTimeout(timerId);
    };
  }, [game]);

  return (
    <div>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Next.js v11 example
          </Typography>
          <div>user.fullName: {user ? user.fullName : '(...now loading)'}</div>
        </Box>

        <div className={styles.grid}>
          <div className={styles.time}>
            t = {game.t}
            <button
              type="button"
              className={styles.time_reset}
              onClick={() => {
                setInitialized(false);
              }}
            >
              reset
            </button>
          </div>
          {game.grid.map((line, y) => (
            <div key={y} className={styles.line}>
              {line.map((cell, x) =>
                // prettier-ignore
                <span key={x} className={
                  styles.cell + " " + (cell
                      ? styles.cell__alive
                      : styles.cell__dead
                  )
                } />,
              )}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;
