package in.shreya.onlinebookstore.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.shreya.onlinebookstore.entity.Book;
import in.shreya.onlinebookstore.repositry.BookRepository;

@Service
public class BookService {
	@Autowired
	BookRepository repo;
	public List<Book> getAllBooks() {
		List<Book> books =repo.findAll();
		return books;
	}

}
