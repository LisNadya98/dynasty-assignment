import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[positiveWholeNumber]'
})
export class NumberDirective {
  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    let initalValue = this._el.nativeElement.value;
    initalValue = initalValue.replace(/[^0-9]*/g, '');
    if (initalValue.length > 1 ) {
      initalValue = initalValue.replace(/^[0]+/, '');
    }
    this._el.nativeElement.value = initalValue;
  }
}
