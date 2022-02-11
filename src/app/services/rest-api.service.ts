import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Employee, ParamSearch} from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  private getLink = 'http://localhost:8081/users';
  private postLink = 'http://localhost:8081/create_users';
  private putLink = 'http://localhost:8081/update_user';
  private deleteLink = 'http://localhost:8081/delete_user';
  private searchLink = 'http://localhost:8081/search';

  constructor(private http: HttpClient) {
  }


  getUser(): Observable<any> {
    return this.http.get<Employee[]>(`${this.getLink} `);
  }

  getOneUser(id: Number): Observable<any> {
    return this.http.get<Employee[]>(`${this.getLink}/${id}`);
  }

  putUser(id: Number, employee: Employee): Observable<any> {
    return this.http.put<Employee[]>(`${this.putLink}/${id}`, employee);
  }

  createUser(employee: Employee): Observable<any> {
    return this.http.post(`${this.postLink}`, employee);
  }

  deleteUser(id: Number): Observable<any> {
    return this.http.delete(`${this.deleteLink}/${id}`);
  }

  // searchForm(param: ParamSearch): Observable<any> {
  //   let params = new HttpParams();
  //   params = params.append('name', param.name ? param.name.toString() : '');
  //   params = params.append('email', param.email ? param.email.toString() : '');
  //   params = params.append('phone', param.phone ? param.phone.toString() : '');
  //   console.log(params)
  //   return this.http.get<Employee[]>(`${this.searchLink}`+ { params })

  // }

  searchForm(param: ParamSearch): Observable<any> {

    return this.http.get<Employee[]>(`http://localhost:8081/searchparam2?name=${param.name}&email=${param.email}&phone=${param.phone}`)

  }


  // search(param: ParamSearch): Observable<any> {
  //   let params = new HttpParams();
  //   params = params.append('name', param.name ? param.name.toString() : '');
  //   params = params.append('email', param.email ? param.email.toString() : '');
  //   params = params.append('zone', param.zone ? param.zone.toString() : '');
  //   params = params.append('phone', param.phone ? param.phone.toString() : '');
  //   params = params.append('status', param.status ? param.status.toString() : '');
  //   return this.http.get<Employee[]>(`${this.getLink}`, {
  //     params,
  //   });
  // }
}

