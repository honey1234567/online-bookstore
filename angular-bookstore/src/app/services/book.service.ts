import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookCategory} from '../common/book-category';
import { Book } from '../common/book';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  // dev mode url when running through eclipse
  // private baseUrl = "http://localhost:8080/bookstore/api/v1/books";
private baseUrl =  `${environment.baseUrl}/books`;
  private categoryUrl = `${environment.baseUrl}/book-category`;
  // // prod mode url when running throughtomacat server
  // private baseUrl = "http://localhost:8080/bookstore/books";
  // private categoryUrl = "http://localhost:8080/bookstore/book-category";
  constructor(private httpClient: HttpClient) { }
  // getBooks(theCategoryId: number): Observable<Book[]>{
  //   const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}`;
  //   return this.getBooksList(searchUrl);
  // }
  
  get(bookId: number): Observable<Book> {

    const bookDetailsUrl = `${this.baseUrl}/${bookId}`;

    return this.httpClient.get<Book>(bookDetailsUrl);

  }


   getBooks(theCategoryId:number,currentPage:number,pageSize:number): Observable<GetResponseBooks> {
     console.log(currentPage)
     const current:string = currentPage.toString();
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}&page=${currentPage}&size=${pageSize}`;
    return this.httpClient.get<GetResponseBooks>(searchUrl);
  }
  getBookCategories(): Observable<BookCategory[]>{
    return this.httpClient.get<GetResponseBookCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.bookCateogry)
    );
  }
  
  searchBooks(keyword: string, currentPage: number, pageSize: number): Observable<GetResponseBooks>{
    const searchUrl = `${this.baseUrl}/search/searchbykeyword?name=${keyword}&page=${currentPage}&size=${pageSize}`;
    //return this.getBooksList(searchUrl);
    return this.httpClient.get<GetResponseBooks>(searchUrl);
  }
  private getBooksList(searchUrl: string): Observable<Book[]> {
    return this.httpClient.get<GetResponseBooks>(searchUrl).pipe(
      map(response => response._embedded.books)
    );
  }
  
}
interface GetResponseBooks{
  _embedded: {
    books: Book[];
  },
  page: {
    //cureent page
    size: number,
    //total number of records in database
    totalElements: number,
    //total number of pages, starts from 0 index
    totalPages: number,
    //current page
    number: number
  }
}
interface GetResponseBookCategory{
  _embedded: {
    bookCateogry: BookCategory[];
  }
}
  
