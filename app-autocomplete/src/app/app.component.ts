import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {GithubService} from "./github.service";
import {debounceTime, distinctUntilChanged, filter, map, share, tap} from "rxjs/operators";
import {Subject} from "rxjs/internal/Subject";

@Component({
  selector: 'autocomplete',
  templateUrl: './app.component.html',
  providers: [GithubService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Autocomplete implements OnInit {

  public search: string;
  public search$: Subject<string> = new Subject();
  public suggestions: Observable<string[]>;

  constructor(private github: GithubService) {}

  ngOnInit () {
    this.search$.pipe(
      debounceTime(200),
      map(keyword => keyword.trim()),
      filter(keyword => keyword.length > 0),
      distinctUntilChanged(),
      map(keyword => this.github.searchUsers(keyword)),
      tap(result => this.suggestions = result),
    ).subscribe();
  }

  onSearchChange(event) {
    this.search$.next(event);
  }
}
