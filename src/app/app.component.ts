import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopoComponent } from "./topo/topo.component";
import { HomeComponent } from "./home/home.component";
import { RodapeComponent } from "./rodape/rodape.component";
import { RestaurantesComponent } from "./restaurantes/restaurantes.component";
import { DiversaoComponent } from "./diversao/diversao.component";
import { DescricaoReduzidaPipe } from './util/descricao-reduzida.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { CarrinhoService } from './carrinho.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopoComponent, HomeComponent, RodapeComponent, RestaurantesComponent, DiversaoComponent, DescricaoReduzidaPipe, ReactiveFormsModule],
  providers: [CarrinhoService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app2';
}
