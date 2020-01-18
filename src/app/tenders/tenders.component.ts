import {Component, OnInit} from '@angular/core';
import {TenderService} from './tender.service';
import {TenderInterface} from '../core/models/tender.model';

@Component({
    selector: 'app-tenders',
    templateUrl: './tenders.component.html',
    styleUrls: ['./tenders.component.css']
})

export class TendersComponent implements OnInit {
    tenders: TenderInterface[];
    loading: boolean;
    page;
    action = 'New';

    constructor(
        private tenderService: TenderService
    ) {
    }

    ngOnInit(): void {
        this.page = 1;
        this.tenderService.all().noCache().toPromise().then(data => this.tenders = data);
    }

    onScroll () {
        this.page++;
        this.getTenders();
    }

    getTenders() {
        if (this.loading) {
            return;
        }
        this.loading = true;
        this.tenderService
            .all(this.page)
            .noCache()
            .subscribe((data) => {
                this.tenders = this.tenders.concat(data);
                this.loading = false;
            });
    }

    getRemovedTender(id) {
        this.tenders = this.tenders.filter(tender => tender.id !== id);

        if (!this.tenders.length) {
            this.getTenders();
        }
    }

    getCreatedTender(tender) {
        this.tenders = [tender].concat(this.tenders);
    }

    getUpdatedTender(tender) {
        this.tenders = this.tenders.filter(current => current.id !== tender.id);
        this.tenders = [tender].concat(this.tenders);
    }
}
