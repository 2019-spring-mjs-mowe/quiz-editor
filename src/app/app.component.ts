import { Component, OnInit } from '@angular/core'; //OnInit is a lifecycle hook, once implemented, ngOnInit() must be implemented, ngOnDestroy() is closing option
import { QuizService } from './quiz.service';

interface QuizDisplay {
  name: string;
  numberOfQuestions: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private quizSvc: QuizService) {
    //this.quizzes = this.quizSvc.getQuizzes();

  }

  errorCallingRestEndpoint = false;

  ngOnInit() {
    //make call to the quiz service, which is calling a web service
    this.quizSvc.getQuizzes().subscribe(
      (data) => {
        console.log(data);
        this.quizzes = (<QuizDisplay[]> data).map(x => ({
          name: x.name,
          numberOfQuestions: x.numberQuestions
        })); //Don't forget, when using a lambda to an object, use an extra set of parenthesis
      },
      (error) => {
        console.log(error);
        this.errorCallingRestEndpoint = true;
      }
    );
    //Observables: is nothing, until someone subscribe to it, then which it will give results
    //subscribe() is key to getting it to do something
    
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
    };

    this.quizzes = [...this.quizzes, newQuiz];
    this.selectedQuiz = newQuiz;
  }
}
