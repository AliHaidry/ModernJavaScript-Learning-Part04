class Book
{
    constructor(title, author, isbn)
    {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI 
{
    addBookToList(book)
    {
    const list = document.getElementById('book-list');
    // Create tr element
    const row = document.createElement('tr');
    // Insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X<a></td>
    `;

    list.appendChild(row);
    }

    showAlert(message, className)
    {
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent element
    const container = document.querySelector('.container');
    // Get form
    const form = document.querySelector('#book-form');
    // Insert alert
    container.insertBefore(div,form);
    // Timeout after 3 sec
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 2000);
    }

    deleteBook(target)
    {
        if(target.className === 'delete')
        {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields()
    {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}


/** Event Listeners for add book  */
document.getElementById('book-form').addEventListener('submit',
function(e){
    //Get forms values.
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn   = document.getElementById('isbn').value;

    // Instantiate book      
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // Validate logic

    if(title === '' || author === '' || isbn === '')
    {
        ui.showAlert('Please fill in all the fields', 'error');
    }
    else
    {

    // Add book to list
    ui.addBookToList(book);

    // Show success
    ui.showAlert('Book Added!', 'success');

    // Clear fields
    ui.clearFields();
    }

   
   
    e.preventDefault();
});

/** Event listener for delete */
document.getElementById('book-list').addEventListener('click', function(e) {

    // Instantiate UI
    const ui = new UI();

    ui.deleteBook(e.target);

    //Show message
    ui.showAlert('Book Removed!', 'success');
    
    e.preventDefault();
});