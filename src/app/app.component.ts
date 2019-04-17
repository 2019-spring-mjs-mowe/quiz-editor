import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  [x: string]: any;
  name: string;
  numberOfQuestions: number;
  questions: QuestionDisplay[];
  difficulty: number;
}

interface QuestionDisplay {
  name: string;
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
      this.quizzes = (<QuizDisplay[]> data).map(x => ({
        name: x.name,
        numberOfQuestions: x.numberQuestions,
        questions: x.questions,
        difficulty: x.difficulty
      }));
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
  confirmRemove = false;
  currentDifficulty = 0;
  
  get removeQuizText() {
    return this.confirmRemove ? "Yes, remove quiz" : "Remove quiz";
  }

  constructor(private quizSvc: QuizService) {
    // this.quizzes = this.quizSvc.getQuizzes();
  }

  setSelectedQuiz(quiz: QuizDisplay) {
    this.selectedQuiz = quiz;
  }

  addNewQuiz() {
    let newQuiz = {
      name: 'Untitled Quiz',
      numberOfQuestions: 0,
      questions: [],
      difficulty: 3
    };

    this.quizzes = [...this.quizzes, newQuiz];
    this.selectedQuiz = newQuiz;
  }

  addNewQuestion() {
    let newQuestion = { name: 'New question' };
    this.selectedQuiz.questions = <QuestionDisplay[]> [...this.selectedQuiz.questions, newQuestion];
    this.selectedQuiz.numberOfQuestions = this.selectedQuiz.questions.length;
  }

  removeQuestion(question) {
    this.selectedQuiz.questions = this.selectedQuiz.questions.filter(x => x != question);
  }

  removeQuiz() {
    if (!this.confirmRemove) {
      this.confirmRemove = true;
    } else {
      this.quizzes = this.quizzes.filter(x => x != this.selectedQuiz);
      this.selectedQuiz = undefined;

      this.confirmRemove = false;
    }
  }

  cancelRemove() {
    this.confirmRemove = false;
  }
}
