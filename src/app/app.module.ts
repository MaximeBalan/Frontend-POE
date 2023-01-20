import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StagiairesModule } from './stagiaires/stagiaires.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './surveys/list/list.component';
import { UpdateComponent } from './surveys/update/update.component';



@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,
    ListComponent,
    UpdateComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StagiairesModule,
    BrowserAnimationsModule,
    SharedModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
