import { ItemCarrinho } from "./shared/item-carrinho.model";
import { Oferta } from "./shared/oferta.model";

export class CarrinhoService {
    public itens: ItemCarrinho[] = [];

    public exibirItens(): ItemCarrinho[] {
        return this.itens;
    }

    public incluirItem(oferta: Oferta): void {
        let itemCarrinho: ItemCarrinho = new ItemCarrinho(
            oferta.id,
            oferta.imagens[0],
            oferta.titulo,
            oferta.descricao_oferta,
            oferta.valor,
            1
        );

        //verificar se o item já não existe dentro de this.itens
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);

        if (itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade += 1;
        } else {
            this.itens.push(itemCarrinho);
        }
    }

    public totalCarrinhoCompras(): number {
        let total: number = 0;

        this.itens.map((item: ItemCarrinho) => {
            total += (item.valor * item.quantidade);
        });

        return total;
    }

    public adicionarQuantidade(item: ItemCarrinho): void {
        let itemCarrinhoEncontrado = this.itens.find((itemCarrinho: ItemCarrinho) => itemCarrinho.id === item.id);

        if (itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade += 1;
        }
    }

    public diminuirQuantidade(item: ItemCarrinho): void {
        let itemCarrinhoEncontrado = this.itens.find((itemCarrinho: ItemCarrinho) => itemCarrinho.id === item.id);

        if (itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade -= 1;

            if (itemCarrinhoEncontrado.quantidade === 0) {
                this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrado), 1);
            }
        }
    }

    public limparCarrinho(): void {
        this.itens = [];
    }
}