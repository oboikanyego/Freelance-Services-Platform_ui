import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Loading  {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private startTime: number | null = null;
  private readonly minVisibleTime = 1000; // Minimum 1s loader display

  setLoading(isLoading: boolean) {
    this.loadingSubject.next(false);
    // if (isLoading) {
    //   this.startTime = Date.now();
    //   this.loadingSubject.next(true);
    // } else {
    //   const elapsed = Date.now() - (this.startTime ?? 0);
    //   const remaining = this.minVisibleTime - elapsed;

    //   if (remaining > 0) {
    //     setTimeout(() => this.loadingSubject.next(false), remaining);
    //   } else {
    //     this.loadingSubject.next(false);
    //   }
    //   this.startTime = null;
    // }
  }
}
