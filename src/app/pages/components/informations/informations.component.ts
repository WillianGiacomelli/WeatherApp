import { Subject, takeUntil } from 'rxjs';
import { WeatherData } from '../../../core/models/weatherData';
import { WeatherBehaviorService } from './../../component/services/weatherBehavior.service';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.scss']
})
export class InformationsComponent implements OnInit, OnDestroy {
  public cityWeatherInfo: WeatherData | undefined;
  public unsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(protected weatherBehaviorService: WeatherBehaviorService) { }


  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete()
  }

  ngOnInit() {
    this.weatherBehaviorService.getCityInfo()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: (cityInfo: WeatherData) =>{
        if(!!cityInfo){
          this.cityWeatherInfo = cityInfo;
        }
      }
    })
  }

  public getSunrise(value: number): string {
    const sunriseDate = new Date(value * 1000);
    const sunriseTimeString = sunriseDate.toLocaleTimeString();
    const [horas, minutos] = sunriseTimeString.split(':');
    return `${horas}:${minutos}`;
  }

}
