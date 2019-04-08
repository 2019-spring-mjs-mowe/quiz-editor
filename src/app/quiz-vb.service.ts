import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizVBService {

  constructor(private buildInAngularHttpClient: HttpClient) { }

  getQuizzes() {
    return this.buildInAngularHttpClient.get("https://modern-js.azurewebsites.net/api/HttpTriggerJS1?code=8XD3vN3ehHLdZacBQJQhgUnNst9202gdd5VM3kWCytDkz2nXhia6kA==&name=Mystery%20Quiz");
  //   return [
  //     {name: "Quiz 1", numberOfQuestion: 3}
  //     , {name: "Quiz 2", numberOfQuestion: 0}
  //     , {name: "Quiz 3", numberOfQuestion: 0}
  //   ].map(x => ({
  //       name: x.name
  //     , numberOfQuestion: x.numberOfQuestion
  //   }));
  }
}
