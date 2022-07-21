import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ProductService} from 'src/app/services/common/models/product.service';
import {BaseComponent, SpinnerType} from "../../../../base/base.component";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertifyService, MessageType, Position} from 'src/app/services/admin/alertify.service';
import { ListProduct } from 'src/app/contracts/ListProduct';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'stock', 'price', 'createdAt', 'updatedAt', '_actions'];
  dataSource: MatTableDataSource<ListProduct> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private productService: ProductService,
    private alertify: AlertifyService,
    spinner: NgxSpinnerService
  ) {
    super(spinner)
  }

  async ngOnInit(): Promise<void> {
    await this.getProducts();
  }

  ngAfterViewInit(): void {

  }

  async getProducts() {
    this.showSpinner(SpinnerType.BallAtom);

    const allProducts: {count: number, rows: ListProduct[]} = await this.productService.read(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5,() => {
      this.hideSpinner(SpinnerType.BallAtom);
    }, errorMessage => {
      this.alertify.message(errorMessage, {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopCenter
      });
    })

    this.dataSource = new MatTableDataSource<ListProduct>(allProducts.rows);
    this.paginator.length = allProducts.count;
  }

  async pageChanged() {
    await this.getProducts();
  }

}
