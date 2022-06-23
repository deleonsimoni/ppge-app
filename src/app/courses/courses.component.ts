import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from './courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  public coursesType = 1;
  public coursesInfo: any = {};

  constructor(
    private coursesService: CoursesService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe(routeParams => {
      this.coursesType = routeParams.coursesType;
      this.getCoursesService(this.coursesType);
    })
  }

  private getCoursesService(coursesType: number) {
    this.coursesService.getInfoCourses(coursesType).subscribe(data => {
      this.coursesInfo = data;
    });
  }

}
