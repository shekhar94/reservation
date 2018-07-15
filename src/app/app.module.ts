import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { RouterModule, Routes } from '@angular/router';
import { UpdateComponent } from './update/update.component';

const appRoutes: Routes = [
  { path: 'list', component: ReservationListComponent },
  { path: 'form', component: ReservationFormComponent },
  { path: '', component: ReservationFormComponent },
  { path: 'update/:id', component: UpdateComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ReservationFormComponent,
    ReservationListComponent,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
