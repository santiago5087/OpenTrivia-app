import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

import { Question } from '../models/question';
import { Results } from '../models/results';

@Injectable({
  providedIn: 'root'
})
export class OpenTriviaService {

  baseURL = "https://opentdb.com/";
  questions: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  result: Subject<Results> = new Subject<Results>();

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}api_category.php`);
  }

  getQuestions(categoryId: string, numberOfQuestions: string, difficulty: string): void {
    this.http.get<any>
      (`${this.baseURL}api.php?amount=${numberOfQuestions}&category=${categoryId}&difficulty=${difficulty}`)
      .subscribe(questions => {
        if (questions.response_code == 0) {
          this.sendQuestions(questions.results);
        } else {
          console.log(questions);
        }
      });
  }

  sendQuestions(questions: any[]) {
    this.questions.next(questions);
  }

  sendResults(result: Results) {
    this.result.next(result);
  }

  getQuestionsObservable(): Observable<any> {
    return this.questions.asObservable();
  }

  getResultsObservable(): Observable<Results> {
    return this.result.asObservable();
  }

  getResults(userAnswers: string[], questions: Question[]): void {
    let totalQuestions = questions.length;
    let correctAnswers = 0;

    for (let i=0; i < totalQuestions; i++) {
      if (questions[i].correct_answer.localeCompare(userAnswers[i]) == 0) {
        correctAnswers += 1;
      }
    }
    
    let incorrectAnswers = totalQuestions - correctAnswers;
    let score = ((correctAnswers/totalQuestions) * 100).toFixed(2) + " %";
    const result: Results = { 
      totalQuestions,
      incorrectAnswers,
      correctAnswers,
      score
    }
    console.log(result);
    this.sendResults(result);
    // A la hora de mostar los resultados hay que decodificar el texto
  }

}