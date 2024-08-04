import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-component',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public city: string = "";

  constructor() { }

  ngOnInit() {
  }

  public submitForm(): void {
    this.city = "";
  }

}