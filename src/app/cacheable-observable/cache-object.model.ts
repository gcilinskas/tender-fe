import {Observable, Subject} from 'rxjs';
import {shareReplay, switchMap} from 'rxjs/operators';

export class CacheObject {
  private running = true;
  private response: Observable<any>;
  private subject: Subject<number> = new Subject<number>();
  private observable: Observable<any>;
  private called = false;
  private count = 0;

  constructor(
    private key: string,
    private request: Observable<any>) {
    this.setRequest(request);
  }

  getKey(): string {
    return this.key;
  }

  setResponse(response: any): CacheObject {
    this.response = response;
    this.running = false;
    return this;
  }

  getResponse(): any {
    return this.response;
  }

  setRequest(request: Observable<any>): CacheObject {
    this.request = request;
    this.running = true;
    this.observable = this.subject.pipe(
      switchMap(() => this.request),
      shareReplay(1)
    );
    return this;
  }

  getRequest(): Observable<any> {
    return this.request;
  }

  isRunning(): boolean {
    return this.running;
  }

  getObservable(): Observable<any> {
    return this.observable;
  }

  forceCall() {
    this.called = true;
    this.count++;
    this.subject.next(this.count);
  }

  call() {
    if (!this.called) {
      this.forceCall();
    }
  }
}
