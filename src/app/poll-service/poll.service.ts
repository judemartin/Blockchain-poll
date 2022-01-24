import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Web3Service } from '../blockchain/web3.service';
import { Poll, PollForm } from '../types';
import { fromAscii } from 'web3-utils';
@Injectable({
  providedIn: 'root',
})
export class PollService {
  constructor(private web3: Web3Service) {}

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
  vote(pollId: number, voteNumber: number) {
    this.web3.executeTx('vote', pollId, voteNumber);
  }
  createPoll(poll: PollForm) {
    this.web3.executeTx(
      'createPoll',
      poll.question,
      poll.thumbnail || '',
      poll.options.map((opt) => fromAscii(opt))
    );
  }
}
