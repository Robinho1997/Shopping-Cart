let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop =()=>{
    return (shop.innerHTML = shopItemsData.map((shopItem)=>{
        let {id,name,price,desc,img} = shopItem;
        let search = basket.find((shopItem) => shopItem.id === id) || [];
        return `
        <div id=product-id-${id} class="item">
                <img width="220" height="170" src=${img} alt="">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class="price-quantity">
                        <h2>${price}€</h2>
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id=${id} class="quantity">
                            ${search.item === undefined? 0: search.item}
                            </div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>
                    </div>
                </div>
            </div>
            `
    }).join(""));
};

generateShop();

let increment = (id) => {
    let selectedItem = id;
    let search = 
    basket.find((shopItem) => shopItem.id === selectedItem.id);
    // sucht im Basket nach Item
    if (search === undefined) { 
        basket.push({ // falls es nicht existiert, erstellt Item
            id: selectedItem.id,
            item: 1,
        });
    }
    else {
        search.item += 1; // ansonten fügt dem Item + 1 hinzu
    }
    
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
    let selectedItem = id;
    let search =
    basket.find((shopItem) => shopItem.id === selectedItem.id);
    if (search === undefined) return;
    else if (search.item === 0) return;  // falls Item Menge 0 ist stopp
    else {
        search.item -= 1; //ansonsten - 1
    }
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0)
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id)
    document.getElementById(id).innerHTML = search.item;
    // Die Anzahl des Items wird geändert und dargestellt
    calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML =
  basket.map((quantity) => quantity.item).reduce((x,y)=> x + y, 0);
};

calculation();