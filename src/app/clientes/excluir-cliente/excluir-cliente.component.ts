import { Component, OnInit, ViewContainerRef, ViewChildren, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormControlName } from "@angular/forms";

import { Subscription } from 'rxjs/Subscription';
import { ToastrService } from 'ngx-toastr';

import { Cliente } from "../models/cliente";
import { ClienteService } from "../services/cliente.service";

@Component({
  selector: 'app-excluir-cliente',
  templateUrl: './excluir-cliente.component.html',
  styleUrls: []
})

export class ExcluirClienteComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  private sub: Subscription;
  clienteId: string = "";
  public cliente: Cliente;

  constructor(private clienteService: ClienteService,
              private route: ActivatedRoute,
              private router: Router,
              private toastrService: ToastrService) {

    this.cliente = new Cliente();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
        this.clienteId = params['id'];
      });

    this.clienteService.obterCliente(this.clienteId)
      .subscribe(
        cliente => { this.cliente = cliente; },
        response => {
          if (response.status == 404) {
            this.router.navigate(['/NotFound']);
          }
        });
  }

  public excluirCliente() {
    this.clienteService.excluirCliente(this.clienteId)
      .subscribe(
        cliente => { this.onDeleteComplete(cliente) },
        error => { this.onError(error) }
      );
  }

  public onDeleteComplete(cliente: any) {

    this.toastrService.success('Cliente excluido com Sucesso!', 'Good bye :D');
    this.router.navigate(['/clientes/']);
  }

  public onError(error) {
    this.toastrService.error('Houve um erro no processamento!', 'Ops! :(');
    console.log(error);
  }
}

