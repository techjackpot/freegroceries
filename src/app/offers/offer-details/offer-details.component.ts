import { Component, Input, OnInit } from '@angular/core';
import { Offer } from '../offer';
import { Cfield } from '../../cfields/cfield';
import { OfferService } from '../offer.service';
import { CfieldService } from '../../cfields/cfield.service';

@Component({
  selector: 'offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})

export class OfferDetailsComponent {
  cfields: Cfield[]

  types =  [ { value:'', label: '' }, { value:'radio', label:'Radio' }, { value:'select', label:'Drop Down' }, { value:'checkbox', label: 'Check Box' } ]

  preset_types = [
    { value: 'name_first', label: 'First Name' },
    { value: 'name_last', label: 'Last Name' },
    { value: 'email', label: 'Email' },
    { value: 'custom telephone number', label: 'Phone' },
    { value: 'custom street address', label: 'Street Address' },
    { value: 'custom city or suburb', label: 'City or Suburb' },
    { value: 'custom state', label: 'State' },
    { value: 'custom postcode', label: 'Postcode' },
    { value: 'custom list selection', label: 'Birth Year' },
    { value: 'dob', label: 'Date of birth' },
    { value: 'custom gender', label: 'Gender(Origin)' },
    { value: 'gender_long', label: 'Gender(Male/Female)' },
    { value: 'gender_short', label: 'Gender(M/F)' }
  ]

  @Input()
  offer: Offer;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;



  constructor (private offerService: OfferService, private cfieldService: CfieldService) {}

  ngOnInit() {
    this.cfieldService
      .getCfields()
      .then((cfields: Cfield[]) => {
        this.cfields = cfields.map((cfield) => {
          return cfield;
        })
      });
  }

  addPreQstValue() {
    const value = { value: '', label: '', primary: false };
    this.offer.preqst.values.push(value);
  }

  removePreQstValue(i: number) {
    this.offer.preqst.values.splice(i,1);
  }

  addPresetValue() {
    const value = { source: '', target: '' };
    this.offer.presets.push(value);
  }

  removePresetValue(i: number) {
    this.offer.presets.splice(i,1);
  }

  getIndexOfCfields(cfields,cfield_id) {
    let index = 0;
    cfields.forEach((cfield, i) => {
      if(cfield.cfield_id == cfield_id) {
        index = i;
      }
    });
    return index;
  }

  createOffer(offer: Offer) {
    this.offerService.createOffer(offer).then((newOffer: Offer) => {
      this.createHandler(newOffer);
    });
  }

  updateOffer(offer: Offer): void {
    this.offerService.updateOffer(offer).then((updatedOffer: Offer) => {
      this.updateHandler(updatedOffer);
    });
  }

  deleteOffer(offerId: String): void {
    this.offerService.deleteOffer(offerId).then((deletedOfferId: String) => {
      this.deleteHandler(deletedOfferId);
    });
  }
}