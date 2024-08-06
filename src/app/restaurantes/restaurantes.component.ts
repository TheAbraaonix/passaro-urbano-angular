import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model';
import { OfertasService } from '../ofertas.services';
import { CurrencyPipe, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-restaurantes',
  standalone: true,
  imports: [NgFor, RouterModule, CurrencyPipe],
  providers: [OfertasService],
  templateUrl: './restaurantes.component.html',
  styleUrl: './restaurantes.component.css'
})
export class RestaurantesComponent implements OnInit {
  public ofertas!: Oferta[];

  constructor(private ofertaService: OfertasService) { }

  ngOnInit(): void {
    this.ofertaService.getOfertasPorCategoria("restaurante")
      .then((ofertas: Oferta[]) => { this.ofertas = ofertas; });
  }
}
