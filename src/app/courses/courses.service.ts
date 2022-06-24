import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { info } from "./info-json";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(
    http: HttpClient
  ) { }

  public getInfoCourses(coursesType: number): Observable<any> {
    const infoReturn = info[Number(coursesType) - 1];
    return of(infoReturn ? infoReturn : {});
  }
}