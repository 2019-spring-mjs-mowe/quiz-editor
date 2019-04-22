import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';
import {
  trigger
  , transition
  , animate
  , keyframes
  , style
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
        animate('250ms', keyframes([
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
        animate('400ms', keyframes([
          style({ transform: 'scale(1.0)', 'transform-origin': 'top left', offset: 0.0 }),
          style({ transform: 'scale(1.2)', 'transform-origin': 'top left', offset: 0.5 }),
          style({ transform: 'scale(1.0)', 'transform-origin': 'top left', offset: 1.0 })
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
    this.quizSvc.getQuizzes().subscribe(
      (data) => {
        console.log(data);
        this.quizzes = (<any[]> data).map(x => ({
          name: x.name
          , originalName: x.name
          , questions: x.questions
          , originalQuestionsChecksum: x.questions.map(x => x.name).join('~')
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
      x.name != x.originalName
      || x.originalQuestionsChecksum != x.questions.map(x => x.name).join('~')
    ).length;
  }

  get numberOfAddedQuizzes() {
    return this.quizzes.filter(x => x.originalName === 'New Untitled Quiz').length;
  }

  //
  //  Animation properties and methods...
  //
  detailsAnimationState = "leftPosition";

  detailsFromLeftAnimationComplete() {
    this.detailsAnimationState = 'leftPosition';
  }


  //
  // Learning promises...
  //

  jsPromisesOne() {
    const x = this.quizSvc.getNumberPromise(true);
    console.log(x); // ? ? ? 

    x.then(
      n => {
        console.log(n); // ? ? ? 

        const y = this.quizSvc.getNumberPromise(false);
        console.log(y); // ? ? ?

        y.then(x => console.log(x)).catch(x => console.log(x));
      }
    ).catch(
      e => {
        console.log(".catch()");
        console.log(e);
      }
    );
  }

  async jsPromisesTwo() {
    // async/await...
    try {
      const x = await this.quizSvc.getNumberPromise(true);
      console.log(x); // ? ? ?

      const y = await this.quizSvc.getNumberPromise(true);
      console.log(y);
    }

    catch(error) {
      console.log(error);
    }
  }

  async jsPromisesThree() {
    // async/await...
    try {
      const x = this.quizSvc.getNumberPromise(true);
      console.log(x); // ? ? ?

      const y = this.quizSvc.getNumberPromise(true);
      console.log(y);

      const results = await Promise.all([x, y]);
      //const results = await Promise.race([x, y]);
      console.log(results); // ? ? ? 
    }

    catch(error) {
      console.log(error);
    }
  }  
}
