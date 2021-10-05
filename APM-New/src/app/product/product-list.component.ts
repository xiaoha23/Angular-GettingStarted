import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";


@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit, OnDestroy{
   
    constructor(private productService: ProductService) {};

    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessageL: string = '';
    sub!: Subscription;

    private _listFilter: string = '';
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        console.log('In setter:', value);
        this.filteredProducts = this.performFilter(this._listFilter);

    }
    filteredProducts: IProduct[] = [];

    products: IProduct[] = [];

    toggleImage(): void{
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
    // this.listFilter = 'cart';
    this.sub = this.productService.getProducts().subscribe({
        next: products => {
            this.products = products;
            this.filteredProducts = this.products;
        },
        error: err => this.errorMessageL = err        
    })
    
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLowerCase();
        return this.products.filter((product: IProduct) =>
            product.productName.toLowerCase().includes(filterBy));
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }
}