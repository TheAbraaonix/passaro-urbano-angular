import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ordem-compra-sucesso',
  standalone: true,
  imports: [],
  templateUrl: './ordem-compra-sucesso.component.html',
  styleUrl: './ordem-compra-sucesso.component.css'
})
export class OrdemCompraSucessoComponent {
  @Input() public idPedidoCompra: number = 0;
}
