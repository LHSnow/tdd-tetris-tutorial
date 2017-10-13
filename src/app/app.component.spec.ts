import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {GameComponent} from "./game/game.component";
import {Board} from "./tetris/board";

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                Board
            ],
        }).compileComponents();
    }));
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
