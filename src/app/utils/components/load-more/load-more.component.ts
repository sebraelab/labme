import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { takeUntil, filter, map, distinctUntilChanged } from 'rxjs/operators';

export interface ScrolledEvent {
  current: number;
  max: number;
}

@Component({
  selector: 'load-more',
  templateUrl: './load-more.component.html',
  styleUrls: ['./load-more.component.scss']
})
export class LoadMoreComponent implements AfterViewInit, OnDestroy {
  @Input() loading = false;
  @Input() loadMoreWhenMissing = 50;
  @Input() loadingMore = false;
  @Output() load = new EventEmitter();
  @ViewChild('scroller') scroller: ElementRef;
  scrolled$: Observable<ScrolledEvent>;
  loadMore$: Observable<any>;
  destroyed$ = new Subject();

  ngAfterViewInit() {
    // handle primary scroll event
    this.scrolled$ = fromEvent(this.scroller.nativeElement, 'scroll').pipe(
      map((event: any) => ({
        current: event.target.scrollTop,
        max: event.target.scrollHeight - event.target.clientHeight
      }))
    );
    // dispatched when have to load
    this.loadMore$ = this.scrolled$.pipe(
      distinctUntilChanged((prev: ScrolledEvent, curr: ScrolledEvent) => {
        return this.eventIsLoading(prev) === this.eventIsLoading(curr);
      }),
      filter(event => {
        return !this.loadingMore && this.eventIsLoading(event);
      })
    );
    // output when have to load more
    this.loadMore$.pipe(takeUntil(this.destroyed$)).subscribe(event => {
      this.load.next(event);
    });
  }

  eventIsLoading(event: ScrolledEvent) {
    return event.max - this.loadMoreWhenMissing < event.current;
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
