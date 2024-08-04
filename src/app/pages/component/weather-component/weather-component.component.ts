import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../../core/services/weather.service';
import { Subject, takeUntil } from 'rxjs';
import { WeatherData } from '../../../core/models/weatherData';

@Component({
  selector: 'app-weather-component',
  templateUrl: './weather-component.component.html',
  styleUrl: './weather-component.component.scss',
})
export class WeatherComponent implements OnInit, OnDestroy {
  public city: string = "";
  public unsubscribe$: Subject<boolean> = new Subject<boolean>();
  public cityWeather!: WeatherData;
  constructor(private weatherService: WeatherService) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    // this.getWeather('Londrina');
  }



  public getWeather(city: string): void {
    this.weatherService.getWeather(city)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: (response: any) => {
        if(response){
          this.cityWeather = response;
          console.log(this.cityWeather);
        }
      },
      complete: () => {},
      error: (error: any) => {
        console.error(error);
      },
    });
  }
}
