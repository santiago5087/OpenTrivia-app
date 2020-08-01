import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormArray, FormControl, Validators, FormGroup, Form } from '@angular/forms';

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
        this.questions = [];
        this.questionControls.clear();
        questions.forEach(question => {
          this.questionControls.push(new FormControl(null, Validators.required));
          this.questions.push({ 
            correct_answer: question.correct_answer,
            incorrect_answers: question.incorrect_answers,
            question: question.question
          });
        });
      },
      err => console.log(err)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.triviaForm.reset();
    this.questionControls.reset();
  }

  onSubmit() {
    console.log(this.triviaForm.value);
  }

}
