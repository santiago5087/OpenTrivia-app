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

  result:  Results;
  subscription: Subscription;
  checkAnswers: boolean = false;

  constructor(private openTriviaService: OpenTriviaService) { }

  ngOnInit(): void {
    this.subscription = this.openTriviaService.getResultsObservable().subscribe(result => { this.result = result; console.log("Results at Results Component", result)});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
