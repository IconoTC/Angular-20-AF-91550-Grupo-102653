import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { By } from '@angular/platform-browser';
import { Footer } from '../footer/footer';
import { provideRouter } from '@angular/router';
import { routes } from '../../../app.routes';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render the header', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('ind-header')).toBeTruthy();
  });

  it('should render the footer', () => {
    const elementDebug = fixture.debugElement;
    const elementFooter = elementDebug.query(By.directive(Footer));
    expect(elementFooter).toBeTruthy();
  });
});
