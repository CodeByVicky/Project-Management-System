import { Component } from '@angular/core';
import { Customer } from '../../model/customer.model';
import { CustomersService } from '../../services/customers.service';
import { Router } from '@angular/router'; // Import Router from '@angular/router'

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {

  location = [
   
    { id: 2, name: "Mumbai" },
    { id: 3, name: "Delhi" },
    { id: 4, name: "Bangalore" },
    { id: 5, name: "Hyderabad" },
    { id: 6, name: "Chennai" },
    { id: 7, name: "Kolkata" },
    { id: 8, name: "Ahmedabad" },
    { id: 9, name: "Jaipur" },
    { id: 10, name: "Lucknow" },
   
  ];
  

  reason = [
   
    {id :2, name: "Personal"},
    {id :3, name: "Dealership"},
    {id :4, name: "Transport"}

  ];


  priority = [
   
    {id :2, name: "Medium"},
    {id :3, name: "Low"}
   
  ];

  category = [
   
    {id :2, name: "Quality-B"},
    {id :3, name: "Quality-C"},
    {id :4, name: "Quality-D"},
  ];

   department = [
   
    {id :2, name: "HR"},
    {id :3, name: "Maintenance"},
    {id :4, name: "Quality"},
    {id :4, name: "Finance"},
    {id :4, name: "Storage"}

   ];

   division = [
    {id :1, name: "Compressor"},
    {id :2, name: "Pumps"},
    {id :3, name: "Glass"},
    {id :4, name: "Water Heater"}
   ];

   type = [
    {id : 1, name: "External"},
    {id : 2, name: "Vendor"}
   ];
















  addCustomerRequest: Customer = {
    project_Name: '',
    reason: '',
    type: '',
    division: '',
    category: '',
    priority: '',
    department: '',
    start_Date: '',
    end_Date: '',
    location: '',
    status: ''
  };

  

  constructor(private customerService: CustomersService, private router: Router) {}

  addCustomer() {
    this.customerService.addCustomer(this.addCustomerRequest)
    .subscribe({
      next : (customer)=>{
        this.router.navigate(['project-listing']);
      }
    });
      
  
  }
}
