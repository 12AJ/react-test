import { useEffect, useState } from 'react';
import './listPage.css';

function ListPage() {
    const [productList, setProductList] = useState([]);
    const [productsPerPage, setProductsPerPage] = useState([5]); 
    const [currentPage, setCurrentPage] = useState(1); 
  
    useEffect(() => {
      fetch('https://fakestoreapi.com/products')
        .then((res) => res.json())
        .then((data) => setProductList(data));
    }, []);
  
    function changePagination(e) {
      const checkbox = e.target;
      const value = parseInt(checkbox.value);
  
      setProductsPerPage((prev) => {
        if (checkbox.checked) {
          return [...prev, value];
        } else {
          return prev.filter((item) => item !== value);
        }
      });
    }
  
    const totalProductsPerPage = productsPerPage.reduce((acc, num) => acc + num, 0);
  
    const validTotalProductsPerPage = totalProductsPerPage > 0 ? totalProductsPerPage : 5;
  
    const totalPages = Math.ceil(productList.length / validTotalProductsPerPage);
  
    const validTotalPages = totalPages > 0 ? totalPages : 1;
  
    const displayedProducts = productList.slice(
      (currentPage - 1) * validTotalProductsPerPage,
      currentPage * validTotalProductsPerPage
    );
  
    const handlePageChange = (pageNum) => {
      setCurrentPage(pageNum);
    };
  
    const paginationNumbers = Array.from({ length: validTotalPages }, (_, i) => i + 1);
  return (
    <>
      <h2 className='heading'>FakeStore</h2>
      <div className="appOuter">
        <div className="filter">
          <p>Show Products Per Page</p><br />
          <label htmlFor="checkbox1">
            <input
              type="checkbox"
              checked={productsPerPage.includes(5)}
              name="checkbox1"
              value="5"
              onChange={changePagination}
              id="checkbox1"
            />{' '}
            5
          </label><br />
          <label htmlFor="checkbox2">
            <input
              type="checkbox"
              checked={productsPerPage.includes(10)}
              name="checkbox2"
              value="10"
              onChange={changePagination}
              id="checkbox2"
            />{' '}
            10
          </label><br />
          <label htmlFor="checkbox3">
            <input
              type="checkbox"
              checked={productsPerPage.includes(15)}
              name="checkbox3"
              value="15"
              onChange={changePagination}
              id="checkbox3"
            />{' '}
            15
          </label><br />
          <label htmlFor="checkbox4">
            <input
              type="checkbox"
              checked={productsPerPage.includes(20)}
              name="checkbox4"
              value="20"
              onChange={changePagination}
              id="checkbox4"
            />{' '}
            20
          </label><br />
        </div>

        <div className="productList">
          {displayedProducts.map((ele, i) => {
            return (
              <div className="productCard" key={i}>
                <img src={ele.image} className="card-img" alt="productImage" />
                <div className="card-body">
                  <h5 className="card-title">{ele.title}</h5>
                  <p className="card-desc">{ele.description}</p>
                  <p className="card-price">$ {ele.price}</p>
                </div>
              </div>
            );
          })}


<ul className="pagination">
          {paginationNumbers.map((pageNum) => (
            <li
              key={pageNum}
              className={currentPage === pageNum ? 'active' : ''}
              onClick={() => handlePageChange(pageNum)}
            >
              {pageNum}
            </li>
          ))}
        </ul>
        </div>

      </div>
    </>
  );
}

export default ListPage;
