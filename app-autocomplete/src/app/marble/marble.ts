import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/startWith';
import {Observable} from 'rxjs/Observable';
import {IScheduler} from 'rxjs/Scheduler';
import {async} from 'rxjs/scheduler/async';
import {Color} from "./colors";

export class ColorMixer {

  static mix(r: Observable<boolean>,
             y: Observable<boolean>,
             b: Observable<boolean>,
             mixingTime = 1000,
             scheduler: IScheduler = async): Observable<Color> {

    return Observable.combineLatest(
      r.startWith(false),
      y.startWith(false),
      b.startWith(false),

      (redOn, yellowOn, blueOn) => {

        if (!redOn && !yellowOn && !blueOn) {
          return Color.NONE;
        } else if (redOn && !yellowOn && !blueOn) {
          return Color.RED;
        } else if (redOn && yellowOn && !blueOn) {
          return Color.ORANGE;
        } else if (!redOn && yellowOn && !blueOn) {
          return Color.YELLOW;
        } else if (!redOn && yellowOn && blueOn) {
          return Color.GREEN;
        } else if (!redOn && !yellowOn && blueOn) {
          return Color.BLUE;
        } else if (redOn && !yellowOn && blueOn) {
          return Color.PURPLE;
        } else {
          return Color.BLACK;
        }
      })
      .debounceTime(mixingTime, scheduler)
      .startWith(Color.NONE)
      .distinctUntilChanged();
  }

}
