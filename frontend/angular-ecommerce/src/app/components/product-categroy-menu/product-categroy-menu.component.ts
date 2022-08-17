import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-categroy-menu',
  templateUrl: './product-categroy-menu.component.html',
  styleUrls: ['./product-categroy-menu.component.css']
})
export class ProductCategroyMenuComponent implements OnInit {

  productCategories: ProductCategory[];
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.listProductCategories();
  }
  listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        console.log('Product Categories = ' + JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }

}
