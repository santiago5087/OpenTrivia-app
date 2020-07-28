import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpenTriviaService {

  baseURL = "https://opentdb.com/";

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<any>(`${this.baseURL}api_category.php`);
  }
}
