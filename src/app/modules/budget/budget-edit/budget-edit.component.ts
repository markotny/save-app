import {Component, AfterViewInit, OnInit} from '@angular/core';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {CategoryVM, BudgetCategoryDto, BudgetDto} from '@wydatex/models';
import {SelectItem} from 'primeng/api/selectitem';
import {currencyCodes} from './currency-codes';

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

@Component({
  selector: 'app-budget-edit',
  templateUrl: './budget-edit.component.html',
  styleUrls: ['./budget-edit.component.scss']
})
export class BudgetEditComponent implements OnInit, AfterViewInit {
  categories: SelectItem[];
  currencyCodes = currencyCodes.map(c => ({label: c, value: c}));
  selectedCurrency = 'PLN';

  startDate = new Date();
  endDate = addDays(this.startDate, 30);

  showActiveSelection = this.config.data.showActiveSelection;

  selectedCategories: BudgetCategoryDto[];

  budgeted: number;

  private budgetCategories = (this.config.data.value as BudgetDto)?.budgetCategories ?? [];

  constructor(public config: DynamicDialogConfig) {}

  ngOnInit(): void {
    this.categories = (this.config.data.categories as CategoryVM[]).map(c => ({
      label: c.name,
      value: {id: c.id, moneyBudgeted: this.budgetCategories.find(bc => bc.id === c.id)?.moneyBudgeted ?? 0}
    })) as SelectItem[];
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.selectedCategories = this.categories.filter(c => this.budgetCategories.some(bc => bc.id === c.value.id)).map(c => c.value);
      this.recalculateBudgeted();
    });
  }

  recalculateBudgeted() {
    this.budgeted = this.selectedCategories.reduce((sum, c) => sum + c.moneyBudgeted, 0);
  }

  preventPropagation(e: Event) {
    e.stopPropagation();
  }
}
