import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatGridListModule, MatInputModule } from '@angular/material';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { PhotoService } from './photo.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatGridListModule,
    MatInputModule,
    NoopAnimationsModule
  ],
  providers: [PhotoService],
  bootstrap: [AppComponent]
})

export class AppModule { }
