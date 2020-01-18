import {CacheableObservable} from './cacheable-observable.model';

export function cache(key: string) {
  return function (source) {
    return CacheableObservable.create(source, key);
  };
}
