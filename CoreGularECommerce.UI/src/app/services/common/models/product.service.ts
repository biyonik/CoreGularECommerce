import {Injectable} from '@angular/core';
import {CreateProduct} from 'src/app/contracts/CreateProduct';
import {HttpClientService} from '../http-client.service';
import {UpdateProduct} from "../../../contracts/UpdateProduct";
import {DeleteProduct} from "../../../contracts/DeleteProduct";
import {HttpErrorResponse} from "@angular/common/http";
import {ListProduct} from "../../../contracts/ListProduct";
import {firstValueFrom, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpClientService: HttpClientService
  ) {
  }

  create(product: CreateProduct, successCallBack?: () => void, errorCallback?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: 'Products'
    }, product).subscribe(result => {
      successCallBack();
    }, (errorResponse: HttpErrorResponse) => {
      const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
      let message = '';
      _error.forEach((keyValuePair, index) => {
        keyValuePair.value.forEach((_v, _index) => {
          message += `${_v}<br>`;
        });
      });
      errorCallback(message);
    });
  }

  async read(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallback?: (errorMessage: string) => void): Promise<{count: number, rows: ListProduct[]}> {
    const promiseData: Promise<{count: number, rows: ListProduct[]}> = this.httpClientService.get<{count: number, rows: ListProduct[]}>({
      controller: 'Products',
      queryString: `page=${page}&size=${size}`
    }).toPromise();

    promiseData
      .then(response => {
        successCallBack();
      })
      .catch((errorResponse: HttpErrorResponse) => {
        errorCallback(errorResponse.message);
      });

    return await promiseData;
  }

  update(product: UpdateProduct) {
  }

  async delete(product: DeleteProduct) {
    const deleteObservable$: Observable<DeleteProduct> = this.httpClientService.delete<DeleteProduct>({
      controller: 'Products'
    }, product);

    await firstValueFrom(deleteObservable$);
  }
}
