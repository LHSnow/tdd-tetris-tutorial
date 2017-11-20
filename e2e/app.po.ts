import { browser, by, element } from 'protractor';

export class TetrisPage {
  navigateTo() {
    return browser.get('/');
  }

  getBoard() {
    return element(by.css('.board')).getText();
  }
}
