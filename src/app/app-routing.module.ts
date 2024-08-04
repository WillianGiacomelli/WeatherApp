import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './pages/component/weather-component/weather-component.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'weather',
  },
  {
    path: 'weather',
    component: WeatherComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
