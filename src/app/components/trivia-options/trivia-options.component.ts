import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-trivia-options',
  templateUrl: './trivia-options.component.html',
  styleUrls: ['./trivia-options.component.scss']
})
export class TriviaOptionsComponent implements OnInit {

  categoryId: string;
  categoryName: string;

  constructor(private bottomSheetRef: MatBottomSheetRef<TriviaOptionsComponent>,
      @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { 
        this.categoryId = data.categoryId;
        this.categoryName = data.categoryName;
      }

  ngOnInit(): void {
    
  }

}
