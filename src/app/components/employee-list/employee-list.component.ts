import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { tableMetadata, employeeDetails } from '../metadata.modal';

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeList: employeeDetails[] = [];
  metadata: tableMetadata = {fields: [], actions: []};
  scrollWidth = { x: '100%' };

  constructor(
    private message: NzMessageService,
    protected appService: AppService,
    protected router: Router, 
  ) {}

  ngOnInit(): void {
    this.metadataConfigure();
    this.getEmployeeList();
  }

  getEmployeeList() {
    this.employeeList = this.appService.getEmployeeList();
  }

  onAction(event: any) {
    const ID = event.data.ID;
    switch(event.name) {
      case 'delete': 
        this.deleteEmployee(event.data.ID);
        break;
      case 'edit': 
        this.editEmployee(event.data);
        break;
    }
  }

  deleteEmployee(id: string) {
    this.appService.deleteEmployee(id);
    this.getEmployeeList();
    this.promptMessage('success', 'Successfully deleted record');
  }

  editEmployee(data: employeeDetails) {
    this.router.navigate(['/employee-detail', data.ID])
  }

  promptMessage(type: string, msg: string) {
    this.message.create(type, msg);
  }

  formatDate(date_: string) {
    return new Date(date_).toLocaleDateString();
  }

  metadataConfigure() {
    this.metadata = Object.assign({}, this.appService.getMetadata());
    this.metadata.actions = this.metadata.actions.filter(a => ['edit', 'delete'].includes(a.name));
    let total = 0;
    this.metadata.fields.forEach(f => total += Number(f.width));
    this.scrollWidth = {x: `${total}px`};
  }
}
