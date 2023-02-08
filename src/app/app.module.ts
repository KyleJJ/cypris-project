import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ScholarService } from './services/scholar.service';
import { FilterPapersPipe } from './pipes/filter-papers.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FilterPapersPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ScholarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
