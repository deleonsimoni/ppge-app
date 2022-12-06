import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SiteAdminService } from '@app/shared/services/site-admin.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, take } from 'rxjs';
import { AddPareceristaDialogComponent } from './add-parecerista-dialog/add-parecerista-dialog.component';

@Component({
  selector: 'app-pareceristas',
  templateUrl: './pareceristas.component.html',
  styleUrls: ['./pareceristas.component.scss']
})
export class PareceristasComponent implements OnInit {
  listPareceristas: any = [];
  constructor(
    private toastr: ToastrService,
    public dialog: MatDialog,
    private siteService: SiteAdminService,
    ) { }

  ngOnInit(): void {
    this.listarPareceristas()
  }

  abrirModalAddParecerista() {
    const dialogRef = this.dialog.open(AddPareceristaDialogComponent,{width: '750px'});
    dialogRef.afterClosed().pipe(take(1)).subscribe(data => {
      if(data && data.refresh)
        this.listarPareceristas();

    })
  }

  listarPareceristas() {
    console.log("listarPareceristas");
    this.siteService.listarPareceristas().subscribe((data:  any) => {
      console.log("RETORNO: ", data);
      this.listPareceristas = data;
    });
  } 

  addCoordenador(event, idUser) {
    console.log("addCoordenador: event: ", event);
    console.log("addCoordenador: idUser: ", idUser);
    if(event.checked) {
      console.log("addCoordenador: ADICIONA", idUser);
      this.siteService
        .adicionarCoordenador(idUser)
        .pipe(take(1))
        .pipe(catchError((data) => of(data.error)))
        .subscribe((data: any) => {
          console.log(data);
          data.hasError ? this.toastr.error(data.msg) : this.toastr.success(data.msg);
        });
    } else {
      console.log("addCoordenador: REMOVE", idUser);
      this.siteService
        .removerCoordenador(idUser)
        .pipe(take(1))
        .pipe(catchError((data) => of(data.error)))
        .subscribe((data: any) => {
          console.log(data);
          data.hasError ? this.toastr.error(data.msg) : this.toastr.success(data.msg)
        });

    }
  }

  removerPermissoes(idUser) {
    console.log("removerPermissoes: idUser: ", idUser);
    
    this.siteService
      .removerParecerista(idUser)
      .pipe(take(1))
      .pipe(catchError((data) => of(data.error)))
      .subscribe((data: any) => {
        console.log(data);
        if(data.hasError) {
          this.toastr.error(data.msg);
        } else {
          this.toastr.success(data.msg);
          this.listarPareceristas();
        }
      });
  }

}
