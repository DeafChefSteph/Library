const openModalButton = document.querySelector('#addNewBook');
const newBookModal = document.querySelector('#newBookModal');

const addBookButton = document.querySelector('#submitBook');
const cancleButton = document.querySelector('#cancleProgress');
const readOrNotReadButton = document.querySelector('#readOrNotRead');

const bookTitle = document.querySelector('#bookTitle');
const author = document.querySelector('#authorOfBook');
const pageNumber = document.querySelector('#pagesOfBook');

const bookList = document.querySelector('#listOfBooks');

function Book (title, author, pages, readOrNotRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readOrNotRead = readOrNotRead;
}

let wasRead = true;
let arrayOfObjects = []; 
let bookCounter = getBooksFromStoeage();
updateBooks();

openModalButton.addEventListener('click', function(){
    newBookModal.style.display = 'block';
});
cancleButton.addEventListener('click',function(){
    newBookModal.style.display = 'none';
});

addBookButton.addEventListener('click', function(){
    
    arrayOfObjects[bookCounter] = new Book(bookTitle.value, author.value, pageNumber.value, wasRead);
    setBookInStorage(arrayOfObjects[bookCounter].title,arrayOfObjects[bookCounter].author,arrayOfObjects[bookCounter].pages,arrayOfObjects[bookCounter].readOrNotRead);
    bookCounter++;
    newBookModal.style.display = 'none';
    
   
    updateBooks(arrayOfObjects);
});

readOrNotReadButton.addEventListener('click',function(){
    wasRead = !wasRead;
    
    if(wasRead == false) { 
        
        readOrNotReadButton.textContent = "not Read";
    }
    else {
        
        readOrNotReadButton.textContent = "Read";
    } 
});



function clearBookListOnScreen()
{
    const divs = document.querySelectorAll('.oneBook');
    divs.forEach(oneDiv =>{
        oneDiv.remove();
    }); 
    
}

function updateBooks(){
    
   clearBookListOnScreen(); 
  
   if(arrayOfObjects.length > 0)
   {
    for(let i = 0; i < arrayOfObjects.length;i++)
    {
        if(typeof arrayOfObjects[i] !== 'undefined')
        {
            const div_ = document.createElement('div');
            div_.classList.add('oneBook');
            bookList.appendChild(div_); 
            let tempObj = arrayOfObjects[i];
            for (const key in tempObj)
            {
                if(key == 'readOrNotRead')
                {
                    const RONRbtn = document.createElement('button');
                    RONRbtn.classList.add('RONRbtn');
                    RONRbtn.setAttribute('name',i);
                    

                    if(tempObj[key] == 'false' || tempObj[key] == false)  {
                        RONRbtn.textContent = 'Not Read';
                        RONRbtn.style.backgroundColor = '#262526'; 
                    }
                    else if (tempObj[key] == 'true' || tempObj[key] == true){
                        RONRbtn.textContent = 'Read';
                        RONRbtn.style.backgroundColor = '#D9D6D2;'; 
                    } 

                    const br = document.createElement('br'); 
                    div_.appendChild(RONRbtn); 
                    div_.appendChild(br);

                        RONRbtn.addEventListener('click', function(){
                        let ind = parseInt(this.name);
                        arrayOfObjects[ind].readOrNotRead = !arrayOfObjects[ind].readOrNotRead;
                        populateStorage('readOrNotReadOf'+ind,arrayOfObjects[ind].readOrNotRead);
                        updateBooks.call();
                        });
                }
                else
                {
                    const para = document.createElement('p');
                    if(key == 'pages') para.textContent = `${tempObj[key]}` + " Pages";
                    else para.textContent = `${tempObj[key]}`; 
                    div_.appendChild(para);
                }

            }
            const rmButton = document.createElement('button');
            rmButton.classList.add('rmButton'); 
            rmButton.setAttribute('id',i); 
            rmButton.textContent = "delete"; 

            const br = document.createElement('br');
            div_.appendChild(rmButton); 
            div_.appendChild(br);
             
            rmButton.addEventListener('click', function(){
                
                let tempArr = []; 
                let index = this.id;
                for (let i = 0;i < arrayOfObjects.length; i++) tempArr[i] = arrayOfObjects[i];
                arrayOfObjects.length = 0;
                arrayOfObjects = tempArr.filter(function(arr, ind){
                    console.log(this);
                    return ind != index;
                });
                removeBookFromStorage(this.id);
                updateBooks.call();
            });
        }
    }
   } 
}

function populateStorage(key, value){
    localStorage.setItem(key,value);
}

function setBookInStorage(title, author, pages, readBool){
    populateStorage('titleOf'+bookCounter,title);
    populateStorage('authorOf'+bookCounter,author);
    populateStorage('pagesOf'+bookCounter,pages);
    populateStorage('readOrNotReadOf'+bookCounter,readBool);
    
}

function getBooksFromStoeage(){
    let j = 0;
    let tempTitle, tempAuthor, tempPages, tempBool;
    console.log(localStorage.length);
    while(j < localStorage.length/4)
    {
        if(localStorage.getItem('titleOf'+j) != null)
        {
        tempTitle = localStorage.getItem('titleOf'+j); 
        tempAuthor = localStorage.getItem('authorOf'+j); 
        tempPages = localStorage.getItem('pagesOf'+j);
        tempBool = localStorage.getItem('readOrNotReadOf'+j);
        arrayOfObjects[j] = new Book(tempTitle, tempAuthor, tempPages, tempBool);
       
        
        }
        j++;
        
    }
    return j; 
}

function removeBookFromStorage(index){
    localStorage.removeItem('titleOf'+index);
    localStorage.removeItem('authorOf'+index);
    localStorage.removeItem('pagesOf'+index);
    localStorage.removeItem('BoolOf'+index);
   
}
