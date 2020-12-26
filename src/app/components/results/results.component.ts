import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { OpenTriviaService } from '../../services/open-trivia.service';
import { Results } from '../../models/results';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy {

  result: Results;
  questions: any[];
  subscription: Subscription;
  checkAnswers: boolean = false;

  constructor(private openTriviaService: OpenTriviaService) { }

  ngOnInit(): void {
    this.subscription = this.openTriviaService.getResultsObservable().subscribe(result => { 
      this.result = result; 
      console.log("Results at Results Component", result)
    });
    this.openTriviaService.questions.subscribe(questions => {
      this.questions = questions;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  checkAnswersClass(userAnswer: string, answer): string[] {
    if(userAnswer === answer) return ['correct', 'far fa-check-circle fa-lg']
    else return ['incorrect', 'far fa-times-circle fa-lg']
  }

  htmlDecode(input: string): string {
    let doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }

}
