document.addEventListener('DOMContentLoaded', function () {
    const reservationForm = document.getElementById('reservationForm');
    const bookCountInput = document.getElementById('bookCount');
    const errorMessage = document.getElementById('errorMessage');
    const formContainer = document.querySelector('.form-container');
    const booksTableContainer = document.getElementById('booksTableContainer');
    const booksTableBody = document.querySelector('#booksTable tbody');
    const submitBookCountButton = document.getElementById('submitBookCount');

    let bookCount = 0;
    let currentBook = 1;
    let booksData = [];

    // Handle the "Next" button click for the initial form
    submitBookCountButton.addEventListener('click', function () {
        const count = bookCountInput.value;

        // Validate the input
        if (/^\d+$/.test(count)) {
            errorMessage.classList.remove('show');
            bookCount = parseInt(count);
            currentBook = 1;
            booksData = [];
            generateBookDetailsForm(); // Generate the book details form
        } else {
            errorMessage.textContent = 'Invalid input. Please enter numbers only.';
            errorMessage.classList.add('show');
        }
    });

    // Function to generate the book details form
    function generateBookDetailsForm() {
        formContainer.innerHTML = `
            <h2>Book ${currentBook}</h2>
            <label for="bookName">Book Name</label>
            <input type="text" id="bookName" placeholder="Enter Book Name" required>

            <label for="price">Price</label>
            <input type="text" id="price" placeholder="Enter Price" required>

            <label for="authorName">Author Name</label>
            <input type="text" id="authorName" placeholder="Enter Author Name" required>

            <label for="authorEmail">Author Email</label>
            <input type="email" id="authorEmail" placeholder="Enter Author Email" required>

            <button type="button" id="nextBook">${currentBook === bookCount ? 'Finish' : 'Next Book'}</button>
            <span id="bookError" class="error-message"></span>
        `;

        const nextBookButton = document.getElementById('nextBook');
        nextBookButton.addEventListener('click', function () {
            const bookName = document.getElementById('bookName').value;
            const price = document.getElementById('price').value;
            const authorName = document.getElementById('authorName').value;
            const authorEmail = document.getElementById('authorEmail').value;

            // Validate inputs
            const bookError = document.getElementById('bookError');
            bookError.textContent = '';
            bookError.classList.remove('show');

            if (!/^[A-Za-z\s]+$/.test(bookName)) {
                bookError.textContent = 'Book Name must contain only letters.';
                bookError.classList.add('show');
                return;
            }

            if (!/^\d+(\.\d{1,2})?$/.test(price)) {
                bookError.textContent = 'Price must be a valid number.';
                bookError.classList.add('show');
                return;
            }

            if (!/^[A-Za-z\s]+$/.test(authorName)) {
                bookError.textContent = 'Author Name must contain only letters.';
                bookError.classList.add('show');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authorEmail)) {
                bookError.textContent = 'Author Email must be a valid email address.';
                bookError.classList.add('show');
                return;
            }

            // Save the book data
            booksData.push({ bookName, price, authorName, authorEmail });

            // Move to the next book or finish
            if (currentBook < bookCount) {
                currentBook++;
                generateBookDetailsForm(); // Generate the form for the next book
            } else {
                formContainer.style.display = 'none'; // Hide the form container
                booksTableContainer.style.display = 'block'; // Show the table
                displayBooksTable(); // Display the books in the table
            }
        });
    }

    // Function to display the books in a table
    function displayBooksTable() {
        booksTableBody.innerHTML = '';
        booksData.forEach((book, index) => {
            const row = `
                <tr>
                    <td>${book.bookName}</td>
                    <td>${book.price}</td>
                    <td>${book.authorName}</td>
                    <td>${book.authorEmail}</td>
                    <td>
                        <button class="edit" onclick="editBook(${index})">Edit</button>
                        <button class="delete" onclick="deleteBook(${index})">Delete</button>
                    </td>
                </tr>
            `;
            booksTableBody.insertAdjacentHTML('beforeend', row);
        });
    }

    // Function to edit a book
    window.editBook = function (index) {
        console.log(index);
        
        const book = booksData[index];
        booksTableContainer.style.display = 'none';
        formContainer.style.display = 'block';
        
        formContainer.innerHTML = `
            <h2>Edit Book ${index + 1}</h2>
            <label for="bookName">Book Name</label>
            <input type="text" id="bookName" value="${booksData[index].bookName}" required>

            <label for="price">Price</label>
            <input type="text" id="price" value="${book.price}" required>

            <label for="authorName">Author Name</label>
            <input type="text" id="authorName" value="${book.authorName}" required>

            <label for="authorEmail">Author Email</label>
            <input type="email" id="authorEmail" value="${book.authorEmail}" required>

            <button type="button" id="saveBook">Save</button>
            <span id="bookError" class="error-message"></span>
        `;

        const saveBookButton = document.getElementById('saveBook');
        saveBookButton.addEventListener('click', function () {
            const bookName = document.getElementById('bookName').value;
            const price = document.getElementById('price').value;
            const authorName = document.getElementById('authorName').value;
            const authorEmail = document.getElementById('authorEmail').value;

            // Validate inputs
            const bookError = document.getElementById('bookError');
            bookError.textContent = '';
            bookError.classList.remove('show');

            if (!/^[A-Za-z\s]+$/.test(bookName)) {
                bookError.textContent = 'Book Name must contain only letters.';
                bookError.classList.add('show');
                return;
            }

            if (!/^\d+(\.\d{1,2})?$/.test(price)) {
                bookError.textContent = 'Price must be a valid number.';
                bookError.classList.add('show');
                return;
            }

            if (!/^[A-Za-z\s]+$/.test(authorName)) {
                bookError.textContent = 'Author Name must contain only letters.';
                bookError.classList.add('show');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authorEmail)) {
                bookError.textContent = 'Author Email must be a valid email address.';
                bookError.classList.add('show');
                return;
            }

            // Update the book data
            booksData[index] = { bookName, price, authorName, authorEmail };
            formContainer.style.display = 'none'; // Hide the form container
            booksTableContainer.style.display = 'block' 
            displayBooksTable(); // Refresh the table
        });
    };

    // Function to delete a book
    window.deleteBook = function (index) {
        booksData.splice(index, 1); // Remove the book from the array
        displayBooksTable(); // Refresh the table
    
        // Check if all books are deleted
        if (booksData.length === 0) {
            booksTableContainer.innerHTML = `
                <div id="emptyMessage" style="
                    padding: 20px;
                    margin-top: 20px;
                    text-align: center;
                    font-size: 22px;
                    font-weight: bold;
                    color: white;
                    background-color: red;
                    border-radius: 10px;
                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
                ">
                    🚨 Oops! You have deleted all books. 🚨
                </div>
            `;
        }
    };
    
    document.addEventListener("DOMContentLoaded", function () {
        const heading = document.querySelector("h1");
    
        // Wait for the animation duration (2s)
        setTimeout(() => {
            heading.classList.add("done"); // Removes the cursor
        }, 2000); // Adjust this time to match the typing animation duration
    });
    
    // window.deleteBook = function (index) {
    //     booksData.splice(index, 1); // Remove the book from the array
    //     displayBooksTable(); // Refresh the table
    // };
});