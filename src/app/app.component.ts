import { Component } from '@angular/core';
import { ScholarService } from './services/scholar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // API fields
  query: string = '';
  limit: number = 10;
  page = 0;

  // Filter results client side
  filter: string = '';

  // Control UI
  showFields = false;
  showFilter = false;
  showChart = false;

  // Utility variables
  math = Math;

  constructor(
    public scholarService: ScholarService
  ) {}

  search() {
    this.showFields = false;
    this.showFilter = false;
    this.showChart = false;
    this.filter = '';
    this.page = 0;
    this.scholarService.getPapers(this.query, this.limit, this.page);
  }

  next() {
    this.page++;
    this.scholarService.getPapers(this.query, this.limit, this.page);
  }

  back() {
    this.page--;
    this.scholarService.getPapers(this.query, this.limit, this.page);
  }



}
