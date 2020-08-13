import React, { Component } from 'react';
import './main.min.css';

class App extends Component {
  state = {
    books: [
    ]
  }

  booksCount = "";

  //Get the URL Parameters from the browser
  queryString = window.location.search;
  urlParams = new URLSearchParams(this.queryString);

  //Set the current page to the value from the URL Parameter
  currentPage = +this.urlParams.get('page');

  //Set the values of the pagination buttons for the current page
  previousPage = this.currentPage - 1;
  nextPage =  this.currentPage + 1;
  
  
  itemsPerPage= "20";

  

  componentDidMount() {

    //Send a POST request to the API
    var data = new FormData();
    const payload = {
      page: this.currentPage.toString(),
      itemsPerPage: this.itemsPerPage,
      filters: []
    
    };
    data.append("myjsonkey", JSON.stringify(payload));
    
    fetch('http://nyx.vima.ekt.gr:3000/api/books', {
        method: 'POST',
        body: data
    })
    .then(res => res.json())
    .then((data) => {
      //Set the list of books on the page
      this.setState({ books: data.books })
      this.booksCount = data.count;
      console.log(this.state.books);
    })
    .catch(console.log)

    
  }

  render() {

    return (
      //Used mostly Bootstrap classes with some custom css | Find the CSS files in src/main.css and the SCSS file in scss/main.scss
       <div className="container">
        <div className="col-xs-12">
        <div className="page-info">
        <h1 className="text-center general-separator to-upper">My Greek Books</h1>
        <h2 className="text-center general-separator">Catalogue page: <strong>{this.currentPage.toString()}</strong></h2>
        </div>
        {this.state.books.map((book) => (
          <div className="card general-separator--sp sp-card-border" key={book.id}>
            <div className="card-body">
              <h3 className="card-title text-center"><strong>Title:</strong> <br />{book.book_title}</h3>
              <h4 className="card-title"><strong>Author:</strong> {book.book_author}</h4>
              <h5 className="card-title"><strong>Number of Pages:</strong> {book.book_pages}</h5>
              <h5 className="card-title"><strong>Publication City:</strong> {book.book_publication_city}</h5>
              <h5 className="card-title"><strong>Country:</strong> {book.book_publication_country}</h5>
              <h5 className="card-title"><strong>Year:</strong> {book.book_publication_year}</h5>
              <h5 className="card-title"><strong>ID:</strong> {book.id}</h5>
            </div>
          </div>
        ))}
         <div className="page-info">
       <h6 className="text-center general-separator"><strong>Items per page:</strong> {this.itemsPerPage}</h6>
          <table className="footer-table general-separator">
            <tbody>
              <tr>

              <td align="center">
              <button className="footer-button" onClick={ () => {
                window.location.href = 
                window.location.href.split("?page")[0] + 
                "?page="+ this.previousPage.toString()
                
                }}> Previous </button>


              </td>
 
              <td align="center">

             
              <button className="footer-button" onClick={ () => {
                window.location.href = 
                window.location.href.split("?page")[0] + 
                "?page="+ this.nextPage.toString()
                
                }}> Next </button>
</td>
              </tr>
            </tbody>


          </table>
          </div>
        
         
          </div>
        </div>
       
    );
  }
}

export default App;