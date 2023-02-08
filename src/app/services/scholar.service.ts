import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScholarService {

  private API_URL = 'https://api.semanticscholar.org/graph/v1/paper/search?fields=title,authors,abstract&query=';

  public loading = false;

  public papers: Paper[] = [];
  public total = 0;

  public chart: Chart = { max: 0, words: {} };

  constructor(
    private http: HttpClient
  ) { 
  }

  /**
   * Load data from API and count aggregate data for chart
   * 
   * @param query Search string
   * @param limit Number of results
   * @param page Offset results
   */
  getPapers(query: string, limit: number, page: number) {

    this.loading = true;

    let url = this.API_URL + query + '&limit=' + limit + '&offset=' + limit * page;

    this.http.get<any>(url).subscribe(res => {

      this.papers = res.data;
      this.total = res.total;

      // Count aggregate appearances of search terms for chart
      const words = query.indexOf(' ') == -1 ? [query] : query.split(' ');
      this.papers.forEach(paper => {
        words.forEach(word => {
          const countAbstract = paper.abstract ? (paper.abstract.match(new RegExp(word, 'ig')) || []).length : 0;
          const countTitle = (paper.title.match(new RegExp(word, 'ig')) || []).length;
          if (this.chart.words[word]) {
            this.chart.words[word] = this.chart.words[word] + countAbstract + countTitle;
          } else {
            this.chart.words[word] = countAbstract + countTitle;
          }
          if (this.chart.words[word] > this.chart.max) {
            this.chart.max = this.chart.words[word];
          }
        })
      });

      this.loading = false;
    });
  }
}

interface Paper {
  paperId: string,
  title: string,
  abstract: string,
  authors: any[],
}

interface Chart {
  max: number,
  words: any
}
