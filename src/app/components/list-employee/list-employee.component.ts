import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {RestApiService} from '../../services/rest-api.service';
import {Employee} from '../../models/employee';
import {Router, ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ToastrService} from "ngx-toastr";
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
})
export class ListEmployeeComponent implements OnInit {

  searchForm!: FormGroup;

  totalLength: any;
  page: number = 1;
  perPage: number = 6;

  employees!: Employee[];
  id!: number;
  random!: number;


  constructor(
    private rest: RestApiService,
    private router: Router,
    public modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.rest.getUser()
      .subscribe((data: Employee[]) => {
        this.employees = data;
        this.totalLength = data.length;
      }, error => {
        console.log("1");
      });

    this.searchForm = this.fb.group({
      name: [''],
      email: [''],
      phone: ['']

    })
  }

  delete(id: number) {
    console.log(1);
    this.rest.deleteUser(id).subscribe((data) => {
      this.ngOnInit();
      this.toastr.success('Success!', "Deleted user is success");
    }, error => {
      this.toastr.error("Error!", "An error occurred!")
    });
  }

  goSearchForm() {
    delay(20000);
    this.rest.searchForm(this.searchForm.value).subscribe((data => {
      console.log(data);

      this.employees = data;
      this.totalLength = data.length;

    }))
  }

  getId(id: number) {
    this.id = id;
    this.random = Math.random();
    console.log(this.random);
  }


  reload(acc: string) {
    this.ngOnInit();

  }
}
