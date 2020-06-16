import {Component, OnInit} from '@angular/core';
import {Income, IncomeExtended} from '@state/incomes';

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.scss']
})
export class IncomesComponent implements OnInit {
  static toIncomeType(item: IncomeExtended): Income {
    delete item.budgetName;
    delete item.currencySymbol;
    return item;
  }

  constructor() {}

  ngOnInit(): void {}
}
