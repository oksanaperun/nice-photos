import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SearchModule } from './search';
import { AppService } from './app.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SearchModule,
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})

export class AppModule { }
