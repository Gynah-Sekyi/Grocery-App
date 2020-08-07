// Definition of variables
const groceryTitleBtn = document.querySelector('.btnn-title');
const addGroceryInput = document.querySelector('#grocery__input-text');
const addGroceryTitle = document.querySelector('#grocery__input-title');
const form = document.querySelector('#grocery__form');
const groceryList = document.querySelector('#grocery-collection');
const grocerySearch = document.querySelector('#grocery-search')
const boughtList = document.querySelector('#grocery-bought');
const groceryListHeading = document.querySelector('.grocery-title__name');
const boughtBtn = document.querySelector('.btnn-bought');
const groceryCount= document.querySelector('#grocery-list__count');
const boughtCount= document.querySelector('#grocery-bought__count');
const btnClearAll = document.querySelector('.btnn-clear');
const grocerybtns = `{<button type="button" class="btnn btnn-bought">Bought<svg class="grocery-collection__icon check"><use xlink:href="img/sprite.svg#icon-check"></use>
</svg> </button> <button type="button" class="btnn btnn-remove">Remove <svg class="grocery-collection__icon close"> <use xlink:href="img/sprite.svg#icon-x"></use></svg> </button>}`

const boughtremove = `<svg class="grocery-bought__icon">
<use xlink:href="img/sprite.svg#icon-x-circle"></use>
</svg>`


//load Event Listeners
loadEventListeners();


//function event listeners
function loadEventListeners(){
  //Load DOM content
  document.addEventListener('DOMContentLoaded',getFromLocalStorage)
  //Add task event
  form.addEventListener('submit',addGrocery);
  //Remove from bought list 
  groceryList.addEventListener('click',removeFromGroceryList) 
  //Add to bought list 
  groceryList.addEventListener('click',addToBoughtList);
  //Remove from bought list
  boughtList.addEventListener('click',removeFromBoughtList)
  //Search for grocery on the list
  grocerySearch.addEventListener('keyup',searchGrocery)
  //Clear all from bought list
  btnClearAll.addEventListener('click', clearAll)


}


let count;
//Function Add grocery
function addGrocery(e){
  // if((addGroceryInput.value === "") && (addGroceryTitle.value === "")){
  //   alert("Add a grocery item and a title");
  // }
   if(addGroceryInput.value === ""){
    alert("Add a grocery item");
  }
  // else if(addGroceryTitle.value === ""){
  //   alert("Add a grocery title");
  // }
  else{
    //create title
    const groceryTitle = document.createElement('p');
    groceryTitle.className = 'grocery__type-name';
    groceryTitle.appendChild(document.createTextNode(addGroceryTitle.value));
    groceryListHeading.appendChild(groceryTitle);

    addGroceryTitle.value = '';

  //Create a grocery
   createGrocery(addGroceryInput.value);
    
    //Add to LS
    populateLocalStorage(addGroceryInput.value);

    addGroceryInput.value = '';

    //Update grocery count 
    count = groceryList.childElementCount;
    groceryCount.value= count   // Number(count)
    groceryCount.innerHTML = count;
    // // alert('Grocery added');

  }
  e.preventDefault();

}



//Function remove from grocery list
function removeFromGroceryList(e){
  if(e.target.classList.contains('btnn-remove')){
  if(confirm('Are you sure you want to delete this item'))
  e.target.parentElement.parentElement.remove();

  count--;
  groceryCount.value = count
  groceryCount.innerHTML = count
  }
}



//Add to bought list 
function addToBoughtList(e){
  if(e.target.classList.contains('btnn-bought')){

  //Get bought text
  let boughtItem
  boughtItem = e.target.parentElement.parentElement.firstElementChild.textContent;

  //Create li
  const boughtLi = document.createElement('li')
  boughtLi.className = 'grocery-bought__item';

  //Create delete button
  const del = document.createElement('del')
  del.className = 'grey';

  //Create li
  const boughtSpan = document.createElement('span')
  boughtSpan.className = 'grocery-bought__name';
  boughtSpan.appendChild(document.createTextNode(boughtItem));

  del.appendChild(boughtSpan);

  //Add btn
  const boughtdel =document.createElement('div');
  boughtdel.className ='grocery-bought__btn';
  boughtdel.innerHTML = boughtremove;

  boughtLi.append(del,boughtdel);


  //Add to Bought List
  boughtList.append(boughtLi);
  alert('1 grocery bought');
  
  //Update grocery count value & Ui
  count--;  
  groceryCount.innerHTML = count;

  //Update bought count value = UI
  boughtCount.innerHTML= boughtList.childElementCount;
  // console.log(count); 

  //Remove from grocery list
  e.target.parentElement.parentElement.remove()

  
  
  }
}



//Function remove from bought list
function removeFromBoughtList(e){
  if(e.target.parentElement.classList.contains('grocery-bought__icon')){
    if(confirm('Are you sure')){
      e.target.parentElement.parentElement.parentElement.remove();
      boughtCount.innerHTML= boughtList.childElementCount;
      // console.log(boughtList.childElementCount);
    }
  }
}

//Create grocery
function createGrocery(inputValue){
  //Create li
  const li = document.createElement('li');
  li.className = 'grocery-collection__item';

  //Create span(grocery name)
  const span = document.createElement('span');
  span.className = 'grocery-collection__name';
  span.appendChild(document.createTextNode(inputValue));

  //Create button div
  const btns =document.createElement('div');
  btns.className ='grocery-collection__btns';
  btns.innerHTML = grocerybtns;


  // Append
  li.append(span,btns);
  groceryList.appendChild(li);
}




//Clear all function
function clearAll(){
  // boughtList.innerHTML =''; 

  //Faster method
  while(boughtList.firstChild){
     boughtList.removeChild(boughtList.firstChild);
  }
  boughtCount.innerHTML= boughtList.childElementCount;

 
}



//Search/Filter grocery
function searchGrocery(e){
  const search = e.target.value.toLowerCase();
  // console.log(search)
  document.querySelectorAll('.grocery-collection__item').forEach(function(item){
    const grocery = item.firstChild.textContent;
    if(grocery.toLowerCase().indexOf(search)!= -1){
        item.style.display = 'flex';
      }
    else{
        item.style.display = 'none';
      }
  })
}



//Local Storage
//1.Store in local storage
function populateLocalStorage(groceryItem){
  let groceryItems;
  if(!(localStorage.getItem('groceryItems') === null)){
    groceryItems = JSON.parse(localStorage.getItem('groceryItems'));
  }else{
    groceryItems = [];
  }
  groceryItems.push(groceryItem);
  localStorage.setItem('groceryItems',JSON.stringify(groceryItems))
}


//2.Get from local storage
function getFromLocalStorage(){
  let groceryItems;
  if(!(localStorage.getItem('groceryItems') === null)){
    groceryItems = JSON.parse(localStorage.getItem('groceryItems'));
  }else{
    groceryItems = [];
  }
  groceryItems.forEach(function(grocery){
    createGrocery(grocery);

  })
}