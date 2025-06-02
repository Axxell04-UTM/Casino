import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuessTheWayPage } from './guess-the-way.page';

describe('GuessTheWayPage', () => {
  let component: GuessTheWayPage;
  let fixture: ComponentFixture<GuessTheWayPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GuessTheWayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
