import { Component, OnInit } from '@angular/core';
import { DoctorService } from '@app/_services/doctor.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Doctor } from '@app/_models/doctor.model';

@Component({
  selector: 'app-public-doctor-detail',
  templateUrl: './public-doctor-detail.component.html',
  styleUrls: ['./public-doctor-detail.component.css']
})
export class PublicDoctorDetailComponent implements OnInit {
  doctor : Doctor;
  rate :number;
  constructor(
    private doctorService: DoctorService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getDoctorDetails(this.route.snapshot.params['id']);
  }

  getDoctorDetails(id: number) {
    this.doctorService.getObjectByID(id).subscribe(
      data => {
        this.doctor = data["data"];
        this.rate = 2.5;
      },
      (err) => {

      }
    )
  }

}
