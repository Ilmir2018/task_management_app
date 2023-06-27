import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Test, TestService } from './services/test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'front';

  valueFromBack$: Observable<Test> = this.testService.getUser(2);

  constructor(private testService: TestService) {}

  ngOnInit() {}
}
