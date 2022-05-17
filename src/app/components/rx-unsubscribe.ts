import { ChangeDetectionStrategy, Component, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Component({
  selector: "stt-unsubscribe",
  template: "",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export abstract class RxUnsubscribeComponent implements OnDestroy {
  private _destroy$: Subject<void> = new Subject();
  destroy$ = this._destroy$.asObservable();

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
