import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.services';
import { Oferta } from '../shared/oferta.model';
import { CurrencyPipe, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-diversao',
  standalone: true,
  imports: [NgFor, RouterModule, CurrencyPipe],
  providers: [OfertasService],
  templateUrl: './diversao.component.html',
  styleUrl: './diversao.component.css'
})
export class DiversaoComponent implements OnInit {
  public ofertas!: Oferta[];

  constructor(private ofertaService: OfertasService) { }

  ngOnInit(): void {
    this.ofertaService.getOfertasPorCategoria("diversao")
      .then((ofertas: Oferta[]) => { this.ofertas = ofertas; });
  }
}
