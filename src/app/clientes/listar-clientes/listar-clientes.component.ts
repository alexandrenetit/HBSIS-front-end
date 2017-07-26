import { Component, OnInit, ViewContainerRef  } from '@angular/core';

import { SeoService, SeoModel } from '../../services/seo.service';

import { Cliente } from "../models/cliente";
import { ClienteService } from "../services/cliente.service";

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})

export class ListarClientesComponent implements OnInit {
  public clientes: Cliente[];
  errorMessage: string;

  constructor(seoService: SeoService, public service: ClienteService ) {

    let seoModel: SeoModel = <SeoModel>{
      title: 'Lista de Clientes',
      description: 'Lista dos Clientes da HBSIS',
      robots: 'Index, Follow',
      keywords: 'clientes,workshops,encontros,congressos'
    };

    seoService.setSeoData(seoModel);
  }
  ngOnInit() : void {
    this.service.obterTodos()
      .subscribe(clientes => this.clientes = clientes,
        error => this.errorMessage);
  }
}
