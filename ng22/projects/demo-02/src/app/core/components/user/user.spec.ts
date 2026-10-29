import { ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from './user';
import { provideRouter } from '@angular/router';
import { authRoutes } from '../../../features/auth/routes/auth.routes';

describe('User', () => {
  let component: User;
  let fixture: ComponentFixture<User>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [User],
      providers: [provideRouter(authRoutes)],
    }).compileComponents();

    fixture = TestBed.createComponent(User);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
