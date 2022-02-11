import {Component, EventEmitter, OnInit, Output, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RestApiService} from 'src/app/services/rest-api.service';
import {Employee} from '../../models/employee';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-modal-add-user',
  templateUrl: './modal-add-user.component.html',
  styleUrls: ['./modal-add-user.component.css']
})
export class ModalAddUserComponent implements OnInit {
  @Output() onReload = new EventEmitter();
  employee: Employee = new Employee();

  closeResult!: string;

  constructor(private modalService: NgbModal, private rest: RestApiService,
              private router: Router, private toastr: ToastrService,
              private fb: FormBuilder) {
    this.addForm = fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^(0)[0-9]{9}$')]],
      zone: ['East', Validators.required],
      status: ['Working', Validators.required],
    });
  }

  addForm!: FormGroup;

  ngOnInit() {

  }

  // MoveListUser() {
  //   this.router.navigate(['/employee']);
  // }

  checkEmail() {
  }


  createUser() {
    this.rest.createUser(this.addForm.value).subscribe((data) => {
      // this.MoveListUser();
      this.onReload.emit();
      this.toastr.success('Success!', "Add user is success");
    }, error => {
      this.toastr.error("Error!", "An error occurred!")
    });
  }

  onSubmit() {
    this.createUser();
    this.onReload.emit()
  }


  open(content: TemplateRef<any>) {
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^(0)[0-9]{9}$')]],
      zone: ['East', Validators.required],
      status: ['Working', Validators.required],
    });
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
