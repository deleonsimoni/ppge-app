import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  constructor(
    http: HttpClient
  ) { }

  public getInfoSchedule(scheduleType: number): Observable<any> {
    const result =
      scheduleType == 1 ?
        {
          textTitle: "Agenda do Colegiado " + scheduleType,
          urlImage: "",
          textBody: `
            <h3>Reuniões - sala 220 - 11:00 h - 2015</h3>
            <ul>
              <li>03 de agosto</li>
              <li>21 de setembro</li>
              <li>19 de outubro</li>
              <li>16 de novembro</li>
              <li>14 de dezembro</li>
            </ul>
        `
        } : scheduleType == 2 ?
          {
            textTitle: "Agenda do Colegiado " + scheduleType,
            urlImage: "",
            textBody: `
            <h3>Reuniões - sala 220 - 11:00 h - 2016</h3>
            <ul>
              <li>03 de agosto</li>
              <li>21 de setembro</li>
              <li>19 de outubro</li>
              <li>16 de novembro</li>
              <li>14 de dezembro</li>
            </ul>
        `
          } :
          {
            textTitle: "Agenda do Colegiado " + scheduleType,
            urlImage: "",
            textBody: `
            <h3>Reuniões - sala 220 - 11:00 h - 2017</h3>
            <ul>
              <li>03 de agosto</li>
              <li>21 de setembro</li>
              <li>19 de outubro</li>
              <li>16 de novembro</li>
              <li>14 de dezembro</li>
            </ul>
        `
          }
      ;

    return of(result);
  }
}