import {Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2} from '@angular/core';
import {ProductService} from "../../services/common/models/product.service";
import {DeleteProduct} from "../../contracts/DeleteProduct";
import {BaseComponent, SpinnerType} from "../../base/base.component";
import {NgxSpinnerService} from "ngx-spinner";

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective{
  @Input() id: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private productService: ProductService,
    private spinner: NgxSpinnerService
  ) {
    const div = _renderer.createElement('div');
    div.setAttribute('class', 'tooltip');
    div.setAttribute('data-tip', 'Sil');
    div.setAttribute('style', 'cursor: pointer');
    const innerHtmlVal = `<button title="Sil" class="btn btn-circle btn-outline btn-error" type="button">
                            <svg (click)="$event.stopPropagation()" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                          </button>`;
    div.innerHTML = innerHtmlVal;
    _renderer.appendChild(element.nativeElement, div);
  }

  @HostListener('click')
  async onClick() {
    await this.spinner.show(SpinnerType.BallScaleMultiple);
    const tableRow: HTMLTableRowElement = this.element.nativeElement.parentElement.parentElement
    const fadeEffect = setInterval(() => {
      if (!tableRow.style.opacity) {
        tableRow.style.opacity = String(1);
      }

      if (tableRow.style.opacity > String(0)) {
        // @ts-ignore
        tableRow.style.opacity -= 0.1
      } else {
        clearInterval(fadeEffect)
      }

    }, 100);
    setTimeout(() => {
      tableRow.remove();
    }, 600);
    const deleteProduct = new DeleteProduct();
    deleteProduct.id = this.id;
    await this.productService.delete(deleteProduct);
    this.callback.emit();
    await this.spinner.hide(SpinnerType.BallScaleMultiple);
  }

}



