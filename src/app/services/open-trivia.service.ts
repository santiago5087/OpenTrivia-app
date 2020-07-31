import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OpenTriviaService {

  baseURL = "https://opentdb.com/";
  questions: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient,
    private router: Router) { }

  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}api_category.php`);
  }

  getQuestions(categoryId: string, numberOfQuestions: string, difficulty: string): void {
    this.http.get<any>
      (`${this.baseURL}api.php?amount=${numberOfQuestions}&category=${categoryId}&difficulty=${difficulty}`)
      .subscribe(questions => {
        if (questions.response_code == 0) {
          this.router.navigate(['/questions']).then(completed => {
            if (completed) this.sendQuestions(questions.results);
          })
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
}