import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPapers'
})
export class FilterPapersPipe implements PipeTransform {

  transform(papers: any[], filter: string): any[] {

    if (filter.length < 2) {
      return papers;
    } else {
      const tokens = filter.toLowerCase().replace('(', '').replace(')', '').split(' ');
      const text = tokens.shift();
      const operator = tokens.shift();

      if (operator == 'and') {
        return this.transform(papers.filter(paper => paper.title.toLowerCase().includes(text)), tokens.join(' '));
      } else if (operator == 'or') {
        const a = papers.filter(paper => paper.title.toLowerCase().includes(text));
        const b = this.transform(papers, tokens.join(' '));
        const combined = a.concat(b);
        return combined.filter((paper, index) => combined.indexOf(paper) == index)
      } else {
        return papers.filter(paper => paper.title.toLowerCase().includes(text));
      }
    
    }
  }

}
