import {cold, getTestScheduler} from 'jasmine-marbles';
import {Observable} from 'rxjs/Observable';
import {ColorMixer} from "./marble";
import {Color} from "./colors";

describe('ColorMixer', () => {

  describe('mix', () => {

    it('should mix colors', () => {
      const r = cold('--o--x--|', onOffMarbles());
      const y = cold('--------|', onOffMarbles());
      const b = cold('--o-----|', onOffMarbles());
      const c = cold('x---p--b|', colorMarbles());

      expect(mix(r, y, b)).toBeObservable(c);
    });

  });

});


function mix(r: Observable<boolean>,
             y: Observable<boolean>,
             b: Observable<boolean>) {
  return ColorMixer.mix(r, y, b, 20, getTestScheduler());
}

function onOffMarbles() {
  return {
    o: true,
    x: false
  }
}

function colorMarbles() {
  return {
    x: Color.NONE,
    r: Color.RED,
    o: Color.ORANGE,
    y: Color.YELLOW,
    g: Color.GREEN,
    b: Color.BLUE,
    p: Color.PURPLE,
    B: Color.BLACK
  }
}
