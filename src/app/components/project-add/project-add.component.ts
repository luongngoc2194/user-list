import {Component, OnInit, TemplateRef, Input, Output, EventEmitter, ViewChild, SimpleChanges} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {
  @Input() id!: number;
  @Output() onDelete = new EventEmitter();
  // @ViewChild('content') view!: TemplateRef<any>;

  closeResult!: string;

  constructor(private modalService: NgbModal) {
  }

  getDelete() {
    this.onDelete.emit(this.id)
  }

  ngOnInit() {
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

  // ngOnChanges(changes: SimpleChanges): void {
  //   for (let propName in changes) {
  //     let change = changes[propName];
  //     if (!change.firstChange) {
  //       this.open(this.view);
  //     }
  //   }
  // }
}
