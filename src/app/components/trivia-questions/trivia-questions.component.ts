import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormArray, FormControl, Validators } from '@angular/forms';

import { OpenTriviaService } from '../../services/open-trivia.service';

@Component({
  selector: 'app-trivia-questions',
  templateUrl: './trivia-questions.component.html',
  styleUrls: ['./trivia-questions.component.scss']
})
export class TriviaQuestionsComponent implements OnInit, OnDestroy {

  questions = new FormArray([]);
  subscription: Subscription;

  constructor(private openTriviaService: OpenTriviaService) { }

  ngOnInit(): void {
    this.subscription = this.openTriviaService.getQuestionsObservable().subscribe(
      questions => {
        questions.forEach(question => {
          this.questions.push(new FormControl("", Validators.required))
        });
        console.log(questions);
      },
      err => console.log(err)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
