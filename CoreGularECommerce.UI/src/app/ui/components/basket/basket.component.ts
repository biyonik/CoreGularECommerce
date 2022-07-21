import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {BaseComponent, SpinnerType} from "../../../base/base.component";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent extends BaseComponent implements OnInit {

  constructor(spinnerService: NgxSpinnerService) {
    super(spinnerService);
  }

  async ngOnInit(): Promise<void> {
    await this.showSpinner(SpinnerType.BallScaleMultiple);
  }

}
