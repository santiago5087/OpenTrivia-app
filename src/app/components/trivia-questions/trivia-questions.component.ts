import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { OpenTriviaService } from '../../services/open-trivia.service';

@Component({
  selector: 'app-trivia-questions',
  templateUrl: './trivia-questions.component.html',
  styleUrls: ['./trivia-questions.component.scss']
})
export class TriviaQuestionsComponent implements OnInit, OnDestroy {

  questions: any[] = undefined;
  subscription: Subscription;

  constructor(private openTriviaService: OpenTriviaService) { }

  ngOnInit(): void {
    console.log("Hola")
    this.subscription = this.openTriviaService.getQuestionsObservable().subscribe(
      questions => {
        this.questions = questions;
        console.log(questions);
      },
      err => console.log(err)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
