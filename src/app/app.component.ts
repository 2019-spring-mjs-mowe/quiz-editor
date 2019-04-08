import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  name: string;
  numberOfQuestions: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private quizSvc: QuizService) {
    //console.log(this.quizSvc.getQuizzes());
    //this.quizzes = this.quizSvc.getQuizzes();
  }
  errorCallingRestEndPoint = false;

  ngOnInit() {
    this.quizSvc.getQuizzes().subscribe(
      (data) => {
        console.log(data);
        this.quizzes = (<QuizDisplay[]>data).map(x => ({
          name: x.name
          , numberOfQuestions: x.numberQuestions
        }));
      }
      , (error) => {
        console.log(error);
        this.errorCallingRestEndPoint = true;
      }
    );
  }

  title = 'quiz-editor';
  //myWidth = 250;

  quizzes: QuizDisplay[] = [];
  selectedQuiz: QuizDisplay = undefined;

  setSelectedQuiz(q: QuizDisplay) {
    this.selectedQuiz = q;
  }

  // get titleColor() {
  //   return this.myWidth > 250 ? "pink" : "black";
  // }  

  // increaseWidth = () => {
  //   this.myWidth *= 1.5;
  // }

  // get listBackgroundColorDanger() {
  //   return this.myWidth > 250 ? true : false;
  // }

  addNewQuiz() {

    let newQuiz = { 
      name: 'New Untitled Quiz'
      , numberOfQuestions: 0 
    };

    this.quizzes = [...this.quizzes, newQuiz];
    this.selectedQuiz = newQuiz;
  }

  jsPromisesOne() {
    const x = this.quizSvc.getNumberPromise(false);
    console.log(x);

    x.then(
      n => {
        console.log(n);
        const y = this.quizSvc.getNumberPromise(true);
        y.then( x => console.log(x)).catch( e => console.log(e));
      }
    ).catch(
      e => {
        console.log(e);
      }
    );

  }

  async jsPromisesTwo() {
    //async await
    try {
      const x = await this.quizSvc.getNumberPromise(true);
      console.log(x);
      const y = await this.quizSvc.getNumberPromise(false);
      console.log(x);
    }
    catch(e) {
      console.log(e);
    }
  }

  async jsPromisesThree() {
    //async await
    try {
      const x = this.quizSvc.getNumberPromise(true);
      console.log(x);
      const y = this.quizSvc.getNumberPromise(true);
      console.log(x);

      //const results = await Promise.all([x, y]);
      const results = await Promise.race([x, y]);
      console.log(results);
    }
    catch(e) {
      console.log(e);
    }
  }
}
