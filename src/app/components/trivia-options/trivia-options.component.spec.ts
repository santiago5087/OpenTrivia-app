import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriviaOptionsComponent } from './trivia-options.component';

describe('TriviaOptionsComponent', () => {
  let component: TriviaOptionsComponent;
  let fixture: ComponentFixture<TriviaOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriviaOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriviaOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
