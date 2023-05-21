import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/interfaces/products.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public products: Products[] = [];
  public currentIndex = 0;
  public slideInterval: any;

  constructor(
    public _productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.startSlideShow()
  }

  getAllProducts(){
    this._productsService.getAllProducts().subscribe((resp: Products[]) =>{
      this.products = resp
      console.log(this.products)
    })
  };

  startSlideShow() {
    this.slideInterval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.products.length;
    }, 3000);
  }

}
