import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { User } from '@app/shared/interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Input() user: any;
  @Output() callBackEdit = new EventEmitter<User>();

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
  }


  ngOnInit(): void {
    // if(this.user && !this.user._id) {
    //   this.toastr.error('ID do usuário não encontrado!', 'Atenção');
    // }
    this.createForm();

  }

  private createForm(): void {
    
    this.registerForm = this.builder.group({
      _id: [this.user?._id ?? null],
      fullname: [this.user?._id ? this.user?.fullname : null, [Validators.required]],
      socialname: [this.user?._id ? this.user?.socialname : null, []],
      email: [{value: this.user?._id ? this.user?.email : null, disabled: this.user?._id}, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      
      dataNiver: [this.user?._id ? new Date(this.user?.dataNiver) : null, [Validators.required]],
      rg: [this.user?._id ? this.user?.rg : null, [Validators.required]],
      cpf: [this.user?._id ? this.user?.cpf : '', [Validators.required, this.cpfValidator]],
      rgEmissor: [this.user?._id ? this.user?.rgEmissor : null, [Validators.required]],

      passaporte: [this.user?._id ? this.user?.passaporte : null, []],
      nacionalidade: [this.user?._id ? this.user?.nacionalidade : null, [Validators.required]],
      endereco: [this.user?._id ? this.user?.endereco : null, [Validators.required]],
      bairro: [this.user?._id ? this.user?.bairro : null, [Validators.required]],
      cep: [this.user?._id ? this.user?.cep : '', [Validators.required, this.cepValidator]],
      cidade: [this.user?._id ? this.user?.cidade : null, [Validators.required]],
      estado: [this.user?._id ? this.user?.estado : null, [Validators.required]],
      celular: [this.user?._id ? this.user?.celular : '', [Validators.required, this.celularValidator]],
      telefone: [this.user?._id ? this.user?.telefone : '', [this.telefoneValidator]],
      cargo: [this.user?._id ? this.user?.cargo : null, []],
      
      empresa: [this.user?._id ? this.user?.empresa : null, []],
      deficiencia: [this.user?._id ? this.user?.deficiencia : null, []],
      cor: [this.user?._id ? this.user?.cor : null, [Validators.required]],
      genero: [this.user?._id ? this.user?.genero : null, [Validators.required]],


    });

    if(!this.user || !this.user._id) {
      this.registerForm.addControl('repeatEmail', new FormControl(null, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]))
      this.registerForm.addControl('password', new FormControl(null, [Validators.required, Validators.minLength(6)]))
      this.registerForm.addControl('cfPassword', new FormControl(null, [Validators.required, Validators.minLength(6)]))
      this.registerForm.addControl('icAcceptTerms', new FormControl(false, [Validators.requiredTrue]))
    }
  }

  cepValidator(control: FormControl) {
    let cep = control.value;
    if (!cep) {
      return null; // Não valida se o campo estiver vazio, pois outro validador (required) já fará isso
    }
  
    // Remove todos os caracteres que não sejam números
    cep = cep.replace(/\D/g, '');
  
    // Verifica se o cep tem 8 dígitos
    if (cep.length !== 8) {
      return { invalidCep: true };
    }

    // Elimina ceps conhecidos como inválidos
    if (/^(\d)\1+$/.test(cep)) {
      return { invalidCep: true };
    }
  }

  telefoneValidator(control: FormControl) {
    let telefone = control.value;

    if (!telefone) {
      return null; // Não valida se o campo estiver vazio, pois outro validador (required) já fará isso
    }
  
    // Remove todos os caracteres que não sejam números
    telefone = telefone.replace(/\D/g, '');
  
    // Verifica se o telefone tem 11 dígitos
    if (telefone.length !== 10) {
      return { invalidTelefone: true };
    }

    // Elimina telefones conhecidos como inválidos
    if (/^(\d)\1+$/.test(telefone)) {
      return { invalidTelefone: true };
    }
  }

  celularValidator(control: FormControl) {
    let celular = control.value;

    if (!celular) {
      return null; // Não valida se o campo estiver vazio, pois outro validador (required) já fará isso
    }
  
    // Remove todos os caracteres que não sejam números
    celular = celular.replace(/\D/g, '');
  
    // Verifica se o celular tem 11 dígitos
    if (celular.length !== 11) {
      return { invalidCelular: true };
    }

    // Elimina celulars conhecidos como inválidos
    if (/^(\d)\1+$/.test(celular)) {
      return { invalidCelular: true };
    }
  }

  cpfValidator(control: FormControl) {
    let cpf = control.value;

    if (!cpf) {
      return null; // Não valida se o campo estiver vazio, pois outro validador (required) já fará isso
    }
  
    // Remove todos os caracteres que não sejam números
    cpf = cpf.replace(/\D/g, '');
  
    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
      return { invalidCpf: true };
    }
  
    // Elimina CPFs conhecidos como inválidos
    if (/^(\d)\1+$/.test(cpf)) {
      return { invalidCpf: true };
    }
  
    // Valida os dígitos verificadores
    let sum = 0;
    let remainder;
  
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
    }
  
    remainder = (sum * 10) % 11;
  
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
  
    if (remainder !== parseInt(cpf.substring(9, 10), 10)) {
      return { invalidCpf: true };
    }
  
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
    }
  
    remainder = (sum * 10) % 11;
  
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
  
    if (remainder !== parseInt(cpf.substring(10, 11), 10)) {
      return { invalidCpf: true };
    }
  
    return null; // CPF é válido
  }

  formatCpf(cpf: string): string {
    // Remove todos os caracteres que não são números
    cpf = cpf.replace(/\D/g, '');
    
    // Aplica a máscara CPF (000.000.000-00)
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  formatCep(cep: string): string {
    // Remove todos os caracteres que não são números
    cep = cep.replace(/\D/g, '');
    
    // Aplica a máscara cep (00000-00)
    return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
  }

  formatPhoneNumber(phone: string): string {
    // Remove todos os caracteres que não são números
    phone = phone.replace(/\D/g, '');

    // Aplica a máscara para o celular (XX) XXXXX-XXXX
    if (phone.length === 11) { // Número com DDD e 9 dígitos
        return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (phone.length === 10) { // Número com DDD e 8 dígitos
        return phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
        return phone; // Retorna o número como está se não tiver 10 ou 11 dígitos
    }
  }


  register(): void {

    const form = this.registerForm.value;

    if ((!this.user || !this.user._id) && form.password != form.cfPassword) {
      this.toastr.error('Senhas divergentes.', 'Atenção: ');
      return;
    }

    if ((!this.user || !this.user._id) && this.user && this.user._id && !form.password) {
      this.toastr.error('É necessário colocar uma senha.', 'Atenção: ');
      return;
    }

    if ((!this.user || !this.user._id) && !form.cfPassword) {
      this.toastr.error('É necessário repetir a senha.', 'Atenção: ');
      return;
    }

    if (this.registerForm.get('celular')?.invalid) {
      this.toastr.error('Número de celular inválido.', 'Atenção: ');
      return;
    } else {
      form.celular = this.formatPhoneNumber(this.registerForm.get('celular')?.value); 
    }

    if (this.registerForm.get('telefone')?.invalid) {
      this.toastr.error('Número de telefone inválido.', 'Atenção: ');
      return;
    } else {
      form.telefone = this.formatPhoneNumber(this.registerForm.get('telefone')?.value); 
    }

    if (this.registerForm.get('cep')?.invalid) {
      this.toastr.error('CEP inválido.', 'Atenção: ');
      return;
    } else {
      form.cep = this.formatCep(this.registerForm.get('cep')?.value); 

    }

    if (!this.registerForm.value.rg) {
      this.toastr.error('RG inválido.', 'Atenção: ');
      return;
    }

    if (this.registerForm.get('cpf')?.invalid) {
      this.toastr.error('CPF inválido.', 'Atenção: ');
      return;
    } else {
      form.cpf = this.formatCpf(this.registerForm.get('cpf')?.value); 
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
      this.toastr.error('Campo "Cor" não preenchido.', 'Atenção: ');
      return;
    }


    if (!this.registerForm.value.genero) {
      this.toastr.error('Campo "Gênero" não preenchido.', 'Atenção: ');
      return;
    }


    if ((!this.user || !this.user._id) && !this.registerForm.value.icAcceptTerms) {
      this.toastr.error('É necessário aceitar os termos para prosseguir.', 'Atenção: ');
      return;
    }

    if ((!this.user || !this.user._id) && this.registerForm.value.repeatEmail != this.registerForm.value.email) {
      this.toastr.error('Verifique o campo email e confirmação de email.', 'Atenção: ');
      return;
    }

    if (!this.registerForm.value.fullname) {
      this.toastr.error('Digite o nome e sobrenome.', 'Atenção: ');
      return;
    }

    //if (this.registerForm.valid && form != null) {

    this.carregando = true;
    if(!this.user || !this.user._id) {
      this.registerForm.value.email = this.registerForm.value.email.toLowerCase().trim();
    }
    this.registerForm.removeControl('cfPassword');

    this.authService
      .register(form)
      .subscribe((res: any) => {
        if(!this.user || !this.user._id) {
          this.toastr.success('Cadastro realizado com sucesso.', 'Bem-vindo');
          this.authService.signOut();
          this.router.navigateByUrl('/auth/login');
        } else {
          this.toastr.success('Dados alterados com sucesso.');
          this.callBackEdit.emit(res);
        }
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
