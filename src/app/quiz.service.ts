import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { resolve } from 'url';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  // Mock up quiz service
  getQuizzes() {
    return this.http.get('https://modern-js.azurewebsites.net/api/HttpTriggerJS1?code=8XD3vN3ehHLdZacBQJQhgUnNst9202gdd5VM3kWCytDkz2nXhia6kA==&name=Mystery%20Quiz');

    /* OLD FAKE QUIZ DATA
    return [
      {
        name: 'Quiz 1',
        numberOfQuestions: 3
      },
      {
        name: 'Quiz 2',
        numberOfQuestions: 8
      },
      {
        name: 'Quiz 3',
        numberOfQuestions: 0
      }
    ];
    */
  }

  getNumberViaPromise(succeed: boolean) {
    return new Promise<number>((resolve, reject) => succeed ? resolve(15815) : reject("Issue"));
  }
}
