import { Component, Input, Directive, HostListener, ElementRef} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[brmasker]',
})
export class MaskerDirective {
  constructor(private element: ElementRef) {}
  @Input('brmasker') brmaskere: any;
  @HostListener('keyup', ['$event'])
  inputChanged(event: any): void {
    if (event.target.value) {
      this.onInput(event.target.value);
    }
  }
  private onInput(value: any): void {
    const ret = this.formataCampo(value, this.brmaskere.mask, this.brmaskere.len);
    if (ret) {
      this.element.nativeElement.value = ret;
    }
  }
  private formataCampo(campo: string, Mascara: string, tamanho: number): any {
    let boleanoMascara;
    const exp = /\-|\.|\/|\(|\)|\,|\*|\+|\@|\#|\R|\$|\&|\%| /g;
    const campoSoNumeros = campo.toString().replace( exp, '' );
    let posicaoCampo = 0;
    let NovoValorCampo = '';
    let TamanhoMascara = campoSoNumeros.length;
    for (let i = 0; i < TamanhoMascara; i++) {
      if (i < tamanho) {
        boleanoMascara  = ((Mascara.charAt(i) === '-') || (Mascara.charAt(i) === '.') || (Mascara.charAt(i) === '/'));
        boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) === '(') || (Mascara.charAt(i) === ')') || (Mascara.charAt(i) === ' '));
        boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) === ',') || (Mascara.charAt(i) === '*') || (Mascara.charAt(i) === '+'));
        boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) === '@') || (Mascara.charAt(i) === '#') || (Mascara.charAt(i) === 'R'));
        boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) === '$') || (Mascara.charAt(i) === '&') || (Mascara.charAt(i) === '%'));
        if (boleanoMascara) {
          NovoValorCampo += Mascara.charAt(i);
          TamanhoMascara++;
        } else {
          NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
          posicaoCampo++;
        }
      }
    }
    return NovoValorCampo;
  }

}
