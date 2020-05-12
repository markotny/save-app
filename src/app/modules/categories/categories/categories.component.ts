import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  cars: Array<any> = [{'vin': 'dsad231ff', 'year': 2012, 'brand': 'VW', 'color': 'Orange'}, {
    'vin': 'gwregre345',
    'year': 2011,
    'brand': 'Audi',
    'color': 'Black'
  }];
  cols: any[];

  constructor() {
    this.cols = [
      {field: 'vin', header: 'Vin'},
      {field: 'year', header: 'Year'},
      {field: 'brand', header: 'Brand'},
      {field: 'color', header: 'Color'}
    ];
  }

  ngOnInit(): void {
  }

}
