import { Component, OnInit } from '@angular/core';
import { IssueTypeService } from '../api/services/issue-type.service';
import {IssuesService} from '../api/services/issues.service';

@Component({
  selector: 'app-dummy-page',
  templateUrl: './dummy-page.component.html',
  styleUrls: ['./dummy-page.component.scss'],
})
export class DummyPageComponent implements OnInit {
  // Inject the UserService
  constructor(private issueTypeService: IssueTypeService,
              private issuesService: IssuesService) {}

  ngOnInit(): void {
    // Ask the service to make an API call on component initialisation
    this.issueTypeService.loadAllIssueTypes().subscribe({
      next: (result) => console.log('Issue types', result),
      error: (error) => console.warn('Error', error),
    });


    this.issuesService.loadAllIssues().subscribe({
      next: (result) => console.log('Issues', result),
      error: (error) => console.warn('Error', error),
    });
  }
}
