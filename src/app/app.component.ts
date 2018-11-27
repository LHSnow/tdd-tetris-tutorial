import { Component } from '@angular/core';
import { Board } from './tetris/board';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	board: Board;

	constructor() {
		this.board = new Board(20, 10);
	}
}
