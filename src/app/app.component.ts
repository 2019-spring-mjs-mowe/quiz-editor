import { Component } from '@angular/core';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( private quizSvc: QuizService) {
    //console.log(this.quizSvc.getQuizzes());
    this.quizzes = this.quizSvc.getQuizzes();
  }
  title = 'quiz-editor';
  myWidth = 250;

  quizzes = [];

  //titleColor = this.myWidth > 250 ? "pink" : "black";

  get titleColor() {
    return this.myWidth > 250 ? "pink" : "black";
  }

  increaseWidth = () => this.myWidth *= 1.5;

  get listBackgroundColorDanger() {
    //return this.myWidth > 250 ? "bg-danger" : "";
    return this.myWidth > 250 ? true : false;
  }
}
