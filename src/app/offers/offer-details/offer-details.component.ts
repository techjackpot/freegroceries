import { Component, Input } from '@angular/core';
import { Offer } from '../offer';
import { OfferService } from '../offer.service';

@Component({
  selector: 'offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})

export class OfferDetailsComponent {
  @Input()
  offer: Offer;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor (private offerService: OfferService) {}

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