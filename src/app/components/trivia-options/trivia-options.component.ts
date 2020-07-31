import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { OpenTriviaService } from '../../services/open-trivia.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-trivia-options',
  templateUrl: './trivia-options.component.html',
  styleUrls: ['./trivia-options.component.scss']
})
export class TriviaOptionsComponent implements OnInit {

  categoryId: number;
  categoryName: string;
  optionsForm: FormGroup;

  constructor(private bottomSheetRef: MatBottomSheetRef<TriviaOptionsComponent>,
      @Inject(MAT_BOTTOM_SHEET_DATA) public data: Category,
      private fb: FormBuilder,
      private openTriviaService: OpenTriviaService) { 
        this.categoryId = data.id;
        this.categoryName = data.name;
      }

  ngOnInit(): void {
    this.optionsForm = this.fb.group({
      difficulty: ["easy", Validators.required],
      numberOfQuestions: ["5", Validators.required]
    });
  }

  onSubmit() {
    let difficulty: string = this.optionsForm.value.difficulty;
    let numberOfQuestions: string = this.optionsForm.value.numberOfQuestions;
    this.openTriviaService.getQuestions(this.categoryId.toString(), numberOfQuestions, difficulty);
  }

  closeSheet() {
    this.bottomSheetRef.dismiss();
  }

}
