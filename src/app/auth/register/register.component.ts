import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  AbstractControl,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '@app/shared/services';
import { MatDialog } from '@angular/material/dialog';
import { ModalTermoUsoComponent } from '@app/modals/modal-termo-uso/modal-termo-uso.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  public registerForm: FormGroup;
  public carregando = false;


  states =
    ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']
    ;

  constructor(
    private router: Router,
    private authService: AuthService,
    private builder: FormBuilder,
    private rota: Router,
    private dialog: MatDialog,
    private toastr: ToastrService) {
    this.createForm();
  }


  ngOnInit(): void {

  }

  private createForm(): void {
    this.registerForm = this.builder.group({
      fullname: [null, [Validators.required]],
      socialname: [null, []],
      email: [null, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      repeatEmail: [null, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      cfPassword: [null, [Validators.required, Validators.minLength(6)]],
      dataNiver: [null, [Validators.required]],

      rg: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      rgEmissor: [null, [Validators.required]],
      passaporte: [null, []],
      nacionalidade: [null, [Validators.required]],
      endereco: [null, [Validators.required]],
      bairro: [null, [Validators.required]],
      cep: [null, [Validators.required]],
      cidade: [null, [Validators.required]],
      estado: [null, [Validators.required]],
      celular: [null, [Validators.required]],
      telefone: [null, []],
      cargo: [null, []],
      empresa: [null, []],
      deficiencia: [null, []],
      cor: [null, [Validators.required]],
      genero: [null, [Validators.required]],


      icAcceptTerms: [false, [Validators.requiredTrue]]
    });
  }


  register(): void {

    const form = this.registerForm.value;

    if (form.password != form.cfPassword) {
      this.toastr.error('Senhas divergentes.', 'Atenção: ');
      return;
    }

    if (!form.password) {
      this.toastr.error('É necessário colocar uma senha.', 'Atenção: ');
      return;
    }

    if (!form.cfPassword) {
      this.toastr.error('É repetir a senha.', 'Atenção: ');
      return;
    }

    if (!this.registerForm.value.celular) {
      this.toastr.error('Número de celular inválido.', 'Atenção: ');
      return;
    }

    if (!this.registerForm.value.cep) {
      this.toastr.error('CEP inválido.', 'Atenção: ');
      return;
    }

    if (!this.registerForm.value.rg) {
      this.toastr.error('RG inválido.', 'Atenção: ');
      return;
    }

    if (!this.registerForm.value.cpf) {
      this.toastr.error('CPF inválido.', 'Atenção: ');
      return;
    }

    if (!this.registerForm.value.rgEmissor) {
      this.toastr.error('Órgão emissor inválido.', 'Atenção: ');
      return;
    }

    if (!this.registerForm.value.nacionalidade) {
      this.toastr.error('Nacionalidade inválido.', 'Atenção: ');
      return;
    }

    if (!this.registerForm.value.cor) {
      this.toastr.error('Cor inválido.', 'Atenção: ');
      return;
    }


    if (!this.registerForm.value.genero) {
      this.toastr.error('Gênero inválido.', 'Atenção: ');
      return;
    }


    if (!this.registerForm.value.icAcceptTerms) {
      this.toastr.error('É necessário aceitar os termos para prosseguir.', 'Atenção: ');
      return;
    }

    if (this.registerForm.value.repeatEmail != this.registerForm.value.email) {
      this.toastr.error('Verifique o campo email e confirmação de email.', 'Atenção: ');
      return;
    }

    if (!this.registerForm.value.fullname) {
      this.toastr.error('Digite o nome e sobrenome.', 'Atenção: ');
      return;
    }

    //if (this.registerForm.valid && form != null) {

    this.carregando = true;
    this.registerForm.value.email = this.registerForm.value.email.toLowerCase().trim();
    this.registerForm.removeControl('cf-password');

    this.authService
      .register(form)
      .subscribe((res: any) => {
        this.toastr.success('Cadastro realizado com sucesso.', 'Bem-vindo');
        this.router.navigate(['']);
      }, err => {
        this.carregando = false;
        if (err.status === 500) {
          if (err.error.message.match('email')) {
            this.toastr.error('Email já registrado.', 'Erro: ');
          }
        }
      });
    /*} else {
      this.toastr.error('Verifique os campos do formulário para checar o correto preenchimento.', 'Erro: ');
    }*/


  }


  public openRules(): void {
    const dialogRef = this.dialog.open(ModalTermoUsoComponent, {
      data: {},
    });
  }

  get validate() {
    return this.registerForm.controls;
  }



}
