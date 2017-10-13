import {Component, OnDestroy, OnInit} from '@angular/core';
import {Board} from "./tetris/board";
import {TetrominoBag} from "./tetris/bag";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    board: Board;
    constructor() {
        this.board = new Board(20,10);
    }
}
