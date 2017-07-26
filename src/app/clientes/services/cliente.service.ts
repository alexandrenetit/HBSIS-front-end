import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { BaseService } from "../../services/base.service";
import { Cliente } from "../models/cliente";

@Injectable()
export class ClienteService extends BaseService {

  constructor(private http: Http) { super(); }

  obterTodos(): Observable<Cliente[]> {

    return this.http.get(this.UrlServiceV1 + "clientes")
      .map((res: Response) => <Cliente[]>res.json())
      .catch(super.serviceError);
  }

  obterCliente(id: string): Observable<Cliente> {
    return this.http.get(this.UrlServiceV1 + "clientes/" + id)
      .map((res: Response) => <Cliente[]>res.json())
      .catch(super.serviceError);
  }

  adicionarCliente(cliente: Cliente): Observable<Cliente> {

    cliente.id = undefined;

    let response = this.http
      .post(this.UrlServiceV1 + "clientes/novo", cliente)
      .map(super.extractData)
      .catch((super.serviceError));
    return response;
  };

  atualizarCliente(cliente: Cliente): Observable<Cliente> {

    let response = this.http
      .put(this.UrlServiceV1 + "clientes/editar", cliente)
      .map(super.extractData)
      .catch((super.serviceError));
    return response;
  };

  excluirCliente(id: string): Observable<Cliente> {

    let response = this.http
      .delete(this.UrlServiceV1 + "clientes/excluir/" + id)
      .map(super.extractData)
      .catch((super.serviceError));
    return response;
  };
}


