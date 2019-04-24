import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';
import {
  trigger,
  transition,
  animate,
  style,
  keyframes
} from '@angular/animations';

interface QuizDisplay {
  name: string;
  originalName: string;

  questions: QuestionDisplay[];
  originalQuestionsChecksum: string;

  markedForDelete: boolean;
}

interface QuestionDisplay {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('detailsFromLeft', [
      transition('leftPosition => finalPosition', [
        animate('300ms', keyframes([
          style({ left: '-30px', offset: 0.0 }),
          style({ left: '-20px', offset: 0.25 }),
          style({ left: '-10px', offset: 0.5 }),
          style({ left: '-5px', offset: 0.75 }),
          style({ left: '0px', offset: 1.0 })
        ]))
      ]),
    ]),
    trigger('pulseSaveCancelButtons', [
      transition('nothingToSave => somethingToSave', [
        animate('250ms', keyframes([
          style({ transform: 'scale(1.0)', 'transform-origin': 'center center', offset: 0.0 }),
          style({ transform: 'scale(1.1)', 'transform-origin': 'center center', offset: 0.5 }),
          style({ transform: 'scale(1.0)', 'transform-origin': 'center center', offset: 1.0 })
        ]))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {

  constructor(private quizSvc: QuizService) {
    //console.log(this.quizSvc.getQuizzes());
    //this.quizzes = this.quizSvc.getQuizzes();
  }

  errorCallingRestEndpoint = false;

  ngOnInit() {
    this.getQuizzes();
  }

  title = 'quiz-editor';
  
  myWidth = 250;

  quizzes: QuizDisplay[] = [];
  selectedQuiz: QuizDisplay = undefined;

  private getQuizzes() {
    this.quizSvc.getQuizzes().subscribe((data) => {
      console.log(data);
      this.quizzes = (<any[]>data).map(x => ({
        name: x.name,
        originalName: x.name,
        questions: x.questions,
        originalQuestionsChecksum: x.questions.map(x => x.name).join('~'),
        markedForDelete: false
      }));
    }, (error) => {
      console.log(error);
      this.errorCallingRestEndpoint = true;
    });
  }

  setSelectedQuiz(q: QuizDisplay) {
    this.selectedQuiz = q;
    this.detailsAnimationState = 'finalPosition';
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
      , questions: []
      , originalQuestionsChecksum: ''
      , markedForDelete: false
    };

    this.quizzes = [...this.quizzes, newQuiz];
    this.setSelectedQuiz(newQuiz);
  }

  removeQuestion(questionToDelete) {
    this.selectedQuiz.questions = 
      this.selectedQuiz.questions.filter(x => x !== questionToDelete);
  }

  addNewQuestion() {
    this.selectedQuiz.questions = [
      ...this.selectedQuiz.questions
      , {
        name: "New Untitled Question"
      }
    ];
  }

  get numberOfDeletedQuizzes() {
    return this.quizzes.filter(x => x.markedForDelete).length;
  }

  get numberOfEditedQuizzes() {
    return this.quizzes
      .filter(x => 
        (!x.markedForDelete && x.originalName == 'New Untitled Quiz') &&
        (x.name != x.originalName
        || x.originalQuestionsChecksum != x.questions.map(x => x.name).join('~'))
      ).length;
  }

  get numberOfAddedQuizzes() {
      return this.quizzes.filter(x => 
        !x.markedForDelete &&
        x.originalName === 'New Untitled Quiz').length;
  }

  detailsAnimationState = 'leftPosition';

  detailsFromLeftAnimationComplete() {
    this.detailsAnimationState = 'leftPosition';
  }

  cancelEdit() {
    this.getQuizzes();
    this.setSelectedQuiz(undefined);
  }
}
