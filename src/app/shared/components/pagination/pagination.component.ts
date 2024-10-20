import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() page: number;
  @Input() qtdItems: number;
  @Input() limit: number;
  @Input() qtdTotalItems: number | undefined | null;
  @Output() onPagination: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  callPagination(isOn, incrementaPagina) {
    if(isOn) {
      let newPage: number = Number(this.page)+incrementaPagina;
      this.onPagination.emit({newPage});
    }
    
  }

  getTextTotalPaginas() {
    if(this.qtdTotalItems == null || this.qtdTotalItems == undefined) {
      return "";
    }

    return `de ${Math.ceil(this.qtdTotalItems / this.limit)}`;
  }


}
