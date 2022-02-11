import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AddEmployeeComponent} from './components/add-employee/add-employee.component';
import {RestApiService} from './services/rest-api.service';
import {ListEmployeeComponent} from './components/list-employee/list-employee.component';
import {UpdateEmployeeComponent} from './components/update-employee/update-employee.component';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProjectAddComponent} from './components/project-add/project-add.component';
import {ModalAddUserComponent} from './components/modal-add-user/modal-add-user.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {MessagesService} from "./services/messages.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {NgxMaskModule, IConfig} from "ngx-mask";


export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    AppComponent,
    AddEmployeeComponent,
    ListEmployeeComponent,
    UpdateEmployeeComponent,
    ProjectAddComponent,
    ModalAddUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule, NgxPaginationModule, BrowserAnimationsModule, NgxMaskModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [RestApiService, MessagesService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
