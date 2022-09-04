import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  constructor(
    private http: HttpClient
  ) { }

  private typeToUrl = {
    1: 'agenda_colegiado',
    2: 'agenda_comissao_deliberativa',
    3: 'agenda_comissao_gestao',
  }

  public getInfoSchedule(scheduleType: number): Observable<any> {
    return this.http.get(`/api/ppge/page/${this.typeToUrl[scheduleType]}`);
  }
}