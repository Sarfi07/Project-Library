document.addEventListener("DOMContentLoaded", () => {
    const myLibrary = [
        {
            title: "Worpower Made Easy",
            author: "Norman D. Lewis",
            tatalPages: "600",
            read: false
        }
    ];

    function Book(title, author, totalPages, read) {
        // the constructor...

        this.title = title;
        this.author = author;
        this.totalPages = totalPages;
        this.read = read;
    }

    Book.prototype.changedReadStatus = function(newStatus) {
        this.read = newStatus;
    }

    function addBookToLibrary() {
        const form = document.getElementById('newBookForm');
        const tbody = document.getElementById('booksInfoBody')


        form.addEventListener('submit', (event) => {
            let title = document.getElementById('title');
            let author = document.getElementById('author');
            let totalPages = document.getElementById('totalPages');
            let read = document.getElementById('read');

            if (read.value == 'true') {
                read = true;
            } else {
                read = false
            }

            const newBook = new Book(title.value, author.value, totalPages.value, read);


            myLibrary.push(newBook);

            // append new tr on the page;

            let tr = document.createElement('tr');
            let index = myLibrary.indexOf(newBook)

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
                            newBook.changeReadStatus(false);
                        } else {
                            btn.innerText = "True";
                            myLibrary[index].read = true

                            newBook.changeReadStatus(true);
                        }
                    })
                } else {
                    td.innerHTML = `${newBook[key]}`
                }
                tr.appendChild(td);
            }
            // adding del td to tr
            let delTd = document.createElement('td');
            delTd.appendChild(deleteBookBtn(newBook));
            tr.appendChild(delTd);

            // giving data attribute to tr to identify uniquely
            tr.setAttribute('id', index)

            // appending current tr to tbody
            tbody.appendChild(tr);

            // delete Book
            deleteBook();

        })

    }


    function showDialog() {
        const showBtn = document.getElementById('dialogBtn');
        const dialog = document.getElementById('newBookDialog');
        const author = document.getElementById('author');
        const title = document.getElementById('title');
        const totalPages = document.getElementById('totalPages');

        showBtn.addEventListener('click', () => {
            author.texContent = "";
            title.textContent = "";
            totalPages.textContent = "";
            dialog.showModal();
        })

    }


    function displayBooks() {

        const tbody = document.getElementById('booksInfoBody');


        for (let book of myLibrary) {

            // creating a parent tr element for td elements
            const tr = document.createElement('tr');
            let index = myLibrary.indexOf(book);

            for (let key in book) {
                let td = document.createElement('td');

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
                            console.log(myLibrary[index])
                        } else {
                            btn.innerText = "True";
                            myLibrary[index].read = true;
                            console.log(myLibrary[index]);
                        }
                    })
                } else if (typeof book[key] == 'function') {
                    return          

                } else {

                    td.innerHTML = `${book[key]}`;
                }

                tr.appendChild(td);
            }
            // adding del td to tr
            let delTd = document.createElement('td');
            delTd.appendChild(deleteBookBtn(book));
            tr.appendChild(delTd);

            // giving data attribute to tr to identify uniquely
            tr.setAttribute('id', index)

            // appending current tr to tbody
            tbody.appendChild(tr);

            // delete Book
            deleteBook();
        }
    }

    function deleteBookBtn(book) {
        let delBtn = document.createElement('button');
        var index = myLibrary.indexOf(book);
        delBtn.setAttribute('data-index', index);
        delBtn.setAttribute('class', 'deleteBtn');
        delBtn.innerText = "Delete";
        delBtn.style.fontSize = "1rem";
        delBtn.style.fontWeight = "600"
        delBtn.style.margin = ".25rem";
        delBtn.style.padding = ".35rem";

        return delBtn
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

    showDialog();
    addBookToLibrary();
    displayBooks();
})
