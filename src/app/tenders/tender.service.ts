import {Injectable} from '@angular/core';
import {ApiService} from '../api.service';
import {CacheableObservable} from '../cacheable-observable/cacheable-observable.model';
import {TenderInterface} from '../core/models/tender.model';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class TenderService {
    constructor(
        private api: ApiService,
    ) {}

    create(body) {
        return this.api.post('tenders/', {title: body.title, description: body.description});
    }

    all(page = 1): CacheableObservable<TenderInterface[]> {
        return this.api.get(`tenders/`, {page: page}).pipe(map(({data}) => data)) as CacheableObservable<TenderInterface[]>;
    }

    get(id: number): CacheableObservable<TenderInterface> {
        return this.api.get(`tenders/${id}`).pipe(map(({data}) => data)) as CacheableObservable<TenderInterface>;
    }

    delete(id: number) {
        console.log('delete');
        return this.api.delete(`tenders/${id}/delete`, null).pipe(map(({data}) => data));
    }

    update(tender: TenderInterface) {
        return this.api.patch(`tenders/${tender.id}`, {title: tender.title, description: tender.description});
    }

    newObject() {
        return {title: '', description: ''};
    }
}
