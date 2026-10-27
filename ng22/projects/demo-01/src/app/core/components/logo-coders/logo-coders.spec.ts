import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoCoders } from './logo-coders';

describe('LogoCoders', () => {
  let component: LogoCoders;
  let fixture: ComponentFixture<LogoCoders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoCoders],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoCoders);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should respond to click events on upper and down paths', () => {
    vi.spyOn(console, 'log').mockImplementation(() => undefined);


    const upperPath = fixture.nativeElement.querySelector('#upper');
    const downPath = fixture.nativeElement.querySelector('#down');

    upperPath.dispatchEvent(new MouseEvent('click'));
    //component.onClick('upper');
    expect(console.log).toHaveBeenCalledWith('Clicked on upper path');
    
    downPath.dispatchEvent(new MouseEvent('click'));
    //component.onClick('down');
    expect(console.log).toHaveBeenCalledWith('Clicked on down path');
  });
});