package in.shreya.onlinebookstore.repositry;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import in.shreya.onlinebookstore.entity.Book;

public interface BookRepository  extends JpaRepository<Book, Long>{
}