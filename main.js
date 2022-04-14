//// Quick option to stringify objects into the localstorage
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
//// Quick option to parse objects from the localstorage
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

//// Update the subtotal on load
let shopcartTotal;
console.log(localStorage.getItem("gTotal"));
console.log(localStorage.getObj("cartList"));
document.getElementById("ShopCart").innerText = localStorage.getItem("gTotal");

//// Get reference to the Shopping cart objects
let shopCartArray;
shopCartArray = localStorage.getObj("cartList");
// console.log(shopCartArray);

if (shopCartArray != null){
    //// Check for null objects
    ShowCart();
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
    // console.log(Number(buttonData.value));
    // console.log(buttonData.dataset.page);
    // console.log(buttonData.dataset.vegan);
    
    //// Grab all the button values and store them to their own variables
    let itemCost = buttonData.value;
    let itemLocal = buttonData.dataset.page;
    let itemVegan = buttonData.dataset.vegan;

    //// Instantiate the array, grab the local storage and set the values to an array
    let cartArray = [];
    let cartArrayStore = localStorage.getObj("cartList");
    let storeItems = [{'price': itemCost, 'pLocal': itemLocal, 'veganOption': itemVegan}];
    // console.log(cartArrayStore);
    
    //// Push the button data to the array
    cartArray.push(storeItems[0]);

    // console.log(cartArray[0]);
    
    //// Add the button data to the string from localstorage
    cartArrayStore =  cartArray.concat(cartArrayStore);
    // console.log(cartArrayStore);

    //// Store the new array as a string in the local storage
    localStorage.setObj("cartList", cartArrayStore);
    // console.log(localStorage.getObj("cartList"));

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
    let cartArrays = localStorage.getObj("cartList");
    let cartArrayList = cartArrays;
    console.log(cartArrayList);

    //// Get reference to the table we want to change.
    let getCart = cartArrayList;
    let text = document.getElementById("shopCartTable");
    let shopRow = "";
    console.log(getCart.length);

    //// Removes last null object in array
    if(getCart.includes(null)){
        getCart.pop();
    }

    //// Loop theough array an populate the table with items in array
    for(let i = 0; i < getCart.length; i++){

        console.log(getCart[i]);
        console.log(getCart[i].price);
        let shopTableID = document.querySelectorAll('.shopTable');

        shopRow = "<tr class='shopTable'>";
        shopRow += "<td>" + getCart[i].price + "</td>";
        shopRow += "<td>" + getCart[i].pLocal + "</td>";
        shopRow += "<td>" + getCart[i].veganOption + "</td></tr>";
        
        console.log(shopTableID);
        // if(shopTableID == null){
        //     shopTableID.forEach(shopTable => {
        //         shopTable.remove
        //     });
        //     text.innerHTML += shopRow;}
        // else {
        //     text.innerHTML += shopRow;
        // }
        text.innerHTML += shopRow;
    }
    console.log(shopRow);
    
    // text.innerHTML += shopRow;
}
