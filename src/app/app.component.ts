import { Component, OnInit } from '@angular/core';
import { QuizVBService } from './quiz-vb.service';

interface QuizDisplay {
  name: string;
  numberOfQuestion: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private quizSvx:QuizVBService) {
    // console.log(this.quizSvx.getQuizzes());
    // this.quizzes = this.quizSvx.getQuizzes();
  }

  ngOnInit() {
    this.quizSvx.getQuizzes().subscribe(
      (data) => {
        console.log(data);
      }
      , (error) => {
       console.log(error);
      }
    );
  }

  title = 'quiz-editor';
  // titleColor = "pink";
  quizzes : QuizDisplay[] = [];
  myWidth = 100;
  selectedQuiz:QuizDisplay = undefined;

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
      , numberOfQuestion: 0
    };
    this.quizzes = [...this.quizzes, newQuiz];
  }
}
