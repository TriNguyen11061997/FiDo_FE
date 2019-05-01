import { Injectable } from '@angular/core';
import { Patient } from '@app/_models/patient.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Employee } from '@app/_models/employee.model';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }


  getAllObject() {
    return this.http.get(environment.apiUrl + '/employees');
  }
  getObjectByID(id: number): Observable<Employee> {
    return this.http.get<Employee>(environment.apiUrl + '/employees/' + id);
  }
  update(employee: Employee) {
    return this.http.put(`${environment.apiUrl}/employees/${employee.id}`, employee);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/employees/${id}`);
  }

  add(patient: Patient) {
    return this.http.post(environment.apiUrl + "/employees", patient);
  }
}
