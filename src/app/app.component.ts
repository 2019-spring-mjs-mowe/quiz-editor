import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  name: string;
  questions: QuestionDisplay[];
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

  constructor(private quizSvc: QuizService) {
    //console.log(this.quizSvc.getQuizzes());
    //this.quizzes = this.quizSvc.getQuizzes();
  }
  errorCallingRestEndpoint = false;
  ngOnInit() {
    this.quizSvc.getQuizzes().subscribe(
      (data) => {
        console.log(data);
        this.quizzes = (<any[]> data).map(x=> ({
          name: x.name
          , questions: x.questions
        }));
      }
      , (error) => {
        console.log(error);
        this.errorCallingRestEndpoint = true;
      }
    );
  }

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
      , questions: []
    }
    this.quizzes = [...this.quizzes, newQuiz];
    this.selectedQuiz = newQuiz;
  }

  questions: QuestionDisplay[] = [];

  addNewQuestion() {
    this.selectedQuiz.questions= [
      ...this.selectedQuiz.questions
      , { name: "new Question" }
    ];
  }

  removeQuestion(q) {
    this.selectedQuiz.questions = this.selectedQuiz.questions.filter(x => x !== q);
  }
  confirmingDelete = false;
  get deleteButtonText() {
    return this.confirmingDelete ? "Yes, I want to delete this quiz" : "Delete This Quiz";
  } 

  deleteQuiz() {

    if (!this.confirmingDelete) {
      this.confirmingDelete = true;
    }
    else {
      // Actually delete the quiz.
      this.quizzes = this.quizzes.filter(x => x !== this.selectedQuiz);
      this.selectedQuiz = undefined;

      // And get out of confirming delete mode.
      this.confirmingDelete = false;
    }
  }

  cancelDelete() {
    this.confirmingDelete = false;
  }

}
