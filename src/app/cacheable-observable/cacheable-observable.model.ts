import {CacheObject} from './cache-object.model';
import {Observable, Operator} from 'rxjs';

const cache = new Map<string, CacheObject>();

export function clearCache() {
  cache.clear();
}

/**
 * CacheableObservable, adds noCache method
 */
export class CacheableObservable<T> extends Observable<T> implements Observable<T> {
  source;
  operator;

  constructor(private uncachedObservable: Observable<T>, source) {
    super();
    this.source = source;
  }

  static create(observable: Observable<any>, path) {
    const cacheableObservable = Observable.create((observer) => {
      const cacheKey = JSON.stringify(path);

      let cacheObject = cache.get(cacheKey);

      if (!cacheObject) {
        cacheObject = new CacheObject(
          cacheKey,
          observable
        );

        cache.set(cacheKey, cacheObject);
      }

      cacheObject.getObservable().subscribe((res) => {
        cacheObject.setResponse(res);
        observer.next(res);
        observer.complete();
      });

      /**
       * Calls next on cacheObject subject if not called yet.
       */
      cacheObject.call();
    });

    return new CacheableObservable(observable, cacheableObservable);
  }

  noCache(): Observable<T> {
    this.source = this.uncachedObservable;
    return this;
  }

  lift<R>(operator: Operator<T, R>): CacheableObservable<R> {
    const obs = new CacheableObservable<any>(this.uncachedObservable, this);
    obs.operator = operator;
    return obs;
  }
}
