import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginLandingPage } from './login-landing.page';

describe('LoginLandingPage', () => {
  let component: LoginLandingPage;
  let fixture: ComponentFixture<LoginLandingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginLandingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
