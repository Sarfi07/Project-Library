// use objects and objects constructor

const myLibrary = [
    {
        title: "Word Power Made Easy!",
        author: "Norman D. Lewis",
        pages: 500,
        read: false,
        description: "Book to build superior vocab.",
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB-01YKGpsksVI7E_c2JTIj_RFee8tckKwZ6c2HnH5LpDO59IBycn7Ef67X-mnDKCNhF8&usqp=CAU'
    }
]


// object constructor

function Book(title, author, totalPages, readStatus, description, image) {
    this.title = title;
    this.author = author;
    this.pages = totalPages;
    this.read = readStatus;
    this.description = description;
    this.image = image
}

Book.prototype.toggleReadStatus = function () {
    this.readStatus = !this.readStatus;
}


// utility functions: displayBooks, addBookToLibrary, changeReadStatus, deleteBook with confirmation feature, 

// showModal
function showForm() {
    const showBtn = document.getElementById('addBookBtn');
    const addDialog = document.getElementById('newBookDialog');
    const cancelBtn = document.getElementById('cancelBtn');

    showBtn.addEventListener('click', () => {
        addDialog.showModal();
    })

    cancelBtn.addEventListener('click', () => {
        addDialog.close();
    })
}

function addBookToLibrary() {
    const form = document.getElementById('newBookForm');
    const addDialog = document.getElementById('newBookDialog');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const pages = document.getElementById('totalPages').value;
        const readStatus = document.getElementById('read').value;
        const image = document.getElementById('image').value;
        const description = document.getElementById('description').value;


        const newBook = new Book(title, author, pages, readStatus, description, image);
        myLibrary.push(newBook);
        const index = myLibrary.length - 1;

        addDialog.close();
        console.log(myLibrary[index])
        displaynewBook(myLibrary[index], index);

    })
}

function displaynewBook(item, index) {
    const booksGrid = document.getElementById('booksGrid');

    const gridChild = document.createElement('div');
    const card = document.createElement('div');

    const titleFragment = createCardFragment(item, "Title");
    const authorFragment = createCardFragment(item, "Author");
    const descriptionFragment = createCardFragment(item, "Description");
    const pagesFragment = createCardFragment(item, "Pages");


    // now for read and deleteBook fragments
    // Read
    const readContainer = document.createElement('div');

    const readLabel = document.createElement('span');
    readLabel.textContent = "Read:    "
    readLabel.classList.add('bold');

    const readBtn = document.createElement('button');
    readBtn.textContent = capitalize(item.read);
    readBtn.classList.add('btn', 'readBtn');

    readBtn.setAttribute('data-index', index)
    readBtn.setAttribute('id', `readBtn${index}`)

    readContainer.appendChild(readLabel);
    readContainer.appendChild(readBtn);

    const readFragment = readContainer;


    // deleteBook fragement
    const deleteBookFragment = document.createElement('button');
    deleteBookFragment.setAttribute('data-index', index);
    deleteBookFragment.textContent = "Delete";
    deleteBookFragment.classList.add('delBookBtn')


    // image
    const imageFragment = document.createElement('div');
    imageFragment.classList.add('imageContainer')

    const img = document.createElement('img');
    img.src = item.image;
    imageFragment.appendChild(img);


    card.appendChild(imageFragment);
    card.appendChild(titleFragment);
    card.appendChild(descriptionFragment);
    card.appendChild(authorFragment);
    card.appendChild(pagesFragment);
    card.appendChild(readFragment);
    card.appendChild(deleteBookFragment);

    card.classList.add('card');
    card.setAttribute('id', `card${index}`);
    gridChild.classList.add('gridChild');

    gridChild.append(card);
    booksGrid.append(gridChild);


    // rerun read and delete function for new books
    deleteBook();
    changeReadStatus();

}

function displayBooks() {

    const booksGrid = document.getElementById('booksGrid');

    myLibrary.forEach((item, index) => {
        const gridChild = document.createElement('div');
        const card = document.createElement('div');

        const titleFragment = createCardFragment(item, "Title");
        const authorFragment = createCardFragment(item, "Author");
        const descriptionFragment = createCardFragment(item, "Description");
        const pagesFragment = createCardFragment(item, "Pages");


        // now for read and deleteBook fragments
        // Read
        const readContainer = document.createElement('div');

        const readLabel = document.createElement('span');
        readLabel.textContent = "Read:    "
        readLabel.classList.add('bold');

        const readBtn = document.createElement('button');
        readBtn.textContent = capitalize(item.read.toString());
        readBtn.classList.add('btn', 'readBtn');

        readBtn.setAttribute('data-index', index)
        readBtn.setAttribute('id', `readBtn${index}`)

        readContainer.appendChild(readLabel);
        readContainer.appendChild(readBtn);

        const readFragment = readContainer;


        // deleteBook fragement
        const deleteBookFragment = document.createElement('button');
        deleteBookFragment.setAttribute('data-index', index);
        deleteBookFragment.textContent = "Delete";
        deleteBookFragment.classList.add('delBookBtn')


        // image
        const imageFragment = document.createElement('div');
        imageFragment.classList.add('imageContainer')

        const img = document.createElement('img');
        img.src = item.image;
        imageFragment.appendChild(img);


        card.appendChild(imageFragment);
        card.appendChild(titleFragment);
        card.appendChild(descriptionFragment);
        card.appendChild(authorFragment);
        card.appendChild(pagesFragment);
        card.appendChild(readFragment);
        card.appendChild(deleteBookFragment);

        card.classList.add('card');
        card.setAttribute('id', `card${index}`);
        gridChild.classList.add('gridChild');

        gridChild.append(card);
        booksGrid.append(gridChild);
    })
}

// TODO: change read status feature
function changeReadStatus() {
    const readBtns = document.querySelectorAll('button.readBtn');
    console.log(readBtns)

    readBtns.forEach((btn) => {
        const index = btn.dataset.index;
        const book = myLibrary[index];

        btn.addEventListener('click', () => {
            book.read = !book.read;
            btn.textContent = capitalize(book.read.toString());
            console.log(myLibrary[index]);
        })
    })
}


// TODO: delete Book feature with confirmation
function deleteBook() {
    const delBtns = document.querySelectorAll('button.delBookBtn');

    delBtns.forEach(btn => {
        const index = btn.dataset.index;
        console.log(index)
        const book = myLibrary[index]
        console.log(book)

        btn.addEventListener('click', () => {
            const result = confirm(`Do you really want to delete "${book.title}"`);
            if (result == true) {
                myLibrary.splice(index, 1);
                const card = document.getElementById(`card${index}`);
                card.style.display = 'none';
                
            }
        })
    })
}



function createCardFragment(item, name) {
    const container = document.createElement('div');

    const label = document.createElement('span');
    label.textContent = `${name}:    `;
    label.classList.add('bold');

    const content = document.createElement('span');
    name = name.toLowerCase();
    content.textContent = item[name];

    container.appendChild(label);
    container.appendChild(content);
    container.classList.add(`${name}Container`);


    return container;
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}


function fixBorder() {
    const inputs = document.querySelectorAll('input');

    for (const input of inputs) {
        input.addEventListener('change', () => {
            if (input.validity.valid) {
                input.style.border = "2px solid green";
            } else {
                input.style.border = "2px solid red"
            }
        })
    }

    const image = document.getElementById('image');
    if (image.checkValidity()) {
        image.setCustomValidity("Write a valid http address!")
    }
}


document.addEventListener('DOMContentLoaded', () => {
    showForm();
    addBookToLibrary();
    displayBooks();
    changeReadStatus();
    deleteBook();
    fixBorder()
})
