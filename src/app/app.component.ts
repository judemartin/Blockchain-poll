import { Component } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Poll } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showForm = false;
  activePoll: Poll = null as unknown as Poll;
  polls: Poll[] = [
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
  ];
  setActivePoll(poll: Poll) {
    this.activePoll = null as unknown as Poll;
    setTimeout(() => {
      this.activePoll = poll;
    }, 100);
    console.log(this.activePoll);
  }
}
