import {Injectable} from "@angular/core";
import {Observable} from "rxjs/internal/Observable";
import {map, share} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class GithubService {
  private baseUrl = "https://api.github.com";

  constructor(private http: HttpClient) {
  }

  searchUsers(term: string): Observable<string[]> {
    return this.http
      .get(this.baseUrl + "/search/users?q=" + term)
      .pipe(
        map((response: any) => response.items.map(item => item.login)),
        share()
      )
  }
}
