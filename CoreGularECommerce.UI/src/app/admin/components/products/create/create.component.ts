import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {CreateProduct} from 'src/app/contracts/CreateProduct';
import {ProductService} from 'src/app/services/common/models/product.service';
import {BaseComponent, SpinnerType} from "../../../../base/base.component";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertifyService, MessageType, Position} from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {
  @ViewChild('txtProductName') productNameVariable: ElementRef;
  @ViewChild('txtStock') stockVariable: ElementRef;
  @ViewChild('txtPrice') priceVariable: ElementRef;

  @Output() createdProduct: EventEmitter<CreateProduct> = new EventEmitter<CreateProduct>();

  constructor(
    spinner: NgxSpinnerService,
    private productService: ProductService,
    private alertify: AlertifyService
  ) {
    super(spinner);
  }

  ngOnInit(): void {
  }

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallAtom);
    const createProduct: CreateProduct = new CreateProduct();
    createProduct.name = name.value;
    createProduct.stock = Number(stock.value);
    createProduct.price = parseFloat(price.value ? price.value.toString() : "0");
    this.productService.create(createProduct, async () => {
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertify.message('Ürün ekleme işlemi başarılı', {
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight
      });
      this.createdProduct.emit(createProduct);
    }, (errorMessage) => {
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertify.message(errorMessage, {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      })
    });

    this.doReset();
  }

  doReset() {
    this.productNameVariable.nativeElement.value = '';
    this.stockVariable.nativeElement.value = '';
    this.priceVariable.nativeElement.value = '';
  }

}
