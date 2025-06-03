import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RussianRoulettePage } from './russian-roulette.page';

describe('RussianRoulettePage', () => {
  let component: RussianRoulettePage;
  let fixture: ComponentFixture<RussianRoulettePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RussianRoulettePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
