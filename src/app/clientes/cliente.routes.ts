import { Routes } from '@angular/router';

import { ClienteComponent } from "./cliente.component";
import { ListarClientesComponent } from './listar-clientes/listar-clientes.component';
import { AdicionarClienteComponent } from './adicionar-cliente/adicionar-cliente.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { ExcluirClienteComponent } from './excluir-cliente/excluir-cliente.component';

export const clienteRouterConfig: Routes = [
  {
    path: '', component: ClienteComponent,
    children: [
      { path: '', component: ListarClientesComponent },
      { path: 'novo', component: AdicionarClienteComponent },
      { path: 'editar/:id', component: EditarClienteComponent },
      { path: 'excluir/:id', component: ExcluirClienteComponent }
    ]
  }
]
