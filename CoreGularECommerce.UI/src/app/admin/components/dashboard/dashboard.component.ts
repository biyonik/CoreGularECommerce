import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {BaseComponent, SpinnerType} from "../../../base/base.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(spinnerService: NgxSpinnerService) {
    super(spinnerService);
  }

  async ngOnInit(): Promise<void> {
    await this.showSpinner(SpinnerType.BallScaleMultiple);
  }

}
