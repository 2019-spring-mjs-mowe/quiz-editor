import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor() { }

  getQuizzes() {

    // Mocking up the data we will ultimately get from a 
    // REST endpoint, or web service call...
    return [
      { name: 'Quiz 1', numberQuestions: 3 }
      , { name: 'Quiz 2', numberQuestions: 0 }
      , { name: 'Quiz 3', numberQuestions: 0 }
    ].map(x => ({
      name: x.name
      , numberOfQuestions: x.numberQuestions
    }));
  }
}
