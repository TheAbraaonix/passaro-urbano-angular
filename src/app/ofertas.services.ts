import { HttpClient } from "@angular/common/http";
import { Oferta } from "./shared/oferta.model";
import { Injectable } from "@angular/core";
import { URL_API } from "./app.api";
import { firstValueFrom, Observable } from "rxjs";

@Injectable()
export class OfertasService {
    //private url_api: string = "http://localhost:3000/ofertas"
    
    constructor(private http: HttpClient) { }

    public getOfertas(): Promise<Oferta[]> {
        //efetuar uma requisão http
        //retornar uma promise Oferta[]
        return firstValueFrom(this.http.get<Oferta[]>(`${URL_API}/ofertas?destaque=true`));
    }

    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
        return firstValueFrom(this.http.get<Oferta[]>(`${URL_API}/ofertas?categoria=${categoria}`));
    }

    public getOfertaPorId(id: number): Promise<Oferta> {
        return firstValueFrom(this.http.get<Oferta>(`${URL_API}/ofertas?id=${id}`))
            .then((resposta: any) => { return resposta[0] });
    }

    public getComoUsarOfertaPorId(id: number): Promise<string> {
        return firstValueFrom(this.http.get<string>(`${URL_API}/como-usar?id=${id}`))
            .then((reposta: any) => { return reposta[0].descricao });
    }

    public getOndeFicaOfertaPorId(id: number): Promise<string> {
        return firstValueFrom(this.http.get<string>(`${URL_API}/onde-fica?id=${id}`))
            .then((reposta: any) => { return reposta[0].descricao });
    }

    public pesquisaOfertas(termo: string): Observable<Oferta[]> {
        return this.http.get<Oferta[]>(`${URL_API}/ofertas?descricao_oferta_like=${termo}`);
    }
}