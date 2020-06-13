import { Component, OnInit } from '@angular/core';
import {Expense, ExpenseExtended} from '@state/expenses';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {

  static toExpenseType(item: ExpenseExtended): Expense {
    delete item.budgetName;
    delete item.categoryName;
    delete item.currencySymbol;
    return item;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
