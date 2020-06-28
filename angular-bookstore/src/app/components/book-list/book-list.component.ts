import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/common/book';
import { ActivatedRoute } from '@angular/router';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[];
  currentCategoryId: number = 1;
  searchMode: boolean = false;
  previousCategoryId: number = 1;
  //properties for client side paging

  //properties for client side paging

  //pageOfItems: Array<Book>;
  //pageSize: number = 6;

  //new properties for server-side paging
  currentPage: number = 1;
  pageSize: number = 5;
  totalRecords: number = 0;


  constructor(private _bookService: BookService,
    private _activatedRoute: ActivatedRoute ,
    private _cartService: CartService,
     config: NgbPaginationConfig) {
      config.boundaryLinks = true;
      config.maxSize = 3;
    }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(() => {//with subscribe listbook will get cal agin on changing route
      //param
      this.listBooks();
    })
  }
  listBooks() {
    this.searchMode = this._activatedRoute.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      //do search work
      this.handleSearchBooks();
    } else {
      //display books based on category
      this.handleListBooks();
    }
  }
  handleListBooks() {
    const hasCategoryId: boolean = this._activatedRoute.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');//+ is used t convert into an integer
    } else {
      this.currentCategoryId = 1;
    }
    //setting up the page number to 1
    //if user navigates to other category
    if (this.previousCategoryId != this.currentCategoryId) {
      this.currentPage = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    this._bookService.getBooks(this.currentCategoryId,
      <number>this.currentPage - 1,
      this.pageSize).subscribe(this.processPaginate()
      );
  }
  handleSearchBooks() {
    const keyword: string = this._activatedRoute.snapshot.paramMap.get('keyword');

    this._bookService.searchBooks(keyword,this.currentPage-1,1)
      .subscribe(this.processPaginate());
  }
  /*client side paging
pageClick(pageOfItems: Array<Book>) {
  // update current page of items
  this.pageOfItems = pageOfItems;
} */
  //client side paging and server side paging
  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
     this.currentPage = 1;
    this.listBooks();
  }
  processPaginate() {
    return data => {
      this.books = data._embedded.books;
      //page number starts from 1 index in ngb-bootstrap
      this.currentPage = data.page.number + 1;
      this.totalRecords = data.page.totalElements;
      this.pageSize = data.page.size;
    }
  }
  addToCart(book: Book){
    console.log(`book name: ${book.name}, and price: ${book.unitPrice}`);
    const cartItem = new CartItem(book);
    this._cartService.addToCart(cartItem);
  }
}
