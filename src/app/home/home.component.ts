import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AccountService } from '../services/account.service';

import { User } from '../model/user';
import { Employee } from '../model/employee';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  user: User;

  displayedColumns: string[] = ['id', 'employee_name', 'employee_salary', 'employee_age', 'profile_image'];
  dataSource = new MatTableDataSource<Employee>();

  employeeList: Employee[] = [
    {
      "id": 1,
      "employee_name": "Tiger Nixon",
      "employee_salary": 320800,
      "employee_age": 61,
      "profile_image": ""
    }, {
      "id": 2,
      "employee_name": "Garrett Winters",
      "employee_salary": 170750,
      "employee_age": 63,
      "profile_image": ""
    }, {
      "id": 3,
      "employee_name": "Ashton Cox",
      "employee_salary": 86000,
      "employee_age": 66,
      "profile_image": ""
    }, {
      "id": 4,
      "employee_name": "Cedric Kelly",
      "employee_salary": 433060,
      "employee_age": 22,
      "profile_image": ""
    }, {
      "id": 5,
      "employee_name": "Airi Satou",
      "employee_salary": 162700,
      "employee_age": 33,
      "profile_image": ""
    }, {
      "id": 6,
      "employee_name": "Brielle Williamson",
      "employee_salary": 372000,
      "employee_age": 61,
      "profile_image": ""
    }, {
      "id": 7,
      "employee_name": "Herrod Chandler",
      "employee_salary": 137500,
      "employee_age": 59,
      "profile_image": ""
    }, {
      "id": 8,
      "employee_name": "Rhona Davidson",
      "employee_salary": 327900,
      "employee_age": 55,
      "profile_image": ""
    }, {
      "id": 9,
      "employee_name": "Colleen Hurst",
      "employee_salary": 205500,
      "employee_age": 39,
      "profile_image": ""
    }, {
      "id": 10,
      "employee_name": "Sonya Frost",
      "employee_salary": 103600,
      "employee_age": 23,
      "profile_image": ""
    }, {
      "id": 11,
      "employee_name": "Jena Gaines",
      "employee_salary": 90560,
      "employee_age": 30,
      "profile_image": ""
    }, {
      "id": 12,
      "employee_name": "Quinn Flynn",
      "employee_salary": 342000,
      "employee_age": 22,
      "profile_image": ""
    }, {
      "id": 13,
      "employee_name": "Charde Marshall",
      "employee_salary": 470600,
      "employee_age": 36,
      "profile_image": ""
    }, {
      "id": 14,
      "employee_name": "Haley Kennedy",
      "employee_salary": 313500,
      "employee_age": 43,
      "profile_image": ""
    }, {
      "id": 15,
      "employee_name": "Tatyana Fitzpatrick",
      "employee_salary": 385750,
      "employee_age": 19,
      "profile_image": ""
    }, {
      "id": 16,
      "employee_name": "Michael Silva",
      "employee_salary": 198500,
      "employee_age": 66,
      "profile_image": ""
    }, {
      "id": 17,
      "employee_name": "Paul Byrd",
      "employee_salary": 725000,
      "employee_age": 64,
      "profile_image": ""
    }, {
      "id": 18,
      "employee_name": "Gloria Little",
      "employee_salary": 237500,
      "employee_age": 59,
      "profile_image": ""
    }, {
      "id": 19,
      "employee_name": "Bradley Greer",
      "employee_salary": 132000,
      "employee_age": 41,
      "profile_image": ""
    }, {
      "id": 20,
      "employee_name": "Dai Rios",
      "employee_salary": 217500,
      "employee_age": 35,
      "profile_image": ""
    }, {
      "id": 21,
      "employee_name": "Jenette Caldwell",
      "employee_salary": 345000,
      "employee_age": 30,
      "profile_image": ""
    }, {
      "id": 22,
      "employee_name": "Yuri Berry",
      "employee_salary": 675000,
      "employee_age": 40,
      "profile_image": ""
    }, {
      "id": 23,
      "employee_name": "Caesar Vance",
      "employee_salary": 106450,
      "employee_age": 21,
      "profile_image": ""
    }, {
      "id": 24,
      "employee_name": "Doris Wilder",
      "employee_salary": 85600,
      "employee_age": 23,
      "profile_image": ""
    }

  ];
  totalCount: number;
  pageSize: number;

  constructor(private accountService: AccountService) {
    this.user = this.accountService.userValue;
  }

  ngOnInit() {
    this.GetEmployeeList();
    this.dataSource.filterPredicate =
      (data: Employee, filtersJson: string) => {
        const matchFilter = [];
        const filters = JSON.parse(filtersJson);

        filters.forEach(filter => {
          const val = data[filter.id] === null ? '' : data[filter.id];
          matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
        });
        return matchFilter.every(Boolean);
      };
  }

  GetEmployeeList() {
    /** Given api is giving 429 too many request error many time 
    * so I have used that api json to bind this data  */
    this.dataSource.data = this.employeeList;
    this.totalCount = this.employeeList.length;
    this.pageSize = 5;

    /** Below is the code when api return data  */
    // this.accountService.getEmployeeList().subscribe(
    //   data => {
    //     this.dataSource.data = data['data'];
    //     this.dataSource.data = this.employeeList;
    //     this.totalCount = this.employeeList.length;
    //     this.pageSize = 5;
    //   },
    //   error => {
    //     alert(error.message);
    //     console.log("error", error)
    //   });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    const tableFilters = [];
    tableFilters.push({
      id: 'employee_name',
      value: filterValue
    });

    this.dataSource.filter = JSON.stringify(tableFilters);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}