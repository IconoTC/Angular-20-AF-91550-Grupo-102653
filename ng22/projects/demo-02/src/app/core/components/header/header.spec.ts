import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { authRoutes } from '../../../features/auth/routes/auth.routes';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter(authRoutes)],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('app-title', 'Demo Test');
    fixture.componentRef.setInput('subtitle', 'Aprendiendo Testing Angular');
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test de implementación
  // test de caja blanca

  it('should have as title "Demo Test"', () => {
    expect(component.title()).toEqual('Demo Test');
  });

  // Test de comportamiento
  // test de caja negra

  it('should render title', async () => {
    const element = fixture.nativeElement as HTMLElement;
    const h1 = element.querySelector('h1');
    expect(h1?.textContent).toContain('Demo Test');
  });

  it('should render title (by debug)', async () => {
    const debugElement = fixture.debugElement;
    const h1Debug = debugElement.query(By.css('h1'));
    const h1 = h1Debug?.nativeElement as HTMLElement;
    expect(h1?.textContent).toContain('Demo Test');
  });
});
