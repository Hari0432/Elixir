import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OtploginPage } from './otplogin.page';

describe('OtploginPage', () => {
  let component: OtploginPage;
  let fixture: ComponentFixture<OtploginPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OtploginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
