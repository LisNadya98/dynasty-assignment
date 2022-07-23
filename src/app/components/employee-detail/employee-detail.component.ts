import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { ActivatedRoute, Router } from "@angular/router"
import { NzMessageService } from 'ng-zorro-antd/message';
import { tableMetadata, employeeDetails } from '../metadata.modal';
import { differenceInCalendarDays } from 'date-fns';

@Component({
  selector: 'employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employeeId: string | null = null;
  disableForm: boolean = false;
  employeeDataCopy: employeeDetails | undefined;
  validateForm!: FormGroup;
  metadata: tableMetadata = {fields: [], actions: []};
  
  constructor(
    private message: NzMessageService,
    private route: ActivatedRoute, 
    protected router: Router, 
    protected appService: AppService, 
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.metadata = Object.assign({}, this.appService.getMetadata());
    this.metadata.actions = this.metadata.actions.filter(a => ['save', 'reset'].includes(a.name));
    this.route.paramMap.subscribe(params => {
      this.employeeId = this.route.snapshot.paramMap.get('id') ? this.route.snapshot.paramMap.get('id') : null;
      this.disableForm = this.router.url.includes('/employee-detail') && !this.employeeId? true : false;
      if (this.employeeId === 'NEW') {
        this.setForm();
      } else {
        this.getEmployeeData();
      }
    });
  }

  onAction(event: any) {
    switch(event.name) {
      case 'reset':
        this.resetForm(event.event);
        break;
    }
  }

  resetForm(event: MouseEvent) {
    event.preventDefault();
    if (this.employeeId === 'NEW') {
      this.validateForm.reset();
    } else {
      this.setForm(this.employeeDataCopy);
    }
  }

  submitForm() {
    if (!this.validateForm.valid) {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }

    this.saveEmployee(this.validateForm.value);
  }

  saveEmployee(data: employeeDetails) {
    if (this.employeeId === 'NEW') {
      this.appService.addEmployee(data);
      this.promptMessage('success', 'Successfully created new employee!');
      this.validateForm.reset();
    } else {
      const payload = Object.assign({}, data);
      payload.ID = this.employeeId;
      this.appService.updateEmployee(payload);
      this.employeeDataCopy = Object.assign({}, data);
      this.promptMessage('success', 'Successfully updated employee ' + data.EMP_NAME);
    }
  }

  getEmployeeData() {
    const data = this.appService.getEmployeeData(this.employeeId || null);
    this.employeeDataCopy = Object.assign({}, data);
    this.setForm(data);
  }

  setForm(data_?: employeeDetails | undefined) {
    const data = data_ ? data_: {EMP_NAME: null, EMP_DESIGNATION: null, EMP_SALARY: null, EMP_BIO: null, EMP_DOB: null};
    this.validateForm = this.fb.group({
      EMP_NAME: [data.EMP_NAME, [Validators.required]],
      EMP_DESIGNATION: [data.EMP_DESIGNATION, [Validators.required]],
      EMP_SALARY: [data.EMP_SALARY, [Validators.required]],
      EMP_BIO: [data.EMP_BIO, [Validators.required]],
      EMP_DOB: [data.EMP_DOB, [Validators.required]]
    });
  }

  promptMessage(type: string, msg: string) {
    this.message.create(type, msg);
  }

  disabledDate = (current: Date): boolean =>
    differenceInCalendarDays(current, new Date()) > 0;
}
