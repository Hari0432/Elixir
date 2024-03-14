import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OtpverifyPage } from './otpverify.page';

describe('OtpverifyPage', () => {
  let component: OtpverifyPage;
  let fixture: ComponentFixture<OtpverifyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OtpverifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
