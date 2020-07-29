import { Component, OnInit } from '@angular/core';

import { OpenTriviaService } from '../../services/open-trivia.service';
import { Category } from '../../models/category';
import { iconClasses } from '../../models/iconClasses';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = []
  iconClasses = iconClasses;

  constructor(private openTriviaService: OpenTriviaService) { }

  ngOnInit(): void {
    this.openTriviaService.getCategories().subscribe(res => {
      this.categories = res.trivia_categories;
      console.log(res);
    },
    err => console.log(err));
  }

}
