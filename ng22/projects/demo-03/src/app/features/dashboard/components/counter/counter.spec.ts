import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Counter } from './counter';
import { CounterState } from '../../types/counter-state';

const STATE_MOCK: CounterState = { id: 1, count: 0, clicks: 0 };

describe('Counter', () => {
  let component: Counter;
  let fixture: ComponentFixture<Counter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Counter],
    }).compileComponents();

    fixture = TestBed.createComponent(Counter);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('state', STATE_MOCK);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
