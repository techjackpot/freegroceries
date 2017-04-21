import { Component, Input } from '@angular/core';
//import { NgForm } from '@angular/forms';
import { Cfield } from '../cfield';
import { CfieldService } from '../cfield.service';

@Component({
  selector: 'cfield-details',
  templateUrl: './cfield-details.component.html',
  styleUrls: ['./cfield-details.component.css']
})

export class CfieldDetailsComponent {
  types =  [ { value:'', label: '' }, { value:'radio', label:'Radio' }, { value:'check', label:'Check Box' } ]

  @Input()
  cfield: Cfield;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor (private cfieldService: CfieldService) {}

  createCfield(cfield: Cfield) {
    this.cfieldService.createCfield(cfield).then((newCfield: Cfield) => {
      this.createHandler(newCfield);
    });
  }

  updateCfield(cfield: Cfield): void {
    this.cfieldService.updateCfield(cfield).then((updatedCfield: Cfield) => {
      this.updateHandler(updatedCfield);
    });
  }

  deleteCfield(cfieldId: String): void {
    this.cfieldService.deleteCfield(cfieldId).then((deletedCfieldId: String) => {
      this.deleteHandler(deletedCfieldId);
    });
  }
}
