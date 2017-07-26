import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

// components
import { ClienteComponent } from './cliente.component';
import { ListarClientesComponent } from './listar-clientes/listar-clientes.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { ExcluirClienteComponent } from './excluir-cliente/excluir-cliente.component';
import { AdicionarClienteComponent } from './adicionar-cliente/adicionar-cliente.component';

// services
import { SeoService } from '../services/seo.service';
import { ClienteService } from "./services/cliente.service";

// config
import { clienteRouterConfig } from "./cliente.routes";

// shared modules
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(clienteRouterConfig),
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  declarations: [
    ClienteComponent,
    ListarClientesComponent,
    EditarClienteComponent,
    ExcluirClienteComponent,
    AdicionarClienteComponent
  ],
  providers: [
    Title,
    SeoService,
    ClienteService
  ],
  exports: [RouterModule]
})

export class ClienteModule { }
