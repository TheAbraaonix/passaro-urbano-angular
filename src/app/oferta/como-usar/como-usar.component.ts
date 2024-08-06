import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../../ofertas.services';

@Component({
  selector: 'app-como-usar',
  standalone: true,
  imports: [],
  providers: [OfertasService],
  templateUrl: './como-usar.component.html',
  styleUrl: './como-usar.component.css'
})
export class ComoUsarComponent implements OnInit {
  public comoUsar: string = "";

  constructor(
    private route: ActivatedRoute,
    private ofertaService: OfertasService
  ) { }

  ngOnInit(): void {
    this.route.parent!.params.subscribe((parametros: Params) => {
      this.ofertaService.getComoUsarOfertaPorId(parametros["id"])
        .then((resposta: string) => { this.comoUsar = resposta; });
    });
  }
}
