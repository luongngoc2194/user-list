import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-eproject';
  subject = new Subject();
  behivaorSubject = new BehaviorSubject('abc');

  ngOnInit(): void {
    this.behivaorSubject.subscribe(value => {
      console.log('subject: ', value);
    });
  }

  click() {
    const value = this.behivaorSubject.getValue();
    console.log(value);
  }

  click2() {
    this.behivaorSubject.next('555')
  }
}
