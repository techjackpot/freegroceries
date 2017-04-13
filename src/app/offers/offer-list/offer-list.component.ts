import { Component, OnInit } from '@angular/core';
import { Offer } from '../offer';
import { OfferService } from '../offer.service';
import { OfferDetailsComponent } from '../offer-details/offer-details.component';

@Component({
  selector: 'offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css'],
  providers: [OfferService]
})

export class OfferListComponent implements OnInit {

  offers: Offer[]
  selectedOffer: Offer

  constructor(private offerService: OfferService) { }

  ngOnInit() {
     this.offerService
      .getOffers()
      .then((offers: Offer[]) => {
        this.offers = offers.map((offer) => {
          if (!offer.checks) {
            offer.checks = {
              check_gender1: {
              	use: false,
              	cond: ''
              },
              check_gender2: {
              	use: false,
              	cond: ''
              },
              check_age: {
                use: false,
                cond: '',
                val: 0
              }
            }
          } else {
          	if (!offer.checks.check_gender1) {
          	  offer.checks.check_gender1 = {
          	    use: false,
          	    cond: ''
          	  }
          	}
          	if (!offer.checks.check_gender2) {
          	  offer.checks.check_gender2 = {
          	    use: false,
          	    cond: ''
          	  }
          	}
          	if (!offer.checks.check_age) {
          	  offer.checks.check_age = {
          	    use: false,
          	    cond: '',
          	    val: 0
          	  }
          	}
          }
          return offer;
        });
      });
  }

  private getIndexOfOffer = (offerId: String) => {
    return this.offers.findIndex((offer) => {
      return offer._id === offerId;
    });
  }

  selectOffer(offer: Offer) {
    this.selectedOffer = offer
  }

  createNewOffer() {
    var offer: Offer = {
      name: '',
      url: '',
      img_url: '',
      description: '',
      checks: {
        check_gender1: {
          use: false,
          cond: ''
        },
        check_gender2: {
          use: false,
          cond: ''
        },
        check_age: {
          use: false,
          cond: '',
          val: 0
        }
      }
    };

    // By default, a newly-created offer will have the selected state.
    this.selectOffer(offer);
  }

  deleteOffer = (offerId: String) => {
    var idx = this.getIndexOfOffer(offerId);
    if (idx !== -1) {
      this.offers.splice(idx, 1);
      this.selectOffer(null);
    }
    return this.offers;
  }

  addOffer = (offer: Offer) => {
    this.offers.push(offer);
    this.selectOffer(offer);
    return this.offers;
  }

  updateOffer = (offer: Offer) => {
    var idx = this.getIndexOfOffer(offer._id);
    if (idx !== -1) {
      this.offers[idx] = offer;
      this.selectOffer(offer);
    }
    return this.offers;
  }
}