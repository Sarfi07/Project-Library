document.addEventListener('DOMContentLoaded', () => {

    const myLibrary = [
        {
            title: "Wordpower Made Easy",
            author: "Norman D. Lewis",
            totalPages: "600", 
            read: false
        }
    ];

    function Book() {
        this.author = author;
        this.title = title;
        this.totalPages = totalPages;
    }

    function addBookToLibrary() {
        // 
        const showButton = document.getElementById('dialog');
        const dialog = document.getElementById('newBookDialog');
    
    
        showButton.addEventListener('click', () => {
            dialog.showModal()
        })
    }

    addBookToLibrary();

    // display books in the table
    const tbody = document.getElementById('booksInfoBody');


    for (let book of myLibrary) {
        objLength = Object.keys(book).length;
        
        let tr = document.createElement('tr');

        // for (let i = 0; i < objLength; i++) {
        //     let td = document.createElement('td');
        //     td.innerHTML = `${book[i]}`
        //     tr.appendChild(td);
        // }

        for (let key in book) {
            let td = document.createElement('td');
            td.innerHTML = `${book[key]}`
            tr.appendChild(td);
        }
        tbody.appendChild(tr)
    }

})