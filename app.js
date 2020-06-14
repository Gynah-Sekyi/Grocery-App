// Definition of variables
const groceryTitleBtn = document.querySelector('.btnn-title');
const addGroceryInput = document.querySelector('#grocery__input-text');
const addGroceryTitle = document.querySelector('#grocery__input-title');
const form = document.querySelector('#grocery__form');
const groceryList = document.querySelector('#grocery-collection');
const boughtList = document.querySelector('#grocery-bought');
const groceryListHeading = document.querySelector('.grocery-title__name');
const boughtBtn = document.querySelector('.btnn-bought');
const grocerybtns = `{<button type="button" class="btnn btnn-bought">Bought<svg class="grocery-collection__icon check"><use xlink:href="img/sprite.svg#icon-check"></use>
</svg> </button> <button type="button" class="btnn btnn-remove">Remove <svg class="grocery-collection__icon close"> <use xlink:href="img/sprite.svg#icon-x"></use></svg> </button>}`

const boughtremove = `<svg class="grocery-bought__icon">
<use xlink:href="img/sprite.svg#icon-x-circle"></use>
</svg>`


//load Event Listeners
loadEventListeners();


//function event listeners
function loadEventListeners(){
  //Add task event
  form.addEventListener('submit',addGrocery);
  //Remove from bought list 
  groceryList.addEventListener('click',removeFromGroceryList) 
  //Add to bought list 
  groceryList.addEventListener('click',addToBoughtList) 


}



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

    // console.log(groceryTitle);

    //Create li
    const li = document.createElement('li');
    li.className = 'grocery-collection__item';

    //Create span(grocery name)
    const span = document.createElement('span');
    span.className = 'grocery-collection__name';
    span.appendChild(document.createTextNode(addGroceryInput.value));

    //Create button div
    const btns =document.createElement('div');
    btns.className ='grocery-collection__btns';
    btns.innerHTML = grocerybtns;


    // Append
    li.append(span,btns);
    groceryList.appendChild(li);
    addGroceryInput.value = '';


    // // alert('Grocery added');

    // console.log(li);
  }
  e.preventDefault();

}

//Function remove from grocery list
let boughtItem
function removeFromGroceryList(e){
  if(e.target.classList.contains('btnn-remove'))
  if(confirm('Are you sure you want to delete this item'))
  e.target.parentElement.parentElement.remove();

  boughtItem = e.target.parentElement.parentElement.firstElementChild.textContent;
  // console.log( e.target.parentElement.parentElement.firstElementChild.textContent);
  // addToBoughtList(e,boughtItem);
}


//Add to bought list 
function addToBoughtList(e){
  if(e.target.classList.contains('btnn-bought'));

  //Create li
  const boughtLi = document.createElement('li')
  boughtLi.className = 'grocery-bought__item';
  //Create del
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
  alert('1 added');

  // if(e.target.classList.contains('btnn-bought')){
  //   e.target.parentElement.parentElement.remove()
  // }
 
  // console.log( e.target)

}