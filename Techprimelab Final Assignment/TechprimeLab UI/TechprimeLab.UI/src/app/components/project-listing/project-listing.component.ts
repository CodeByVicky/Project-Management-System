import { Component, OnInit } from '@angular/core';
import { Customer } from '../../model/customer.model';
import { CustomersService } from '../../services/customers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-listing',
  templateUrl: './project-listing.component.html',
  styleUrls: ['./project-listing.component.css']
})
export class ProjectListingComponent implements OnInit {
  customers: Customer[] = [];
  p: any = 0;
  searchText: any;

  Sort = [
    { id: 2, name: 'Reason' },
    { id: 3, name: 'Type' },
    { id: 4, name: 'Division' },
    { id: 5, name: 'Category' },
    { id: 6, name: 'Department' },
    { id: 7, name: 'Location' }
  ];

  selectedSortCriterion: string = '';

  buttonPrimaryClass = 'btn btn-primary btn-sm';
  buttonOutlineClass = 'btn btn-outline-primary btn-sm';

  constructor(
    private customersService: CustomersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchCustomersData();
  }

  fetchCustomersData(): void {
    this.customersService.getAllCustomers().subscribe(
      (data) => {
        this.customers = data;
      },
      (error) => {
        console.error('Error fetching customers:', error);
      }
    );
  }

  get filteredCustomers(): any[] {
    let filteredData = [...this.customers];

    if (this.searchText && this.searchText.trim() !== '') {
      filteredData = filteredData.filter((customer) =>
        customer.project_Name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    switch (this.selectedSortCriterion) {
      case 'Reason':
        filteredData = filteredData.sort((a, b) => (a.reason > b.reason ? 1 : -1));
        break;
      case 'Type':
        filteredData = filteredData.sort((a, b) => (a.type > b.type ? 1 : -1));
        break;
      case 'Division':
        filteredData = filteredData.sort((a, b) => (a.division > b.division ? 1 : -1));
        break;
      case 'Category':
        filteredData = filteredData.sort((a, b) => (a.category > b.category ? 1 : -1));
        break;
      case 'Department':
        filteredData = filteredData.sort((a, b) => (a.department > b.department ? 1 : -1));
        break;
      case 'Location':
        filteredData = filteredData.sort((a, b) => (a.location > b.location ? 1 : -1));
        break;
      default:
        break;
    }

    return filteredData;
  }

  updateProjectStatus(projectName: string, status: string, buttonType: string): void {
    this.customersService.updateProjectStatus(projectName, status).subscribe(
      () => {
        switch (buttonType) {
          case 'start':
            this.buttonPrimaryClass = 'btn btn-outline-primary';
            break;
          case 'close':
            // Update button classes or states for 'close'
            break;
          case 'cancel':
            // Update button classes or states for 'cancel'
            break;
          default:
            break;
        }
        this.fetchCustomersData();
      },
      (error) => {
        console.error(`Error updating project status (${status}) for ${projectName}:`, error);
      }
    );
  }

  onSortSelect(event: any) {
    this.selectedSortCriterion = event.target.value;
  }
}
