import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer.model';
import { Authentication } from '../model/authentication.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  baseApiUrl : string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getAllCustomers():Observable<Customer[]>{
    return this.http.get<Customer[]>(this.baseApiUrl + '/api/Customers')
  }

  addCustomer(addCustomerRequest: Customer): Observable<Customer> {

    addCustomerRequest.status = 'Registered';
  
    if (!addCustomerRequest.location || addCustomerRequest.location.trim() == '') {
      addCustomerRequest.location = 'Pune';
    }

    if (!addCustomerRequest.reason || addCustomerRequest.reason.trim() == '') {
      addCustomerRequest.reason = 'Business';
    }
  

    if (!addCustomerRequest.category || addCustomerRequest.category.trim() == '') {
      addCustomerRequest.category = 'Quality-A';
    }

    if (!addCustomerRequest.department || addCustomerRequest.department.trim() == '') {
      addCustomerRequest.department = 'Strategy';
    }

    if (!addCustomerRequest.type || addCustomerRequest.type.trim() == '') {
      addCustomerRequest.type = 'Internal';
    }

    if (!addCustomerRequest.division || addCustomerRequest.division.trim() == '') {
      addCustomerRequest.division = 'Filter';
    }

    if (!addCustomerRequest.priority || addCustomerRequest.priority.trim() == '') {
      addCustomerRequest.priority = 'High';
    }


    return this.http.post<Customer>(this.baseApiUrl + '/api/Customers', addCustomerRequest);
  }
  
  updateProjectStatus(projectName: string, status: string): Observable<any> {
    const statusUpdate = { Status: status }; // Assuming your status update payload matches this structure
    const url = `${this.baseApiUrl + '/api/Customers/Update'}?projectName=${projectName}`;
    return this.http.put<any>(url, statusUpdate);
  }
  

}
