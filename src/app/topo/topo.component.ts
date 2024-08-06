import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OfertasService } from '../ofertas.services';
import { Observable, of, Subject } from 'rxjs';
import { Oferta } from '../shared/oferta.model';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { DescricaoReduzidaPipe } from '../util/descricao-reduzida.pipe';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-topo',
  standalone: true,
  imports: [RouterModule, NgFor, DescricaoReduzidaPipe, AsyncPipe],
  providers: [OfertasService],
  templateUrl: './topo.component.html',
  styleUrl: './topo.component.css'
})
export class TopoComponent implements OnInit {
  public ofertas?: Observable<Oferta[]>;
  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertaService: OfertasService) { }

  ngOnInit(): void {
    this.ofertas = this.subjectPesquisa.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((termo: string) => {
        if (termo.trim() === "") {
          //retornar um observable de array de ofertas vazio
          return of<Oferta[]>([]);
        }
        return this.ofertaService.pesquisaOfertas(termo);
      }), catchError((err: any) => {
        console.log(err);
        return of<Oferta[]>([]);
      }));
  }

  public pesquisa(termoDaBusca: string): void {
    this.subjectPesquisa.next(termoDaBusca);
  }

  public limpaPesquisa(): void {
    this.subjectPesquisa.next("");
  }
}
