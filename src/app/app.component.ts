import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  name: string;
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
        this.quizzes = (<any[]> data).map(x => ({
          name: x.name
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
      , questions: []
      , markedForDelete: false
    };

    this.quizzes = [...this.quizzes, newQuiz];
    this.selectedQuiz = newQuiz;
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
