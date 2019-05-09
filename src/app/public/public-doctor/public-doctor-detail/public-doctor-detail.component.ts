import { Component, OnInit } from '@angular/core';
import { DoctorService } from '@app/_services/doctor.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Doctor } from '@app/_models/doctor.model';

import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/_services';

import { Users } from '@app/_models/users.model';
import { ToastrService } from 'ngx-toastr';
import { Rating } from '@app/_models/rating.model';
import { RatingService } from '@app/_services/rating.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-public-doctor-detail',
  templateUrl: './public-doctor-detail.component.html',
  styleUrls: ['./public-doctor-detail.component.css']
})
export class PublicDoctorDetailComponent implements OnInit {
  currentUser: Users;
  loadReview: boolean = false;
  doctor: Doctor = null;
  ratingForm: FormGroup;
  rate: number;
  ratings: Rating[];
  id: number;
  rating: Rating;
  loadDetail: boolean = true;
  loadRating: boolean = false;
  constructor(
    private doctorService: DoctorService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authorService: AuthenticationService,
    private ratingService: RatingService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.authorService.currentUser.subscribe(x => this.currentUser = x);
  }
  ngOnInit() {
    if (this.currentUser != null) {
      this.loadReview = true;
    }
    this.spinner.show()
    this.doctorService.getObjectByID(this.route.snapshot.params['id']).subscribe(
      data => {
        this.spinner.hide()
        this.doctor = data as Doctor;
        this.id = this.doctor.id;
        this.rate = Math.round(this.doctor.rating);
        if (data["review"] != null) {
          this.ratings = data["review"];
        }
      },
      (err) => {
      }
    )
    this.ratingForm = this.formBuilder.group({
      doctor_id: [null],
      review: [null, Validators],
      star: [null]
    })
  }

  getDoctorDetails(id: number) {
    this.doctorService.getObjectByID(id).subscribe(
      data => {
        this.doctor = data as Doctor;
        this.id = this.doctor.id;
        this.rate = Math.round(this.doctor.rating);
        if (data["review"] != null) {
          this.ratings = data["review"];
        }
      },
      (err) => {
      }
    )
  }
  ShowDetail() {
    this.loadDetail = true;
    this.loadRating = false;
  }

  ShowRating() {
    this.loadDetail = false;
    this.loadRating = true;
  }

  onSubmit() {
    this.rating = this.ratingForm.value;
    this.rating.patient_id = this.currentUser.usable_id;
    this.rating.doctor_id = this.id;
    this.spinner.show()
    this.ratingService.add(this.rating).subscribe(
      data => {
        this.spinner.hide()
        this.toastr.show("Cám ơn bạn đã gửi nhận xét!");
        this.ratingService.getObjectByDoctorID(this.id).subscribe(
          rates => {
            this.ratings = rates as Rating[]
          }
        )
        this.resetRating();
      }, (err) => { this.toastr.error(err) }
    )
  }

  resetRating() {
    this.ratingForm.patchValue({
      review : null,
      star : null,
    })
  }

}
