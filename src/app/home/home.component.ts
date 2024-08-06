import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.services';
import { Oferta } from '../shared/oferta.model';
import { CurrencyPipe, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, RouterModule, CurrencyPipe],
  providers: [OfertasService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  public ofertas!: Oferta[];

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
    //this.ofertas = this.ofertasService.getOfertas();
    //console.log(this.ofertas);

    this.ofertasService.getOfertas()
      .then(
        (ofertas: Oferta[]) => { this.ofertas = ofertas; }
      )
      .catch(
        (param: any) => { console.log(param) }
      );
  }
}
