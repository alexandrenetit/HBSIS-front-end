import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef, ViewContainerRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

import { ToastrService } from 'ngx-toastr';

import { Cliente } from "../models/cliente";
import { ClienteService } from "../services/cliente.service";

import { GenericValidator } from "../../common/validation/generic-form-validator";

@Component({
  selector: 'app-adicionar-cliente',
  templateUrl: './adicionar-cliente.component.html',
  styleUrls: ['./adicionar-cliente.component.css']
})

export class AdicionarClienteComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  public errors: any[] = [];
  clienteForm: FormGroup;
  cliente: Cliente;


  constructor(private fb: FormBuilder,
              private clienteService: ClienteService,
              private router: Router,
              private route: ActivatedRoute,
              private toastrService: ToastrService) {

    this.validationMessages = {
      nome: {
        required: 'O Nome é requerido.',
        minlength: 'O Nome precisa ter no mínimo 2 caracteres',
        maxlength: 'O Nome precisa ter no máximo 150 caracteres'
      },
      cpfCnpj: {
        required: 'O CFP/CNPJ é requerido',
        minlength: 'O CPF precisa ter 11 caracteres',
        maxlength: 'O CNPJ precisa ter 14 caracteres'
      },
      telefone: {
        required: 'O Telefone é requerido.'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
    this.cliente = new Cliente();
  }

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  ngOnInit() {
    this.clienteForm = this.fb.group({
      nome: ['', [Validators.required,
        Validators.minLength(2),
        Validators.maxLength(150)]],
      cpfCnpj: ['', [Validators.required,
        Validators.minLength(11),
        Validators.maxLength(14)]],
      telefone: ['', [Validators.required,
        Validators.maxLength(25)]]
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    Observable.merge(this.clienteForm.valueChanges, ...controlBlurs).debounceTime(100).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.clienteForm);
    });
  }

  adicionarCliente() {
    if (this.clienteForm.dirty && this.clienteForm.valid) {
      let p = Object.assign({}, this.cliente, this.clienteForm.value);

      this.cliente.nome = p.nome;
      this.cliente.cpfCnpj = p.cpfCnpj;
      this.cliente.telefone= p.telefone;

      this.clienteService.adicionarCliente(this.cliente)
        .subscribe(
          result => { this.onSaveComplete() },
          error => {
            this.errors = JSON.parse(error._body).errors;
          });
    }
  }
  onSaveComplete(): void {
    this.errors = [];

    this.toastrService.success('Cliente Registrado com Sucesso!', 'Oba :D');
    this.router.navigate(['/clientes/']);
  }
}
