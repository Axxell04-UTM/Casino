import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FindTheDiamondPage } from './find-the-diamond.page';

describe('FindTheDiamondPage', () => {
  let component: FindTheDiamondPage;
  let fixture: ComponentFixture<FindTheDiamondPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FindTheDiamondPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
