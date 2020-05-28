import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-modal-remove',
  templateUrl: './modal-remove.component.html',
  styleUrls: ['./modal-remove.component.scss']
})
export class ModalRemoveComponent implements OnInit {
  prompt: string;
  warningText: string;

  constructor(public config: DynamicDialogConfig) {}

  ngOnInit(): void {
    this.prompt = this.config.data.prompt || 'Delete this?';
    this.warningText = this.config.data.warningText || 'You will not be able to recover it';
  }
}
