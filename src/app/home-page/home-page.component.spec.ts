import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import * as Auth from '@aws-amplify/auth';
import { ChangeDetectorRef } from '@angular/core';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageComponent],
      providers: [ChangeDetectorRef]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit and fetch user data', async () => {
    spyOn(component, 'getCurrentUser').and.returnValue(Promise.resolve({ username: 'testuser', userId: '12345' }));
    spyOn(component, 'getCurrentSession').and.returnValue(Promise.resolve({
      accessToken: { jwtToken: 'accessToken', payload: {} },
      idToken: { jwtToken: 'idToken', payload: { name: 'Test User', email: 'test@example.com' } },
      refreshToken: { token: 'refreshToken' }
    }));
    spyOn(component, 'getIdTokenPayload').and.callThrough();
    spyOn(component, 'getAccessTokenPayload').and.callThrough();
    spyOn(component, 'getCurrentUserFullName').and.callThrough();
    spyOn(component, 'getCurrentUserEmail').and.callThrough();
    spyOn(component, 'getRefreshTokenFromLocalStorage').and.callThrough();

    await component.ngOnInit();
  
    expect(component.getCurrentUser).toHaveBeenCalled();
    expect(component.getCurrentSession).toHaveBeenCalled();
    expect(component.getIdTokenPayload).toHaveBeenCalled();
    expect(component.getAccessTokenPayload).toHaveBeenCalled();
    expect(component.getCurrentUserFullName).toHaveBeenCalled();
    expect(component.getCurrentUserEmail).toHaveBeenCalled();
    expect(component.getRefreshTokenFromLocalStorage).toHaveBeenCalled();
    expect(component.fullName).toBe('Test User');
    expect(component.email).toBe('test@example.com');
  });

  it('should display token details', async () => {
    component.idTokenPayload = { sub: '12345' };
    component.accessTokenPayload = { scope: 'read' };
    component.refreshToken = 'testRefreshToken';
    fixture.detectChanges();
  
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('pre')?.textContent).toContain('12345');
    expect(compiled.querySelector('pre')?.textContent).toContain('read');
    expect(compiled.querySelector('.refreshToken')?.textContent).toContain('testRefreshToken');
  });

  it('should sign out the user', async () => {
    spyOn(Auth, 'signOut').and.returnValue(Promise.resolve());
  
    await component.signOut();
  
    expect(Auth.signOut).toHaveBeenCalled();
    expect(component.user).toBeNull();
    expect(component.session).toBeNull();
    expect(component.fullName).toBeUndefined();
    expect(component.email).toBeUndefined();
    expect(component.idTokenPayload).toBeNull();
    expect(component.accessTokenPayload).toBeNull();
    expect(component.refreshToken).toBeNull();
    expect(localStorage.length).toBe(0);
  });
});
