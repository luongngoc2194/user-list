import {
  Component, ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {RestApiService} from '../../services/rest-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from "ngx-toastr";
import {templateJitUrl} from "@angular/compiler";
import {Observable} from "rxjs";

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit, OnChanges {
  @Input() id!: number;
  @Input() random!: number;
  @Output() onReload = new EventEmitter();
  @ViewChild('updateUserModal') view!: TemplateRef<any>;

  updateForm!: FormGroup;
  closeResult!: string;

  constructor(
    private rest: RestApiService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService,
  ) {
    // tao moi 1 FormGroup
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^(0)[0-9]{9}$')]],
      zone: ['', Validators.required],
      status: ['', Validators.required],
    });

  }

  ngOnInit() {
  }

  setValueForForm() {
    this.rest.getOneUser(this.id).subscribe((data) => {
      // patch gia tri hien len giao dien cho form
      this.updateForm.patchValue({
        // name: data.name,
        email: data.email,
        phone: data.phone,
        zone: data.zone,
        status: data.status,
      });
      // patch gia tri cho 1 truong
      this.updateForm.get('name')?.patchValue(data.name);
    });
  }

  putUser() {
  }

  onSubmit() {
    this.rest.putUser(this.id, this.updateForm.value).subscribe((data) => {
      this.onReload.emit("ok");
      this.toastr.success('Success!', "Update user is success");
    }, error => {
      this.toastr.error("Error!", "An error occurred!")
    });
  }


  open(content: TemplateRef<any>) {
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

  ngOnChanges(changes: SimpleChanges): void {

    for (let propName in changes) {

      if (propName === 'random') {
        let change = changes[propName];
        if (!change.firstChange) {
          this.setValueForForm();
          this.open(this.view);
        }
      }
    }
  }
}
