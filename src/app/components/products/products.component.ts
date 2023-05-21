import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Products } from 'src/app/interfaces/products.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  public page: number = 0;
  public pageSize: number = 9;
  public paginatedProducts: Products[] = [];
  public currentPage: number = 1;
  public itemsPerPage: number = 6;
  public totalItems: number = 0;
  public products: any[] = [];
  public totalPages: number = 0;
  isModalOpen: boolean = false;
  selectedElement: any;

  constructor(
    public _productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.getPaginatedProducts();
    this.divideProductosEnPaginas()
  }

  getPaginatedProducts(){
    this._productsService.getAllProducts().subscribe((resp: Products[]) =>{
      this.paginatedProducts = resp;
      this.products = this.paginatedProducts;
      this.divideProductosEnPaginas();
    })
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.divideProductosEnPaginas();
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.divideProductosEnPaginas();
    }
  }

  divideProductosEnPaginas() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);

    this.totalItems = this.products.length;
    this.totalPages = Math.floor(this.totalItems / this.itemsPerPage);
  }

  openModal(element: any) {
    this.selectedElement = element;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
