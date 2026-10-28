import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Menu } from './menu';
import { By } from '@angular/platform-browser';
import { MENU_OPTIONS, routes } from '../../../app.routes';
import { provideRouter } from '@angular/router';

describe('Menu', () => {
  let component: Menu;
  let fixture: ComponentFixture<Menu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Menu],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(Menu);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('menuOptions', MENU_OPTIONS);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should render the menu items", () => {
  const options = component["menuOptions"]();
    options.forEach((option, index) => {
      const itemElement: HTMLLIElement = fixture.debugElement.queryAll(By.css("li"))[
        index
      ].nativeElement;
      expect(itemElement.textContent).toContain(option.label);
    });
  });
});
