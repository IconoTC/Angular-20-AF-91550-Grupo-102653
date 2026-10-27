import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Card } from './card';
import { Component } from '@angular/core';

@Component({
  imports: [Card],
  template: `
    <ind-card>
      <p>Card content</p>
    </ind-card>
  `,
})
class TestComponent {}

describe('Card', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Card],
    }).compileComponents();

    fixture = TestBed.createComponent(Card);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render content inside the card', () => {
    fixture.detectChanges();
    const cardElement: HTMLElement = fixture.nativeElement.querySelector('ind-card');
    expect(cardElement.textContent).toContain('Card content');
  });
});
