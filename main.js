//// Quick option to stringify objects into the localstorage
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
//// Quick option to parse objects from the localstorage
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

//// Update the subtotal on load
document.getElementById("ShopCart").innerText = localStorage.getItem("gTotal");

//// Get reference to the Shopping cart objects
let shopCartArray = localStorage.getObj("cartList");

//// Checks if shopping cart is null
if (shopCartArray != null){
    ShowCart();
    updateCartAmount();
}

function ResetCounter(){
    //// Set the subtotal back to 0
    localStorage.setItem("gTotal", 0);
    document.getElementById("ShopCart").innerText = localStorage.getItem("gTotal");
}
function ResetArray(){
    //// Remove all object from the local storage
    localStorage.clear();
}

function addToCart(buttonData){

    //// Grab all the button values and store them to their own variables
    let itemCost = buttonData.value;
    let itemLocal = buttonData.dataset.page;
    let itemFood = buttonData.dataset.menuitem;
    //// Instantiate the array, grab the local storage and set the values to an array
    let cartArray = [];
    let cartArrayStore = localStorage.getObj("cartList");
    let storeItems = [{'price': itemCost, 'pLocal': itemLocal, 'menuFood': itemFood}];
    //// Push the button data to the array
    cartArray.push(storeItems[0]);
    //// Add the button data to the string from localstorage
    cartArrayStore =  cartArray.concat(cartArrayStore);
    //// Store the new array as a string in the local storage
    localStorage.setObj("cartList", cartArrayStore);
    //// Add the button price value to the shopping cart total
    let cartTotal = Number(document.getElementById("ShopCart").innerText);
    cartTotal = Number(localStorage.getItem("gTotal")) + Number(buttonData.value);
    //// Set the new value of the local storage
    localStorage.setItem("gTotal", cartTotal);    
    //// Display the subtotal from the localstorage
    document.getElementById("ShopCart").innerText = localStorage.getItem("gTotal");

    ShowCart();
}

function ShowCart(){

    //// Grab the localstorage string/array
    let getCart = localStorage.getObj("cartList");
    //// Get reference to the table we want to change.
    let text = document.getElementById("shopCartTable");
    let shopRow = "";
    //// Removes last null object in array
    if(getCart.includes(null)){
        getCart.pop();
    }

    //// Loop theough array an populate the table with items in array
    for(let i = 0; i < getCart.length; i++){

        shopRow = "<tr class='shopTable'>";
        shopRow += "<td class='td'>" + getCart[i].menuFood + "</td>";
        shopRow += "<td>" + getCart[i].pLocal + "</td>";
        shopRow += "<td>" + getCart[i].price + "</td>";
        shopRow += "<td>" + "<button type='button' class='btn btn-danger glyphicon glyphicon-minus btn-minus' data-arrValue=" + [i] +" onClick='(removeFromCart(this))'>-</button>" + "<td></tr>";
        //// For each item in the array add to the HTML
        text.innerHTML += shopRow;
    }

    // setTimeout(function() { location.reload() },5000)
}

function removeFromCart(arrItem){
    //// Get references to local storage items
    let itemArr = localStorage.getObj("cartList");
    let itemCost = localStorage.getItem("gTotal");
    let itemPlace = arrItem.dataset.arrvalue
    //// Decrease the subtotal and item from array
    itemCost -= itemArr[itemPlace].price;
    itemArr.splice(itemPlace, 1);
    localStorage.setObj("cartList", itemArr);
    localStorage.setItem("gTotal", itemCost);
    //// Sets the new array/object values to local storage
    document.getElementById("ShopCart").innerText = localStorage.getItem("gTotal");
    location.reload();

}

function updateCartAmount(){
    let cartNumber = localStorage.getObj("cartList");
    document.getElementById("cartAmount").innerText = cartNumber.length - 1;
}

function Checkout(){
    let randomWait;
    let min = 10;
    let max = 60;
    min = Math.ceil(min);
    max = Math.floor(max);
    randomWait = Math.floor(Math.random() * (max - min + 1)) + min;
    alert("Thank you for ordering with Gourmade. \n\nYour order is being prepared and will be ready in:\n" + randomWait + " minutes. \n\nEnjoy!");
}