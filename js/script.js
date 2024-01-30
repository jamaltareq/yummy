
// navbar open and close menu
$("nav").css({left:-`${$("nav").innerWidth() - $("#look-menu").innerWidth()}`})
$("#open-menu").click(function(){
    let menuWidth = $("nav").innerWidth()
    if($("nav").css("left") == "0px"){
        $("nav").animate({left: `-${menuWidth - $("#look-menu").innerWidth()}`}, 500)
        $(".translate-anemat").css({transform: "translate(0,100%)"}, 200)
        
    }else{
        $("nav").animate({left: "0px"}, 500)
        $(".translate-anemat").css({transform: "translate(0,0)"}, 100)
       
    }
})

// swetch icon
document.querySelector("#open-menu").addEventListener("click",()=>{
    if(document.getElementById("icontransfer").classList.contains("bi-x")){
        document.getElementById("icontransfer").classList.replace("bi-x", "bi-list")
    }else{
        document.getElementById("icontransfer").classList.replace("bi-list", "bi-x")
    }
    
})
let list_menu = document.querySelectorAll(".translate-anemat li")
let list_page = document.querySelectorAll(".page")

for (let i = 0; i < list_page.length; i++) {
    list_menu[i].addEventListener("click", () => {
        document.getElementById("table-body").classList.add("d-none")
        for (let j = 0; j < list_page.length; j++) {
            list_page[j].classList.add("d-none")
        }
        $("nav").animate({left:-`${$("nav").innerWidth() - $("#look-menu").innerWidth()}`}, 500)
        document.getElementById("icontransfer").classList.replace("bi-x", "bi-list")

        list_page[i].classList.remove("d-none")
        
    })
}

// http request name body 

async function httpName() {
    let httoRecoust = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    let httoRecoustJson = await httoRecoust.json()
    display(httoRecoustJson.meals)
}
httpName() 

// ===================> display body http request
// ===================> display body http request
function display(listFood){
    
    let displayFood = document.getElementById("table-body")
    for (let i = 0; i < listFood.length; i++) {
        displayFood.innerHTML += `<div class="col-lg-3 col-md-6 " >
        <div class="item position-relative overflow-hidden" data-id="${listFood[i].idMeal}" onclick="getalldetails('${listFood[i].strMeal}')">
          <img src="${listFood[i].strMealThumb}" class="w-100 rounded-3" />
          <div
            class="text position-absolute top-0 start-0 ps-3 rounded-3 text-black"
          >
            <h3 class="text-center">${listFood[i].strMeal}</h3>
          </div>
        </div>
      </div>`
    }
    let forlist = document.querySelectorAll(".item")

}





async function getalldetails(valu) {
  let arealistslist = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${valu}`);
  let cate = await arealistslist.json();
  alldetailslist = cate.meals;

  showalldetails();
}

function showalldetails() {
  document.getElementById("table-body").classList.remove("d-none")
  document.getElementById("table-search").classList.add("d-none")
  document.getElementById("table-categories").classList.add("d-none")
  document.getElementById("table-area").classList.add("d-none")
  document.getElementById("table-ingredients").classList.add("d-none")
  let temp = "";

  alldetailslist.forEach((element) => {
    temp += `
      <div class="inside  py-1 pb-3  w-100 h-100">
      <div class="text-white row  " >
      <div class="col-lg-5">
      <img src="${element.strMealThumb}" class="w-100 rounded-4">
      <h2>${element.strMeal}</h2>
      </div>
      <div class="col-lg-7 ps-3 ">
      <h2>Instructions</h2>
      <p class="">${element.strInstructions}</p>
      <h2 class="text-text-uppercase">area:${element.strArea} </h2>
      <h2 class="text-text-uppercase">Category:${element.strCategory} </h2>
      <h2 class="text-text-uppercase">Recipes: </h2>
      <div class="row gap-1">
      <h4 class=" col-3 cook py-1 px-2 py-3 fit-content fs-6 rounded-3">${element.strMeasure1} ${element.strIngredient1}</h4>
      <h4 class=" col-3 cook py-1 px-2 py-3 fit-content fs-6 rounded-3">${element.strMeasure2} ${element.strIngredient2}</h4>
      <h4 class=" col-3 cook py-1 px-2 py-3 fit-content fs-6 rounded-3">${element.strMeasure3} ${element.strIngredient3}</h4>
      <h4 class=" col-3 cook py-1 px-2 py-3 fit-content fs-6 rounded-3">${element.strMeasure4} ${element.strIngredient4}</h4>
      <h4 class=" col-3 cook py-1 px-2 py-3 fit-content fs-6 rounded-3">${element.strMeasure5} ${element.strIngredient5}</h4>
      <h4 class=" col-3 cook py-1 px-2 py-3 fit-content fs-6 rounded-3">${element.strMeasure6} ${element.strIngredient6}</h4>
      <h4 class=" col-3 cook py-1 px-2 py-3 fit-content fs-6 rounded-3">${element.strMeasure7} ${element.strIngredient7}</h4>
      <h4 class=" col-3 cook py-1 px-2 py-3 fit-content fs-6 rounded-3">${element.strMeasure8} ${element.strIngredient8}</h4>
      </div>
      <h2 class="text-text-uppercase">tag:</h2>
      <div class="d-grid gap-2 d-md-block mt-3">
  <a class="btn btn-dark"  href="${element.strSource}" target="_blank">source</a>
  <a class="btn btn-danger"  href="${element.strYoutube}" target="_blank">youtube</a>
</div>
      </div>
      </div>
          </div>
    
  
  `;
  });

  document.getElementById("table-body").innerHTML = temp;
}












// ===================> search http request <==================== 
let py_name_search = document.getElementById("py_name_search")
let table_search_body = document.getElementById("table_search_body")
py_name_search.addEventListener("input",()=>{
    async function httpName() {
        let httoRecoust = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${py_name_search.value}`)
        let httoRecoustJson = await httoRecoust.json()  
        displaySearch(httoRecoustJson.meals)
    }
    httpName()
})

