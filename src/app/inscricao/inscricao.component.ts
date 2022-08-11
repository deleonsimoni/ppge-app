import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalTermoUsoComponent } from '@app/modals/modal-termo-uso/modal-termo-uso.component';
import { AuthService } from '@app/shared/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inscricao',
  templateUrl: './inscricao.component.html',
  styleUrls: ['./inscricao.component.scss']
})
export class InscricaoComponent implements OnInit {

  public registerForm: FormGroup = new FormGroup({});
  public carregando = false;
  public docType = 'Documento';
  public submit = false;
  public categories = [
    { id: 1, name: 'Convidado de sessão especial' },
    { id: 3, name: 'Expositor de pôster' },
    { id: 4, name: 'Mediador de minicurso' },
    { id: 5, name: 'Coordenador e expositor de painel' },
    { id: 6, name: 'Simposista' },
    { id: 7, name: 'Ouvinte' }
  ];

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private dialog: MatDialog,
    private rota: Router,
    private toastr: ToastrService,
    private router: Router
  ) {

    this.createForm();

  }

  ngOnInit() {

  }

  private createForm(): void {
    this.registerForm = this.builder.group({
      fullname: [null, [Validators.required]],
      socialname: [null, []],
      // tslint:disable-next-line: max-line-length
      email: [null, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      emailConfirm: [null, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      cfPassword: [null, [Validators.required, Validators.minLength(6)]],
      dateBirth: [null, [Validators.required]],
      pcdId: [null],
      icForeign: [false],
      isPCD: [false],
      categoriaId: [null, [Validators.required]],
      deficiencyType: [null],
      document: [null, [Validators.required]],
      address: this.builder.group({
        street: [null, [Validators.required]],
        num: [null, [Validators.required]],
        complement: [null],
        zip: [null, [Validators.required]],
        city: [null, [Validators.required]],
        district: [null, [Validators.required]],
        country: [null, [Validators.required]],
        state: [null, [Validators.required]]
      }),
      phones: this.builder.group({
        telephone: [null],
        cellphone: [null, [Validators.required]],
      }),
      institution: this.builder.group({
        name: [null, [Validators.required]],
        initials: [null]
      }),
      modalityId: new FormArray([]),
      roles: this.builder.array([
        this.createGroup()
      ]),
      icAcceptTerms: [false, [Validators.requiredTrue]]
    });
  }

  private createGroup(): FormGroup {
    return this.builder.group({
      id: [1, [Validators.required]],
      payment: this.builder.group({
        code: [null],
        amount: [null],
        icPaid: [null]
      })
    });
  }

  public register() {
    this.submit = true;
    this.registerForm.value.email = this.registerForm.value.email.toLowerCase();
    const form = this.validatePassword();

    if (this.registerForm?.get('phones')?.get('cellphone')?.errors) {
      this.toastr.error('Número de celular inválido.', 'Atenção: ');
      return;
    }

    if (this.registerForm?.get('address')?.get('zip')?.errors) {
      this.toastr.error('CEP inválido.', 'Atenção: ');
      return;
    }

    if (!this.registerForm.value.icForeign && this.registerForm.value.document.length !== 11) {
      this.toastr.error('CPF inválido.', 'Atenção: ');
      return;
    }

    if (!this.registerForm.value.icAcceptTerms) {
      this.toastr.error('É necessário aceitar os termos para prosseguir.', 'Atenção: ');
      return;
    }

    if (!this.registerForm.value.categoriaId) {
      this.toastr.error('É necessário selecionar a categoria de inscrição.', 'Atenção: ');
      return;
    }



    if (this.registerForm.value.emailConfirm != this.registerForm.value.email) {
      this.toastr.error('Verifique o campo email e confirmação de email.', 'Atenção: ');
      return;
    }

    if (!this.registerForm.value.fullname) {
      this.toastr.error('Digite o nome e sobrenome.', 'Atenção: ');
      return;
    }


    if (this.registerForm.valid && form != null) {

      this.carregando = true;

      this.authService.register(form)
        .subscribe((res: any) => {
          this.carregando = false;
          // this.authService.setUser(this.authService.getDecodedAccessToken(res.token), res.token);
          this.exibirModalSucesso();
        }, err => {
          this.carregando = false;
          if (err.status === 500) {
            if (err.error.message.match('email')) {
              this.toastr.error('Email já registrado.', 'Erro: ');
            }
            if (err.error.message.match('cpf')) {
              this.toastr.error('CPF já cadastrado.', 'Erro: ');
            }
            if (err.error.message.match('document')) {
              this.toastr.error('CPF ou passaporte já cadastrado.', 'Erro: ');
            }
          }
        });
    } else if (this.registerForm.valid && form == null) {
      this.toastr.error('Senhas não conferem.', 'Erro: ');
    } else {
      this.toastr.error('Verifique os campos do formulário para checar o correto preenchimento.', 'Erro: ');
    }
    // this.exibirModalSucesso();
  }

  public validarNome(nome: any) {
    const regName = /^[a-zA-Z ]{6,400}$/;
    const name = nome;
    if (!regName.test(name)) {
      return false;
    } else {
      return true;
    }
  }

  private validatePassword(): any {
    const form = this.registerForm.value;

    if (form.password === form.cfPassword) {
      this.registerForm.removeControl('cf-password');
      return this.registerForm.value;
    }

  }

  private exibirModalSucesso(): void {

    this.rota.navigate(['/home']);
  }

  public openRules(): void {
    const dialogRef = this.dialog.open(ModalTermoUsoComponent, {
      data: {},
    });
  }

  get validate() {
    return this.registerForm.controls;
  }

  get phones() {
    return this.registerForm?.get('phones')!['controls'];
  }

  get address() {
    return this.registerForm.get('address')!['controls'];
  }

  get institution() {
    return this.registerForm?.get('institution')!['controls'];
  }


}