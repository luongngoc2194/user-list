import {Component, OnInit, TemplateRef} from '@angular/core';
import {Employee} from '../../models/employee';
import {RestApiService} from '../../services/rest-api.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {

  name!: string;
  employee: Employee = new Employee();

  constructor(
    private rest: RestApiService,
    private router: Router,
    private fb: FormBuilder
  ) {
  }

  addForm!: FormGroup;

  ngOnInit() {
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: [, [Validators.required, Validators.pattern('^((\\84-?)|0)?[0-9]{9}$')]],
      zone: ['East', Validators.required],
      status: ['Working', Validators.required],
    });
  }

  createUser() {
    this.rest.createUser(this.addForm.value).subscribe((data) => {

    });
  }

  onSubmit() {
    this.createUser();
  }


}
