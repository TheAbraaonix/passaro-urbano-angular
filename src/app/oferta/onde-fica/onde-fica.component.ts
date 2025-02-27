import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../../ofertas.services';

@Component({
  selector: 'app-onde-fica',
  standalone: true,
  imports: [],
  providers: [OfertasService],
  templateUrl: './onde-fica.component.html',
  styleUrl: './onde-fica.component.css'
})
export class OndeFicaComponent implements OnInit {
  public ondeFica: string = "";
  
  constructor(
    private route: ActivatedRoute,
    private ofertaService: OfertasService
  ) {}
  
  ngOnInit(): void {
    this.route.parent!.params.subscribe((parametros: Params) => {
      this.ofertaService.getOndeFicaOfertaPorId(parametros["id"])
        .then((resposta: string) => { this.ondeFica = resposta; });
    });
  }
}
