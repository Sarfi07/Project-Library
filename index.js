document.addEventListener('DOMContentLoaded', () => {

    const myLibrary = [
        {
            title: "Wordpower Made Easy",
            author: "Norman D. Lewis",
            totalPages: "600", 
            read: false
        }
    ];

    function Book(author, title, totalPages, read) {
        this.author = author;
        this.title = title;
        this.totalPages = totalPages;
        this.read = read
    }

    function addBookToLibrary() {
        // 
        const showButton = document.getElementById('dialog');
        const dialog = document.getElementById('newBookDialog');
        const form = document.getElementById('newBookForm');
    
    
        showButton.addEventListener('click', () => {
            dialog.showModal()
        })

        // form submission
        form.addEventListener('submit', (event) => {
            // event.preventDefault();
            let author = document.getElementById('author').value;
            let title = document.getElementById('title').value;
            let pages = document.getElementById('totalPages').value;
            let completed = document.getElementById('read').value;
            let tbody = document.getElementById('booksInfoBody');
            
            if (completed == "true") {
                completed = true;
            } else completed = false;


            const newBook = new Book(title, author, pages, completed);

            myLibrary.push(newBook)

            
            // append on the page
            let tr = document.createElement('tr');

            for (let key in newBook) {
                let td = document.createElement('td');

                if (newBook[key] == true || newBook[key] == false) {
                    var btn = document.createElement('button');
                    btn.style.fontSize = "1rem";
                    btn.style.margin = ".25rem";
                    btn.style.padding = ".35rem";
                    btn.style.fontWeight = "600";
                    btn.innerText = `${newBook[key]}`;
                    btn.setAttribute('data-index', index);
                    btn.setAttribute('class', 'readBtn');
                    td.appendChild(btn);

                    btn.addEventListener('click', () => {
                        if (newBook[key] == true) {
                            // change the text
                                btn.innerText = "false"
                            // change the object
                                myLibrary[index].read = false;
                        } else {
                            btn.innerText = "True";
                            myLibrary[index].read = true
                        }
                    })
                } else {
                    td.innerHTML = `${newBook[key]}`
                }
                tr.appendChild(td);
            }

            // addding delete button
            let delTd = document.createElement('td');
            let delBtn = document.createElement('button');
            var index = myLibrary.indexOf(newBook)
            delBtn.setAttribute('data-index', index)
            delBtn.innerText = "Delete";
            delBtn.setAttribute('class', 'deleteBtn');
            delBtn.style.fontSize = "1rem";
            delBtn.style.margin = ".25rem";
            delBtn.style.padding = ".35rem";
            delTd.appendChild(delBtn)

            tr.appendChild(delTd);
            tr.setAttribute('id', index)

            tbody.appendChild(tr);
            
            delBtn.addEventListener('click', () => {
                myLibrary.splice(index, 1);
               tr.style.display = 'none' ;
            })
        })
    }

    addBookToLibrary();

    // display books in the table

    function displayBooks() {
        const tbody = document.getElementById('booksInfoBody');
    
    
        for (let book of myLibrary) {
            
            if (myLibrary.length == 0) {
                console.log(myLibrary.length)
                return
            }
            let tr = document.createElement('tr');
 
            for (let key in book) {
                let td = document.createElement('td');

                // adding a toggle button on read key
                if (book[key] == true || book[key] == false) {
                    var btn = document.createElement('button');
                    btn.style.fontSize = "1rem";
                    btn.style.margin = ".25rem";
                    btn.style.padding = ".35rem";
                    btn.style.fontWeight = "600";
                    btn.innerText = `${book[key]}`;
                    btn.setAttribute('data-index', index);
                    btn.setAttribute('class', 'readBtn');
                    td.appendChild(btn);

                    btn.addEventListener('click', () => {
                        if (book[key] == true) {
                            // change the text
                                btn.innerText = "false"
                            // change the object
                                myLibrary[index].read = false;
                        } else {
                            btn.innerText = "True";
                            myLibrary[index].read = true
                        }
                    })
                } else {
                    td.innerHTML = `${book[key]}`;
                }

                // set data attribute which correspond to index on the book
                
                tr.appendChild(td);

            }

            // addding delete button
            let delTd = document.createElement('td');
            let delBtn = document.createElement('button');
            var index = myLibrary.indexOf(book);
            delBtn.setAttribute('data-index', index);
            delBtn.setAttribute('class', 'deleteBtn');
            delBtn.innerText = "Delete";
            delBtn.style.fontSize = "1rem";
            delBtn.style.margin = ".25rem";
            delBtn.style.padding = ".35rem";

            delTd.appendChild(delBtn)

            tr.appendChild(delTd);
            tr.setAttribute('id', index)
            tbody.appendChild(tr);

            // delete book
            deleteBook();
        }
    }
    

    function deleteBook() {
        let btns = document.querySelectorAll('.deleteBtn');

        btns.forEach((btn) => {
            btn.addEventListener('click', () => {
                var index = btn.dataset.index;
                
                // delete book from the myLibrary
                myLibrary.splice(index, 1)

                // showing remaining books
                let currentTr = document.getElementById(index);
                currentTr.style.display = 'none';
                
            })
        })
    }


    displayBooks();
})