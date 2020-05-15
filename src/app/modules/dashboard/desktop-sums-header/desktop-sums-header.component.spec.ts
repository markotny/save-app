import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopSumsHeaderComponent } from './desktop-sums-header.component';

describe('DesktopSumsHeaderComponent', () => {
  let component: DesktopSumsHeaderComponent;
  let fixture: ComponentFixture<DesktopSumsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesktopSumsHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopSumsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
