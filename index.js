document.addEventListener("DOMContentLoaded", () => {
    const myLibrary = [];

    function Book(title, author, totalPages, read) {
        // the constructor...

        this.title = title;
        this.author = author;
        this.totalPages = totalPages;
        this.read = read;

        this.info = () => {
            if (read == true) {
                let readBool = "read already!";
            } else {
                readBool = "not read yet"
            }
            return (`${title} by ${author}, ${totalPages} pages, ${readBool}`);
        }

    }

    function addBookToLibrary() {
        const form = document.getElementById('newBookForm');
        let title = document.getElementById('title');
        let author = document.getElementById('author');
        let totalPages = document.getElementById('totalPages');
        let read = document.getElementById('read');


        form.addEventListener('submit', (event) => {

            if (read.value == 'true') {
                read = true;
            } else {
                read = false
            }

            const newBook = new Book(title.value, author.value, totalPages.value, read);
            

            myLibrary.push(newBook);
        })

    }


    function showDialog() {
        const showBtn = document.getElementById('dialogBtn');
        const dialog = document.getElementById('newBookDialog');

        showBtn.addEventListener('click', () => {
            dialog.showModal();
        })

    }


    function displayBooks() {

        const tbody = document.getElementById('booksInfoBody');

        for (book of myLibrary) {
            
            // create multiple td element and a tr element
            const tr = document.createElement('tr');
            const titleTd = document.createElement('td');
            const authorTd = document.createElement('td');
            const totalPagesTd = document.createElement('td');
            const readTd = document.createElement('td');
            const deleteBtnTd = document.createElement('td');

            // TODO

        }
    }

    showDialog();
    addBookToLibrary();
})