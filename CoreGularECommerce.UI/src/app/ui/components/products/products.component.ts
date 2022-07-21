import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {BaseComponent, SpinnerType} from "../../../base/base.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinnerService: NgxSpinnerService) {
    super(spinnerService);
  }

  async ngOnInit(): Promise<void> {
    await this.showSpinner(SpinnerType.BallScaleMultiple);
  }

}
