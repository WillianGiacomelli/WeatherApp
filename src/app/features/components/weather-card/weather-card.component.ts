import { Component, Input, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {
  @Input() titleDescription?: string;
  @Input() value?: any;
  @Input() weight?: any;

  constructor() { }

  ngOnInit() {
  }

  public getTypeOf(value: any): any{
    return typeof value;
  }
}
