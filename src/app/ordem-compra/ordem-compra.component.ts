import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { OrdemCompraSucessoComponent } from "../ordem-compra-sucesso/ordem-compra-sucesso.component";
import { CarrinhoService } from '../carrinho.service';
import { ItemCarrinho } from '../shared/item-carrinho.model';

@Component({
  selector: 'app-ordem-compra',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, OrdemCompraSucessoComponent, NgFor, CurrencyPipe],
  providers: [OrdemCompraService],
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  
})
export class OrdemCompraComponent implements OnInit {
  public idPedidoCompra?: number;
  public itensCarrinho: ItemCarrinho[] = [];
  
  public formulario: FormGroup = new FormGroup({
    'endereco': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl(null, [Validators.required])
  });
  
  constructor(
    private ordemCompraService: OrdemCompraService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.exibirItens();
  }

  public confirmarCompra(): void {
    if(this.carrinhoService.exibirItens().length === 0) {
      alert('Você não selecionou nenhum item!');
      return;
    }
    
    let pedido: Pedido = new Pedido(
      this.formulario.value.endereco, 
      this.formulario.value.numero, 
      this.formulario.value.complemento, 
      this.formulario.value.formaPagamento,
      this.carrinhoService.exibirItens()
    );

    this.ordemCompraService.efetivarCompra(pedido)
      .subscribe((idPedido: number) => { 
        this.idPedidoCompra = idPedido; 
        this.carrinhoService.limparCarrinho();
      });
  }

  public valorTotal(): number {
    return this.carrinhoService.totalCarrinhoCompras();
  }

  public adicionar(item: ItemCarrinho): void {
    this.carrinhoService.adicionarQuantidade(item);
  }

  public diminuir(item: ItemCarrinho): void {
    this.carrinhoService.diminuirQuantidade(item);
  }
}
