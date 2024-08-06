import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'descricaoReduzida', standalone: true})
export class DescricaoReduzidaPipe implements PipeTransform {
    transform(texto: string, truncarEm: number): string {
        if (texto.length > truncarEm) {
            return texto.slice(0, truncarEm) + '...';
        }
        return texto;
    }
}