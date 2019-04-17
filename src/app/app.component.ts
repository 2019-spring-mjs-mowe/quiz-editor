import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  name: string;
  originalName: string;

  isDeleted: boolean;

  questions: QuestionDisplay[];
  questionsChecksum: string;
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
        this.quizzes = (<any[]> data).map(x => ({
          name: x.name
          , originalName: x.name
          , isDeleted: false
          , questions: x.questions
          , questionsChecksum: x.questions.map(x => x.name).join('~')
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

    let newQuiz: QuizDisplay = { 
      name: 'New Untitled Quiz'
      , isDeleted: false
      , originalName: 'New Untitled Quiz'
      , questions: []
      , questionsChecksum: ""
    };

    this.quizzes = [...this.quizzes, newQuiz];
    this.selectedQuiz = newQuiz;
  }

  get numberOfEditedQuizzes() {
    return this.quizzes
      .filter(x => 
        (x.originalName != "New Untitled Quiz" 
        && x.name != x.originalName)
        || x.questionsChecksum != x.questions.map(x => x.name).join('~')
      ).length;
  }

  get numberOfAddedQuizzes() {
    return this.quizzes.filter(x => x.originalName == 'New Untitled Quiz').length;
  }

  get numberOfDeletedQuizzes() {
    return this.quizzes.filter(x => x.isDeleted).length;
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