function displaySearch(listfoud){
  
    let table = ""
    for (let i = 0; i < listfoud.length; i++) {
    table += `<div class="col-lg-3 col-md-6" >
    <div class="item position-relative overflow-hidden" data-id="${listfoud[i].idMeal}" onclick="getalldetails('${listfoud[i].strMeal}')" >
      <img src="${listfoud[i].strMealThumb}" class="w-100 rounded-3" />
      <div
        class="text position-absolute top-0 start-0 ps-3 rounded-3 text-black"
      >
        <h3 class="text-center">${listfoud[i].strMeal}</h3>
      </div>
    </div>
  </div>`    
    
    }
    table_search_body.innerHTML = table
}
// ===================> search http request py letter <====================
let py_letter_search = document.getElementById("py_letter_search")
py_letter_search.addEventListener("input",()=>{
    async function httpName() {
        let httoRecoust = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${py_letter_search.value}`)
        let httoRecoustJson = await httoRecoust.json()
        displaySearchletter(httoRecoustJson.meals)
    }
    httpName()

})

function displaySearchletter(listfoud){
    let table = ""
    for (let i = 0; i < listfoud.length; i++) {
        table += `<div class="col-lg-3 col-md-6">
    <div class="item position-relative overflow-hidden" data-id="${listfoud[i].idMeal}" onclick="getalldetails('${listfoud[i].strMeal}')">
      <img src="${listfoud[i].strMealThumb}" class="w-100 rounded-3" />
      <div
        class="text position-absolute top-0 start-0 ps-3 rounded-3 text-black"
      >
        <h3 class="text-center">${listfoud[i].strMeal}</h3>
      </div>
    </div>
  </div>`    
    
    }
    table_search_body.innerHTML = table
    }
   

// ===================> categories http request <====================

let table_categories = document.getElementById("table-categories")
list_menu[1].addEventListener("click", () => {
async function categoriesHttp() {
    let httoRecoust = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    let httoRecoustJson = await httoRecoust.json()
    displaycategories(httoRecoustJson.categories)
}
categoriesHttp() 
function displaycategories(listFood) {
    let table = ""
    for (let i = 0; i < listFood.length; i++) {
        table += `<div class="col-lg-3 col-md-6">
        <div class="item position-relative overflow-hidden" data-id="${listFood[i].idCategory}" onclick="categorieDetails('${listFood[i].strCategory}')">
          <img src="${listFood[i].strCategoryThumb}" class="w-100 rounded-3" />
          <div
            class="text position-absolute top-0 start-0 ps-3 rounded-3 text-black d-flex flex-column "
          >
            <h3 class="text-center">${listFood[i].strCategory}</h3>
            <p class="text-center">${listFood[i].strCategoryDescription}</p>
          </div>
        </div>
      </div>`
    }
    table_categories.innerHTML = table

}})
async function categorieDetails(listalcate) {
  let httoRecoust = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${listalcate}`)
  let httoRecoustJson = await httoRecoust.json()
  console.log(httoRecoustJson);
  displaycategoriesdetails(httoRecoustJson.meals)
}
function displaycategoriesdetails(httoRecoust) {
  let table = ""
  for (let i = 0; i < httoRecoust.length; i++) {
    table += `<div class="col-lg-3 col-md-6">
    <div class="item position-relative overflow-hidden" data-id="${httoRecoust[i].idMeal}" onclick="getalldetails('${httoRecoust[i].strMeal}')">
      <img src="${httoRecoust[i].strMealThumb}" class="w-100 rounded-3" />
      <div
        class="text position-absolute top-0 start-0 ps-3 rounded-3 text-black"
      >
        <h3 class="text-center">${httoRecoust[i].strMeal}</h3>
      </div>
    </div>
  </div>`
  }
  table_categories.innerHTML = table
}
// ===================> area http request <====================
list_menu[2].addEventListener("click", () => {
    areaHttp()

})
let table_area = document.getElementById("table-area")
async function areaHttp() {
    let httoRecoust = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a")
    let httoRecoustJson = await httoRecoust.json()
    displayarea(httoRecoustJson.meals)
}
areaHttp() 
function displayarea(listArea) {
    let table = ""
    for (let i = 0; i < listArea.length; i++) {
        table += `<div class="col-lg-3 col-md-6">
        <div class="item position-relative overflow-hidden text-white d-flex flex-column " data-id="${listArea[i].strArea}" onclick="areaDetails('${listArea[i].strArea}')">
          <i class="fa-solid fa-map-location-dot fs-1"></i>
          <h3 class="text-center">${listArea[i].strArea}</h3>
          </div>
        </div>
      </div>`
    }
    table_area.innerHTML = table

}
//  
async function areaDetails(listArea) {
  let httoRecoust = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${listArea}`)
  let httoRecoustJson = await httoRecoust.json()
  displayareadetails(httoRecoustJson.meals)
}
function displayareadetails(httoRecoust) {
  let table = ""
  for (let i = 0; i < httoRecoust.length; i++) {
    table +=  `<div class="col-lg-3 col-md-6">
    <div class="item position-relative overflow-hidden" data-id="${httoRecoust[i].idMeal}" onclick="getalldetails('${httoRecoust[i].strMeal}')">
      <img src="${httoRecoust[i].strMealThumb}" class="w-100 rounded-3" />
      <div
        class="text position-absolute top-0 start-0 ps-3 rounded-3 text-black"
      >
        <h3 class="text-center">${httoRecoust[i].strMeal}</h3>
      </div>
    </div>
  </div>` 
  }
  table_area.innerHTML = table
}
// ===================> ingredients http request <====================
let table_ingredients = document.getElementById("table-ingredients")
list_menu[3].addEventListener("click", () => {
    ingredientsHttp()
})
async function ingredientsHttp() {
    let httoRecoust = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i")
    let httoRecoustJson = await httoRecoust.json()
    displayingredients(httoRecoustJson.meals)
}
ingredientsHttp() 
function displayingredients(ingredients) {
    let table = ""
    for (let i = 0; i < 20; i++) {
        table += `<div class="col-lg-3 col-md-6">
        <div class="item position-relative overflow-hidden text-white d-flex flex-column " data-id="${ingredients[i].strIngredient}" onclick="ingredientsDetails('${ingredients[i].strIngredient}')">
        <i class="fa-solid fa-drumstick-bite fs-1"></i>
          <h3 class="text-center">${ingredients[i].strIngredient}</h3>
          <p class="text-center">${ingredients[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
          </div>
        </div>
      </div>`
    }
    table_ingredients.innerHTML = table
}
async function ingredientsDetails(ingredients) {
  let httoRecoust = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
  let httoRecoustJson = await httoRecoust.json()
  displayingredientsdetails(httoRecoustJson.meals)
}
function displayingredientsdetails(httoRecoust) {
  let table = ""
  for (let i = 0; i < httoRecoust.length; i++) {
    table +=  `<div class="col-lg-3 col-md-6">
    <div class="item position-relative overflow-hidden" data-id="${httoRecoust[i].idMeal}" onclick="getalldetails('${httoRecoust[i].strMeal}')">
      <img src="${httoRecoust[i].strMealThumb}" class="w-100 rounded-3" />
      <div
        class="text position-absolute top-0 start-0 ps-3 rounded-3 text-black"
      >
        <h3 class="text-center">${httoRecoust[i].strMeal}</h3>
      </div>
    </div>
  </div>`
  }
  table_ingredients.innerHTML = table
}



// ===================> loading <====================
$("#table-body").ready(function () {
    $(".loader-container").fadeOut(1000, function () {
        $("body").css("overflow", "auto");
    });
});
$(document).ready(function () {
    $(".loader-container").fadeOut(1000, function () {
        $("body").css("overflow", "auto");
    });
});


// ===================> validation <====================
const nameRegex = /^[a-zA-Z]{3,60}/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const ageRegex = /^([5-9]|[1-9][0-9]|100)$/;
const telRegex = /^0\d{8,10}$/;
const passRegex = /.{5,50}/;


