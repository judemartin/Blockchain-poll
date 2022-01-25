import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Web3Service } from '../blockchain/web3.service';
import { Poll, PollForm } from '../types';
import { fromAscii, toAscii } from 'web3-utils';

@Injectable({
  providedIn: 'root',
})
export class PollService {
  constructor(private web3: Web3Service) {}

  async getPolls() {
    let totalPolls = await this.web3.call('getTotalPolls');
    console.log({ totalPolls });
    const polls: Poll[] = [];
    const acc = await this.web3.getAccount();
    const voter = await this.web3.call('getVoter', acc);
    const voterNormalized = this.normalizeVoter(voter);
    console.log({ voterNormalized });
    for (let i = 0; i < totalPolls; i++) {
      const pollRaw = await this.web3.call('getPoll', i);
      console.log({ i, pollRaw });
      const pollNormalized = this.nomalizePoll(pollRaw, voterNormalized);
      polls.push(pollNormalized);
      console.log({ polls });
    }
    return polls;
  }
  // getPolls(): Observable<Poll[]> {
  //   let polls: Poll[] = [];
  //   const res = this.getPollsFromBC();
  //   Promise.resolve(res).then((data) => (polls = data));
  //   console.log({ polls });
  //   return of(polls);
  // }

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

  private normalizeVoter(voter: any) {
    return {
      id: voter[0],
      votedIds: voter[1].map((vote: any) => parseInt(vote)),
    };
  }
  private nomalizePoll(pollRaw: any, voter: any): Poll {
    console.log({ normalizedPollVoter: voter });
    console.log({ pollRaw });
    const normalizedPolls: Poll = {
      id: pollRaw[0],
      question: pollRaw[1],
      thumbnail: pollRaw[2],
      results: pollRaw[3].map((vote: any) => parseInt(vote)),
      options: pollRaw[4].map((opt: any) =>
        toAscii(opt).replace(/\u0000/g, '')
      ),
      voted:
        voter.votedIds.length &&
        voter.votedIds.find((votedId: any) => votedId === parseInt(pollRaw[0])),
    };
    console.log({ normalizedPolls });
    return normalizedPolls;
  }

  onEvent(name: string) {
    return this.web3.onEvents(name);
  }
}
