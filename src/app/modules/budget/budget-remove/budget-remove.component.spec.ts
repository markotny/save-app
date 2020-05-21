import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetRemoveComponent } from './budget-remove.component';

describe('BudgetRemoveComponent', () => {
  let component: BudgetRemoveComponent;
  let fixture: ComponentFixture<BudgetRemoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetRemoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
