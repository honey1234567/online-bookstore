import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-category',
  templateUrl: './book-category.component.html',
  styleUrls: ['./book-category.component.css']
})
export class BookCategoryComponent implements OnInit {
  bookCategories: any[];
  constructor(private _bookService: BookService) { }

  ngOnInit() {
    this.listBookCategories();
  }

  listBookCategories(){
    this._bookService.getBookCategories().subscribe(
      data => {
        console.log(data);
        this.bookCategories = data}
    );
  }

}