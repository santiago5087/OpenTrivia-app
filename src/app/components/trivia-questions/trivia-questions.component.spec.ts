import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriviaQuestionsComponent } from './trivia-questions.component';

describe('TriviaQuestionsComponent', () => {
  let component: TriviaQuestionsComponent;
  let fixture: ComponentFixture<TriviaQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriviaQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriviaQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
