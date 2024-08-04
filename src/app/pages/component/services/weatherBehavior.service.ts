import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherBehaviorService {
  private city$: Subject<string> = new Subject<string>();
  private cityInfo$: Subject<any> = new Subject<any>();
  private isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public setIsLoading(isLoading: boolean): void {
    this.isLoading$.next(isLoading);
  }

  public getIsLoading(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  public setCity(city: string): void {
    this.city$.next(city);
  }

  public getCity(): Subject<string> {
    return this.city$;
  }

  public setCityInfo(cityInfo: any): void {
    this.cityInfo$.next(cityInfo);
  }

  public getCityInfo(): Subject<any> {
    return this.cityInfo$;
  }
  constructor() { }

}
