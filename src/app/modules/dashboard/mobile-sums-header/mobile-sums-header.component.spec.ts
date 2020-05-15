import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSumsHeaderComponent } from './mobile-sums-header.component';

describe('MobileSumsHeaderComponent', () => {
  let component: MobileSumsHeaderComponent;
  let fixture: ComponentFixture<MobileSumsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileSumsHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSumsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
