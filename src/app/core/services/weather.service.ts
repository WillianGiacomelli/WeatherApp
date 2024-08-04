import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherApi } from '../variables/WeatherApi';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  public weatherApiURL: string = WeatherApi.apiURL;
  public weatherApiKey: string = WeatherApi.apiKey;

  constructor(private http: HttpClient) {}

  public getWeather(city: string): any {
    return this.http.get(
      `
      ${this.weatherApiURL}q=${city}&units=metric&mode=json&appid=${this.weatherApiKey}`,
      { responseType: 'json' }
    );
  }
}
