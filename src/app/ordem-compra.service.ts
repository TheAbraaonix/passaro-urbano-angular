import { Injectable } from "@angular/core";
import { Pedido } from "./shared/pedido.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, Observable } from "rxjs";

import { URL_API } from "./app.api";

@Injectable()
export class OrdemCompraService {
    constructor(private http: HttpClient) { }

    public efetivarCompra(pedido: Pedido): Observable<number> {
        let headers: HttpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

        return this.http.post<any>(`${URL_API}/pedidos`, pedido, { headers: headers })
            .pipe(map((resposta: any) => resposta['id']));
    }
}