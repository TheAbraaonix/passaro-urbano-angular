import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { OfertasService } from '../ofertas.services';
import { Oferta } from '../shared/oferta.model';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { CarrinhoService } from '../carrinho.service';

@Component({
  selector: 'app-oferta',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule, CurrencyPipe],
  providers: [OfertasService],
  templateUrl: './oferta.component.html',
  styleUrl: './oferta.component.css'
})
export class OfertaComponent implements OnInit {
  public oferta!: Oferta;

  constructor(
    private route: ActivatedRoute,
    private ofertaService: OfertasService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((parametros: Params) => {
      this.ofertaService.getOfertaPorId(parametros["id"])
        .then((oferta: Oferta) => { this.oferta = oferta });
    });
  }

  public adicionarItemCarrinho(): void {
    this.carrinhoService.incluirItem(this.oferta);
  }
}

