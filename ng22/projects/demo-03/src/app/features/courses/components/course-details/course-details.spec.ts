import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseDetails } from './course-details';
import { By } from '@angular/platform-browser';

describe('CourseDetails', () => {
  let component: CourseDetails;
  let fixture: ComponentFixture<CourseDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a title', () => {
    const element = fixture.nativeElement as HTMLElement;
    const title = element.querySelector('.course-title');
    expect(title).toBeTruthy();
    expect(title?.textContent).toContain(component['course']().title);
  });

  describe('Utilidad', () => {
    let utilityOutput: HTMLElement;
    let buttons: NodeListOf<HTMLButtonElement>;

    beforeEach(() => {
      const element = fixture.nativeElement as HTMLElement;
      const utilityDiv = element.querySelector('.course-stats[aria-label="Utilidad"]');
      utilityOutput = utilityDiv?.querySelector('output') as HTMLElement;
      buttons = utilityDiv?.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
    });

    it('should render the utility stat', () => {
      expect(utilityOutput).toBeTruthy();
      expect(utilityOutput?.textContent).toContain(
        component['course']().courseStats.utility.toString(),
      );
    });

    it('should increase the utility stat when the increase button is clicked', () => {
      const increaseButton = buttons[1];
      increaseButton.click();
      fixture.detectChanges();

      expect(utilityOutput.textContent).toContain(
        component['course']().courseStats.utility.toString(),
      );
    });

    it('should decrease the utility stat when the decrease button is clicked', () => {
      const decreaseButton = buttons[0];
      decreaseButton.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(utilityOutput.textContent).toContain(
        component['course']().courseStats.utility.toString(),
      );
    });

    it('should reset the utility stat when the reset button is clicked', () => {
      const debugButton = fixture.debugElement.queryAll(
        By.css('.course-stats[aria-label="Utilidad"] button'),
      );
      debugButton[2].triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(utilityOutput.textContent).toContain(
        component['course']().courseStats.utility.toString(),
      );
    });
  });

  describe('Average', () => {
    let averageOutput: HTMLElement;

    beforeEach(() => {
      const element = fixture.nativeElement as HTMLElement;
      averageOutput = element.querySelector('.average') as HTMLElement;
    });

    it('should render the average stat', () => {
      expect(averageOutput).toBeTruthy();
      expect(averageOutput?.textContent).toContain(component['average']().toFixed(2));
    });
  });

  describe('Reset all Stats', () => {
    let resetAllButton: HTMLButtonElement;

    beforeEach(() => {
      const element = fixture.nativeElement as HTMLElement;
      resetAllButton = element.querySelector('.average button') as HTMLButtonElement;
    });

    it('should reset all stats when the reset all button is clicked', () => {
      resetAllButton.click();
      fixture.detectChanges();

      const courseStats = component['course']().courseStats;
      expect(courseStats.utility).toBe(component['minStat']);
      expect(courseStats.difficulty).toBe(component['minStat']);
      expect(courseStats.actualization).toBe(component['minStat']);
    });
  });
});
