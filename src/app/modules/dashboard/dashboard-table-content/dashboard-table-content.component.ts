import {Component, OnInit, Input} from '@angular/core';
import {CategoryVM} from '@Wydatex/models';

@Component({
  selector: 'app-dashboard-table-content',
  templateUrl: './dashboard-table-content.component.html',
  styleUrls: ['./dashboard-table-content.component.scss']
})
export class DashboardTableContentComponent implements OnInit {
  @Input() model: {category: CategoryVM; categoryExpenses: number; budgetCurrency: string};

  constructor() {}

  ngOnInit(): void {}
}
