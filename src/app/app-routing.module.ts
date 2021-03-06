import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesComponent } from './components/categories/categories.component';
import { TriviaQuestionsComponent } from './components/trivia-questions/trivia-questions.component';
import { ResultsComponent } from './components/results/results.component';

const routes: Routes = [
  { path: "", component: CategoriesComponent },
  { path: "questions", component: TriviaQuestionsComponent },
  { path: "results", component: ResultsComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
