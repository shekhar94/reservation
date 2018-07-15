import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ReservationForm } from '../reservation-form/reservation-form.class';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  reservation: ReservationForm = {
    phone: '',
    email: '',
    noOfGuests: 0,
    startDate: new Date(),
    endDate: new Date(),
    comments: '',
  };
  resId: string;
  constructor( private route: ActivatedRoute,
    private router: Router, private http: HttpClient) { }

  ngOnInit() {
    const id = this.route.snapshot.url[1].path;
    this.getReservationById(id).subscribe(res => {
      this.reservation = res;
      this.resId = id;
      console.log(res);
    }, err => {
      console.log(err);
    });
    console.log('Data via params: ', id);
  }
  onReset(reservationForm) {
    reservationForm.reset();
  }
  updateReservation (): Observable<ReservationForm[]> {
    const createUrl = 'http://localhost:3000/reservation/' + this.resId; 
    return this.http.put<any>(createUrl, this.reservation);
  }
  onSubmit(reservationForm) { 
    this.updateReservation().subscribe(res => {
      console.log(res);
      reservationForm.reset();
    }, err => {
      console.log(err);
    });
  }
  getReservationById (id): Observable<ReservationForm> {
    const getUrl = 'http://localhost:3000/reservation/' + id; 
    return this.http.get<any>(getUrl);
  }
}
