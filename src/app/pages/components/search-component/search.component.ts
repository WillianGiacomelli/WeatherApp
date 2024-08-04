import { Component, OnDestroy, OnInit, WritableSignal } from '@angular/core';
import { WeatherBehaviorService } from '../../component/services/weatherBehavior.service';
import { Subject, take, takeUntil } from 'rxjs';
import { WeatherData } from '../../../core/models/weatherData';

@Component({
  selector: 'app-search-component',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  public unsubscribe$: Subject<boolean> = new Subject<boolean>();
  public cityWeatherInfo: WeatherData | undefined;
  public city: string = "";
  public day: Date = new Date();
  public isLoading: boolean = true;

  constructor(protected weatherService: WeatherBehaviorService) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  ngOnInit() {
    console.log(this.isLoading)
    this.weatherService.getCityInfo()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: (cityInfo: any) => {
        if(cityInfo){
          this.cityWeatherInfo = cityInfo;
        }
      },
      complete: () => {},
      error: (error: any) => {
        console.error(error);
      },
    });

    this.weatherService.getIsLoading()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: (loading: boolean) => {
        if(loading){
          this.isLoading = loading;
          console.log(this.isLoading)
        }
      },
    });
  }

  public submitForm(): void {
    this.weatherService.setCity(this.city);
  }

  public getDayOfTheYear(): string {
    let dayFormatted = this.day.getDate() + "/" + (this.day.getMonth() + 1) + "/" + this.day.getFullYear();
    return dayFormatted;
  }

  public getDay(): string {
    const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

    // Obtém o dia da semana (0 = Domingo, 1 = Segunda, ..., 6 = Sábado)
    const dayOfWeek = daysOfWeek[this.day.getDay()];

    // Formata o horário no formato HH:mm
    const hours = String(this.day.getHours()).padStart(2, '0');
    const minutes = String(this.day.getMinutes()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;

    // Retorna a data e hora formatadas
    return `${dayOfWeek}, ${formattedTime}`;
  }
}
