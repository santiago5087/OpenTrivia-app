import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class OpenTriviaService {

  baseURL = "https://opentdb.com/";
  questions: BehaviorSubject<any> = new BehaviorSubject<any>([]);

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

  getQuestionsObservable(): Observable<any> {
    return this.questions.asObservable();
  }

  getResults(userAnswers: string[], questions: Question[]) {
    let questionsNumber = questions.length;
    let correctAnswers = 0;

    for (let i=0; i < questionsNumber; i++) {
      if (questions[i].correct_answer == userAnswers[i]) {
        correctAnswers ++;
      }
    }
    
    
  }
}