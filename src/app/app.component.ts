import { Component, OnInit } from '@angular/core';
import { QuizVBService } from './quiz-vb.service';

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

  constructor(private quizSvx:QuizVBService) {
    // console.log(this.quizSvx.getQuizzes());
    // this.quizzes = this.quizSvx.getQuizzes();
  }
  errorCallingRestEndPoint = false;
  ngOnInit() {
    this.quizSvx.getQuizzes().subscribe(
      (data) => {
        console.log(data);
        this.quizzes = (<QuizDisplay[]> data).map(x => ({
          name: x.name
          , numberOfQuestions: x.numberOfQuestions
        }));
      }
      , (error) => {
       console.log(error);
       this.errorCallingRestEndPoint = true;
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
      , numberOfQuestions: 0
    };
    this.quizzes = [...this.quizzes, newQuiz];
  }

  jsPromisesOne() {
    const x = this.quizSvx.getNumberPromise(true);
    console.log(x);

    x.then(
      n => {
        console.log(n);

        const y = this.quizSvx.getNumberPromise(true);
        console.log(y);
        y.then(x => console.log(x)).catch(x => console.log(x));
      }
    ).catch (
      e => {
        console.log(".catch()");
        console.log(e);
      }
    )
  }

  async jsPromisesTwo() {
    try {
      const x = await this.quizSvx.getNumberPromise(true);
      console.log(x);

      const y = await this.quizSvx.getNumberPromise(true);
      console.log(y);
    }
    catch(error) {
      console.log(error);
    }
  }

  async jsPromisesThree() {
    try {
      const x = this.quizSvx.getNumberPromise(true);
      console.log(x);

      const y = this.quizSvx.getNumberPromise(true);
      console.log(y);

      // const results = await Promise.all([x, y]);
      const results = await Promise.race([x, y]);
      console.log(results);
    }
    catch(error) {
      console.log(error);
    }
  }
}
