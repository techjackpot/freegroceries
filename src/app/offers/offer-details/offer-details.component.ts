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