import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Timestamp } from './timestamp';
import { TimeService } from '../../services/time.service';

describe('Timestamp', () => {
  let component: Timestamp;
  let fixture: ComponentFixture<Timestamp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Timestamp],
      providers: [
       {
        provide: TimeService,
        useValue: {
          getTime: () => 1234567890,
        },
       }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Timestamp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the timestamp', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('output')?.textContent).toContain(
      '1234567890'
    );
  });
});
