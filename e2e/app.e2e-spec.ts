import { TetrisPage } from './app.po';

describe('The Tetris app', () => {
  let page: TetrisPage;

  beforeEach(() => {
    page = new TetrisPage();
  });

  it('should display the game board edges', () => {
    page.navigateTo();
    expect(page.getBoard()).toContain('+');
  });
});
