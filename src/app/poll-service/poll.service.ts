import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Poll, PollForm } from '../types';

@Injectable({
  providedIn: 'root',
})
export class PollService {
  constructor() {}

  getPolls(): Observable<Poll[]> {
    return of([
      {
        id: 1,
        question: 'Do you like dogs of cats?',
        thumbnail:
          'https://images.pexels.com/photos/46024/pexels-photo-46024.jpeg',
        results: [0, 5, 7],
        options: ['Cats', 'Dogs', 'None'],
        voted: true,
      },
      {
        id: 2,
        question: 'Best month for summer holidays?',
        thumbnail:
          'https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg',
        results: [1, 6, 4],
        options: ['June', 'July', 'August'],
        voted: false,
      },
    ]).pipe(delay(2000));
  }
  vote(pollId: number, voterNumber: number) {}
  createPoll(poll: PollForm) {}
}
