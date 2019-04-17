import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  name: string;
  originalName: string;
  questions: QuestionDisplay[];
  markedForDelete: boolean;
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
          , originalName: x.name
          , questions: x.questions
          , markedForDelete: false
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
      , originalName: 'New Untitled Quiz'
      , numberOfQuestions: 0
      , questions: []
      , markedForDelete: true
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
  get numberOfDeletedQuizzes() {
    return this.quizzes.filter(x=> x.markedForDelete).length;
  }
}

