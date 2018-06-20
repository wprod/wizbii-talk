import {ComponentFixture, TestBed} from '@angular/core/testing';
import {marbles} from 'rxjs-marbles/jest';
import {GithubService} from "./github.service";
import {Autocomplete} from "./app.component";
import {Subject} from "rxjs/internal/Subject";

describe('Autocomplete', () => {
  let githubService: any;
  let component: Autocomplete;
  let fixture: ComponentFixture<Autocomplete>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        Autocomplete
      ],
      providers: [
        {
          provide: GithubService,
          useValue: {get: jest.fn()},
        },
      ],
    });

    githubService = TestBed.get(GithubService);

    fixture = TestBed.createComponent(Autocomplete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('downloadDocument$', () => {
    it(
      'should return',
      marbles(m => {

        const input = 'linu';

        const expected = ["linux-china", "linuxgurugamer", "linuxscout"];

        component.search$ = new Subject<string>();

        const githubResponse = m.cold('b', {b: expected});


        githubService.searchUsers = jest.fn(() => githubResponse); // contraindre pour 'linu'

        component.onSearchChange(input);

        const expectedSugestion = m.cold('c', { c: '' });
        m.expect(component.suggestions).toBeObservable(expectedSugestion);

        // const completion = new AddDocumentSuccess({
        //   fileType: 'passport',
        //   response: newFile,
        // });
        //
        // actions$.stream = m.hot('-a-', { a: azer });
        // const response = m.cold('--b-', {
        //   a: newFile,
        // });
        // const expected = m.cold('---c', { c: completion });
        //
        // fileService.getDownloadBlob = jest.fn(() => response);
        // borrowerService.viewedFile = jest.fn(() => response);
        //
        // m.expect(effects.downloadDocument$).toBeObservable(expected);
      })
    );
  });
});
