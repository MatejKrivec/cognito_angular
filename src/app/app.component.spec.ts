import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import * as Auth from '@aws-amplify/auth';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'cognito-angular'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('cognito-angular');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, cognito-angular');
  });


  //TESTI

  it('should render form fields in the correct order', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const formFields = compiled.querySelectorAll('amplify-authenticator [formFields]');
  
    expect(formFields.length).toBe(4);
    expect(formFields[0].getAttribute('name')).toBe('name');
    expect(formFields[1].getAttribute('name')).toBe('email');
    expect(formFields[2].getAttribute('name')).toBe('password');
    expect(formFields[3].getAttribute('name')).toBe('confirm_password');
  });

  

  
});
