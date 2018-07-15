import { Component, OnInit } from '@angular/core';
import { ReservationForm } from './reservation-form.class';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {

  model: ReservationForm  = {
    phone: '',
    email: '',
    noOfGuests: 0,
    startDate: new Date(),
    endDate: new Date(),
    comments: '',
  };
  constructor(private http: HttpClient) {  }

  ngOnInit() {
  }
  onReset(reservationForm) {
    reservationForm.reset();
  }
  onSubmit(reservationForm) { 
    this.createReservation().subscribe(res => {
      console.log(res);
      reservationForm.reset();
    }, err => {
      console.log(err);
    });
  }
  createReservation (): Observable<ReservationForm[]> {
        const createUrl = 'http://localhost:3000/reservation/'; 
        return this.http.post<any>(createUrl, this.model);
      }
}
