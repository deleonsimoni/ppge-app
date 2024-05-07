import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@app/shared/components/confirm-dialog/confirm-dialog.component';
import { SiteAdminService } from '@app/shared/services/site-admin.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, take } from 'rxjs';

@Component({
  selector: 'app-gerenciar-usuarios',
  templateUrl: './gerenciar-usuarios.component.html',
  styleUrls: ['./gerenciar-usuarios.component.scss']
})
export class GerenciarUsuariosComponent implements OnInit {

  listUsers: any = [];

  form = this.builder.group({
    nameSearch: ['', []],
  });
  constructor(
    private builder: FormBuilder,
    public dialog: MatDialog,
    private siteService: SiteAdminService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  addAdmin(event, idUser, nameUser) {
    event.preventDefault();
    let user = this.listUsers.find(user => user._id == idUser);
    let indexAdminRole = user?.roles.indexOf('admin');
    let isAdmin =  indexAdminRole != -1;
    let textAddOrRm = isAdmin ? 'remover' : 'adicionar';
    const dialogRef = this.dialog.open(ConfirmDialogComponent,  {
      width: '750px',
      data: { title: `Tem certeza que você deseja ${textAddOrRm} "${nameUser}" como admin?` }
    });
    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if (result) {
        
        this.siteService
          .adicionarOuRemoverAdmin(idUser, !isAdmin)
          .pipe(
            catchError(err => {
              this.toastr.error(`Erro ao ${textAddOrRm} admin!`)
              throw err;
            })
          )
          .subscribe(data => {
            this.toastr.success(`Admin ${isAdmin ? 'removido' : 'adicionado'} com sucesso!`);

            if(!isAdmin) {
              user.roles.push('admin');
            } else {
              user.roles.splice(indexAdminRole, 1);
            }
          });
        
      }
    })

  }

  pesquisarUsuarios() {
    if(this.form.value.nameSearch.trim().length < 3) {
      this.toastr.error('Digite pelo menos 3 caracteres para buscar!');
      return;
    }

    this.siteService
      .pesquisarUsuarios(this.form.value.nameSearch)
      .pipe(
        catchError(err => {
          throw err;
        })
      )
      .subscribe(data => {
        this.listUsers = data;
      });
  }

}
