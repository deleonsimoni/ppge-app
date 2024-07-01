import { Component, OnInit } from '@angular/core';
import { SiteAdminService } from '@app/shared/services/site-admin.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss']
})
export class ContatoComponent implements OnInit {
  contato: any = {};

  constructor(
    private siteService: SiteAdminService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.siteService.getInfoContatos()
    .pipe(
      catchError( err => {
        this.toastr.error('Ocorreu um erro ao buscar "Contatos"', 'Atenção: ');
        throw err;
      })
    )
    .subscribe((data: any) => {
      this.contato = data;
    });
  }

}
