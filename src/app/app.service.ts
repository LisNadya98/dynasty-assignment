import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { employeeDetails, tableMetadata } from './components/metadata.modal';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  employeeList: employeeDetails[] = [];
  metadata: tableMetadata = {
    fields: [
      {name: 'EMP_NAME', label: 'Employee Name', type: 'text', error: 'Please input name!'},
      {name: 'EMP_DESIGNATION', label: 'Designation', type: 'text', error: 'Please input designation!'}, 
      {name: 'EMP_SALARY', label: 'Salary', type: 'number', error: 'Please input salary!'},
      {name: 'EMP_BIO', label: 'Short Bio', type: 'textarea', error: 'Please input bio!'}, 
      {name: 'EMP_DOB', label: 'Date of Birth', type: 'date', error: 'Please input date of birth!'}
    ],
    actions: [
      {name: 'save', label: 'Save'},
      {name: 'reset', label: 'Reset'},
      {name: 'edit', label: 'Edit'},
      {name: 'delete', label: 'Delete'}
    ]
  }
  
  constructor() { }

  getEmployeeList() {
    this.employeeList = JSON.parse(localStorage.getItem('employeeList') || '[]');
    return this.employeeList;
  }

  deleteEmployee(id: string | undefined) {
    if (!id) {
      return;
    }
    this.employeeList =  this.employeeList.filter(a => a.ID !== id);
    this.setEmployeeList();
  }

  addEmployee(payload: any) {
    const result = Object.assign({}, payload);
    result.ID = uuidv4();
    this.employeeList =  [...this.employeeList, result];
    this.setEmployeeList();
  }

  getEmployeeData(id: string | null) {
    return this.employeeList.find(a => a.ID === id);
  }

  updateEmployee(payload: any) {
    const index = this.employeeList.findIndex(a => a.ID === payload.ID);
    this.employeeList.splice(index, 1, payload);
    this.setEmployeeList();
  }
  
  setEmployeeList() {
    localStorage.setItem("employeeList", JSON.stringify(this.employeeList))
  }

  getMetadata() {
    return this.metadata;
  }
}
