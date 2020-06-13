package in.shreya.onlinebookstore.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import in.shreya.onlinebookstore.entity.Book;
import in.shreya.onlinebookstore.repositry.BookRepository;
import in.shreya.onlinebookstore.service.BookService;
@RestController()
@RequestMapping("/all-books")
public class Books {
	@Autowired
	private BookService bookrepo;
@GetMapping
	public ResponseEntity<List<Book>> getBooks() 
	{
	List<Book> list=bookrepo.getAllBooks();
	    return new ResponseEntity<List<Book>>(list,new HttpHeaders(),HttpStatus.OK);
	}
}
