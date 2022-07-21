import {NgxSpinnerService, Spinner} from "ngx-spinner";

export class BaseComponent{
  constructor(
    public spinner: NgxSpinnerService
  ) { }

  showSpinner(spinnerNameType: SpinnerType) {
    this.spinner.show();
    setTimeout(() => {
      this.hideSpinner(spinnerNameType);
    }, 3000);
  }

  hideSpinner(spinnerNameType?: SpinnerType) {
    this.spinner.hide().then(x => x);
  }

}

export enum SpinnerType {
  BallAtom = 's1',
  BallScaleMultiple = 's2',
  BallSpinClockwiseFadeRotating = 's3',
}
