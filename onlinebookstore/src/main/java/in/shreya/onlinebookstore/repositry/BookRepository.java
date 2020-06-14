package in.shreya.onlinebookstore.repositry;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import in.shreya.onlinebookstore.entity.Book;
@CrossOrigin("http://localhost:4201")
public interface BookRepository  extends JpaRepository<Book, Long>{
	@RestResource(path = "categoryid")
	//Query -seelct * from tbl_book where category_id=id;
	Page<Book> findByCategoryId(@Param("id") Long id, Pageable pageable);
}