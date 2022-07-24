import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router"
import { AppService } from './app.service';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tabList = [
    {id: 0, title: 'Add Employee', name: 'add', link: '/employee-detail/NEW'},
    {id: 1, title: 'Edit Employee', name: 'edit', link: '/employee-detail'},
    {id: 2, title: 'View Employee List', name: 'view', link: '/view'}
  ]
  title: string = "Employee Management System"; 

  constructor(
    private i18n: NzI18nService, 
    protected router: Router, 
    private route: ActivatedRoute, 
    protected appService: AppService) {
    this.i18n.setLocale(en_US);
  }

  ngOnInit() {
  }
}
