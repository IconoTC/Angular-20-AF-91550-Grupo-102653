import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { By } from '@angular/platform-browser';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });
  

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  // Test de implementación
  // test de caja blanca

  it('should have as title "Demo 01"', () => {
    expect(component['title']()).toEqual('Demo 01');
  });


  // Test de comportamiento
  // test de caja negra

  it('should render title', async () => {
    const element = fixture.nativeElement as HTMLElement;
    const h1 = element.querySelector('h1');
    expect(h1?.textContent).toContain('Demo 01');
  });


   it('should render title (by debug)', async () => {
    const debugElement = fixture.debugElement;
    const h1Debug = debugElement.query(By.css('h1'))
    const h1 = h1Debug?.nativeElement as HTMLElement;
    expect(h1?.textContent).toContain('Demo 01');
   })

});
