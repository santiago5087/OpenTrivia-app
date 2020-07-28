import { Component, OnInit } from '@angular/core';

import { OpenTriviaService } from '../../services/open-trivia.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private openTriviaService: OpenTriviaService) { }

  ngOnInit(): void {
    this.openTriviaService.getCategories().subscribe(res => {
      console.log(res);
    },
    err => console.log(err));
  }

}
