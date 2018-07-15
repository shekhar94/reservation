import { Component, OnInit } from '@angular/core';
import { ReservationForm } from '../reservation-form/reservation-form.class';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';


@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {
  allReservations: ReservationForm[];
  constructor(private http: HttpClient, public router: Router) { }

  ngOnInit() {
    this.onSync();
  }
  onUpdate(id) {
    this.router.navigate(['/update', id]);
    // const putUrl = `http://localhost:3000/reservation/${id}`; 
    // return this.http.put<any>(putUrl);
  }
  onDelete(id) {
    const deleteUrl = `http://localhost:3000/reservation/${id}`; 
    this.http.delete<any>(deleteUrl).subscribe(res => {
      console.log(res);
      this.onSync();
    }, err => {
      console.log(err);
    });
  }
  onFilter(startDate, endDate) {
    const sDate = new Date(startDate);
    const eDate = new Date(endDate);
    const tempArr = this.allReservations.slice();
    this.allReservations = tempArr.filter(reservation => {
      const resSDate = new Date(reservation.startDate);
      const resEDate = new Date(reservation.endDate);
      if (resSDate >= sDate && resEDate <= eDate) {
        return true;
      } else  {
        return false;
      }
    });
  }
  onSync(): void {
    this.getReservations().subscribe(res => {
      this.allReservations = res;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  getReservations (): Observable<ReservationForm[]> {
    const getUrl = 'http://localhost:3000/reservation/'; 
    return this.http.get<any>(getUrl);
  }
}
