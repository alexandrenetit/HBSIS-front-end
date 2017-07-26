import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef, ViewContainerRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

import { ToastrService } from 'ngx-toastr';

import { Cliente } from "../models/cliente";
import { ClienteService } from "../services/cliente.service";

import { GenericValidator } from "../../common/validation/generic-form-validator";

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  public errors: any[] = [];
  clienteForm: FormGroup;
  cliente: Cliente;
  clienteId: string = "";
  private sub: Subscription;
  private modalVisible: boolean;


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
    this.modalVisible = false;
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

    this.sub = this.route.params.subscribe(
      params => {
        this.clienteId = params['id'];
        this.obterCliente(this.clienteId);
      }
    );
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    Observable.merge(this.clienteForm.valueChanges, ...controlBlurs).debounceTime(100).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.clienteForm);
    });
  }

  obterCliente(id: string) {
    this.clienteService.obterCliente(id)
      .subscribe(
        cliente => this.preencherFormCliente(cliente),
        response => {
          if (response.status == 404) {
            this.router.navigate(['NotFound']);
          }
        });
  }

  preencherFormCliente(cliente: Cliente): void {
    this.cliente = cliente;

    this.clienteForm.patchValue({
      nome: this.cliente.nome,
      cpfCnpj: this.cliente.cpfCnpj,
      telefone: this.cliente.telefone
    });
  }

  editarCliente() {
    if (this.clienteForm.dirty && this.clienteForm.valid) {
      let p = Object.assign({}, this.cliente, this.clienteForm.value);

       this.cliente.nome = p.nome;
      this.cliente.cpfCnpj = p.cpfCnpj;
       this.cliente.telefone= p.telefone;

      this.clienteService.atualizarCliente(this.cliente)
        .subscribe(
          result => { this.onSaveComplete(result) },
          error => {
            this.errors = JSON.parse(error._body).errors;
          });
    }
  }
  onSaveComplete(result): void {
    this.errors = [];
    console.log(result);

    this.toastrService.success('Cliente Atualizado com Sucesso!', 'Oba :D');
    this.router.navigate(['/clientes/']);
  }
}
