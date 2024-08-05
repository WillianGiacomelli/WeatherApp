import { WeatherBehaviorService } from './../services/weatherBehavior.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../../core/services/weather.service';
import { Subject, take, takeUntil } from 'rxjs';
import { WeatherData } from '../../../core/models/weatherData';

@Component({
  selector: 'app-weather-component',
  templateUrl: './weather-component.component.html',
  styleUrl: './weather-component.component.scss',
})
export class WeatherComponent implements OnInit, OnDestroy {
  public city: string = "Campinas";
  public unsubscribe$: Subject<boolean> = new Subject<boolean>();
  public cityWeather!: WeatherData;

  constructor(
    private weatherService: WeatherService,
    public weatherBehaviorService: WeatherBehaviorService
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.getWeather();

    this.weatherBehaviorService.getCity()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: (city: string) => {
        this.city = city;
        this.getWeather();
      },
      complete: () => {},
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  public getWeather(): void {
    this.weatherBehaviorService.setIsLoading(true);

    this.weatherService.getWeather(this.city)
    .pipe(
      takeUntil(this.unsubscribe$),
      take(1)
    )
    .subscribe({
      next: (response: any) => {
        if(response){
          this.weatherBehaviorService.setCityInfo(response);
          this.weatherBehaviorService.setIsLoading(false);
        }
      },
      complete: () => {
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
}
