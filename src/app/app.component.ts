import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  [x: string]: any;
  name: string;
  numberOfQuestions: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
    this.quizSvc.getQuizzes().subscribe(
    data => {
      this.quizzes = (<QuizDisplay[]> data).map(x => ({name: x.name, numberOfQuestions: x.numberQuestions}));
      // console.log(data);
    }, error => {
      console.log(error);
      this.errorDuringCall = true;
    });
  }

  title = 'quiz-editor';
  quizzes: QuizDisplay[] = [];
  selectedQuiz: QuizDisplay = undefined;
  errorDuringCall = false;

  constructor(private quizSvc: QuizService) {
    // this.quizzes = this.quizSvc.getQuizzes();
  }

  setSelectedQuiz(quiz: QuizDisplay) {
    this.selectedQuiz = quiz;
  }

  addNewQuiz() {
    let newQuiz = { name: 'Untitled Quiz', numberOfQuestions: 0 };

    this.quizzes = [...this.quizzes, newQuiz];
    this.selectedQuiz = newQuiz;
  }
}
