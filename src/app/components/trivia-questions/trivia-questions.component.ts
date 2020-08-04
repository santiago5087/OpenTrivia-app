import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormArray, FormControl, Validators, FormGroup } from '@angular/forms';

import { OpenTriviaService } from '../../services/open-trivia.service';
import { Question } from '../../models/question';

@Component({
  selector: 'app-trivia-questions',
  templateUrl: './trivia-questions.component.html',
  styleUrls: ['./trivia-questions.component.scss']
})
export class TriviaQuestionsComponent implements OnInit, OnDestroy {

  triviaForm = new FormGroup({
    questionControls: new FormArray([])
  });
  questionControls = this.triviaForm.get('questionControls') as FormArray;
  
  questions: Question[] = [];
  subscription: Subscription;

  constructor(private openTriviaService: OpenTriviaService) { }

  ngOnInit(): void {
    this.subscription = this.openTriviaService.getQuestionsObservable().subscribe(
      questions => {
        this.clearTrivia();
        questions.forEach(question => {
          this.questionControls.push(new FormControl(null, Validators.required));
          let options: string[] = question.incorrect_answers;
          options.push(question.correct_answer);
        
          /*
          Para que los elementos del arreglo "options" queden en posiciones aleatorias y no haya un patrón 
          de repuestas entre las preguntas.
          */
          for(let i = options.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i+1))
            const temp = options[i]
            options[i] = options[j]
            options[j] = temp
          }
          
          this.questions.push({ 
            correct_answer: question.correct_answer,
            options: options,
            question: question.question
          });
        });
        console.log("my questions:", this.questions);
      },
      err => console.log(err)
    );
  }

  clearTrivia(): void {
    this.questions = [];
    this.questionControls.clear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.triviaForm.reset();
    this.questionControls.reset();
  }

  onSubmit() {
    let userAnswers = this.triviaForm.value;
    
    console.log(this.triviaForm.value);
  }

  htmlDecode(input: string): string {
    let doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }

}