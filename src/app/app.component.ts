import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';
import { errorHandler } from '@angular/platform-browser/src/browser';

interface QuizDisplay {
  name: string;
  numberOfQuestions: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private quizSvc: QuizService) {
    //console.log(this.quizSvc.getQuizzes());
    //this.quizzes = this.quizSvc.getQuizzes();
  }

  ngOnInit() {
    this.quizSvc.getQuizzes().subscribe(
        (data) => {
            this.quizzes = (<QuizDisplay[]>data).map(x=>({
                name: x.name,
                numberOfQuestions:  x.numberQuestions
            }));
        }
        , (error) => {
            console.log(error);
            this.errorCallingRestEndpoint = true;
        }
    );
  }

  errorCallingRestEndpoint = false;

  title = 'quiz-editor';
  
  myWidth = 250;

  quizzes: QuizDisplay[] = [];
  selectedQuiz: QuizDisplay = undefined;

  setSelectedQuiz(q: QuizDisplay) {
    this.selectedQuiz = q;
  }

  get titleColor() {
    return this.myWidth > 250 ? "pink" : "black";
  }  

  increaseWidth = () => {
    this.myWidth *= 1.5;
  }

  get listBackgroundColorDanger() {
    return this.myWidth > 250 ? true : false;
  }

  addNewQuiz() {

    let newQuiz = { 
      name: 'New Untitled Quiz'
      , numberOfQuestions: 0 
    };

    this.quizzes = [...this.quizzes, newQuiz];
    this.selectedQuiz = newQuiz;
  }

  jsPromisesOne() {
    const x = this.quizSvc.getNumberPromise(true);
    console.log(x);

    x.then(
      n => {
          console.log(n);
      }
    ).catch (
      e => console.log(e)
    );
  }

  async jsPromisesTwo() {
    //async/await
    
    try {
      const x = await this.quizSvc.getNumberPromise(true);      
      const y = await this.quizSvc.getNumberPromise(true);
    }

    catch(e) {
      console.log(e);
    }

  }


}
