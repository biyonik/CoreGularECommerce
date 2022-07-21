import {Component, OnInit, ViewChild} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {BaseComponent, SpinnerType} from "../../../base/base.component";
import {CreateProduct} from "../../../contracts/CreateProduct";
import {ListComponent} from "./list/list.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {
  @ViewChild(ListComponent) listComponent: ListComponent;

  constructor(
    spinnerService: NgxSpinnerService
  ) {
    super(spinnerService);
  }

  async ngOnInit(): Promise<void> {
    await this.showSpinner(SpinnerType.BallScaleMultiple);
  }

  async createdProduct(createdProduct: CreateProduct) {
    await this.listComponent.getProducts();
  }

}
