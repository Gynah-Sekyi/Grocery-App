// Definition of variables
const groceryTitleBtn = document.querySelector('.btnn-title');
const addGroceryInput = document.querySelector('#grocery__input-text');
const addGroceryTitle = document.querySelector('#grocery__input-title');
const form = document.querySelector('#grocery__form');
const groceryList = document.querySelector('#grocery-collection');
const groceryListHeading = document.querySelector('.grocery-title__name');
const boughtBtn = document.querySelector('.btnn-bought');
const grocerybtns = '<button type="button" class="btnn btnn-bought">Bought' +
'<svg class="grocery-collection__icon check">' +
  '<use xlink:href="img/sprite.svg#icon-check"></use>'+
'</svg> </button> <button type="button" class="btnn btnn-remove">Remove <svg class="grocery-collection__icon close"> <use xlink:href="img/sprite.svg#icon-x"></use></svg> </button>'


//load Event Listeners
loadEventListeners();


//function event listeners
function loadEventListeners(){
  //Add task event
  form.addEventListener('submit',addGrocery);
  //Remove from bought list 
  groceryList.addEventListener('click',removeFromGroceryList) 


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
function removeFromGroceryList(e){

  console.log(e.target.parentElement.classList.contains('grocery-collection__icon'));

}
