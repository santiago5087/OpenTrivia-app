import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { OpenTriviaService } from '../../services/open-trivia.service';
import { TriviaOptionsComponent } from '../trivia-options/trivia-options.component';
import { Category } from '../../models/category';
import { iconClasses } from '../../models/iconClasses';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  styles: [":host { min-height: 100vh; background-color: #424242 }"]
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = []
  iconClasses = iconClasses;

  constructor(private openTriviaService: OpenTriviaService,
    private bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
    this.openTriviaService.getCategories().subscribe(res => {
      this.categories = res.trivia_categories;
      console.log(this.categories);
    },
    err => console.log(err));
  }

  openOptions(id: number, name: string) {
    let category: Category = { id: id, name: name };
    this.bottomSheet.open(TriviaOptionsComponent, { data: category });
  }

}
