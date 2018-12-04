import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {SymptomsComponent} from './components/symptoms/symptoms.component';
import {HttpService} from './services/http.service';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    SymptomsComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
