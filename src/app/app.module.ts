import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeatherComponent } from './pages/component/weather-component/weather-component.component';
import { SearchComponent } from './pages/components/search-component/search.component';
import { WeatherCardComponent } from './features/components/weather-card/weather-card.component';
import { InformationsComponent } from './pages/components/informations/informations.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    WeatherCardComponent,
    SearchComponent,
    InformationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
