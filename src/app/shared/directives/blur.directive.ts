import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appBlur]'
})
export class BlurDirective {

  @Input('appBlur') callback: Function;

  @HostListener('blur') onBlur() {
    this.callback();
  }

  constructor() { }

}
