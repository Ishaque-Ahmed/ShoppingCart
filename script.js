let btnOne = document.querySelector('#addToCartOne');
let btnTwo = document.querySelector('#addToCartTwo');
let btnThree = document.querySelector('#addToCartThree');
let btnFour = document.querySelector('#addToCartFour');
let btnFive = document.querySelector('#addToCartFive');
let btnSix = document.querySelector('#addToCartSix');



btnOne.addEventListener('click', addTocart);
btnTwo.addEventListener('click', addTocart);
btnThree.addEventListener('click', addTocart);
btnFour.addEventListener('click', addTocart);
btnFive.addEventListener('click', addTocart);
btnSix.addEventListener('click', addTocart);
document.addEventListener('DOMContentLoaded', getTasks);

function addTocart(e) {
        let name = e.target.parentElement.firstElementChild.textContent;
        let price = e.target.parentElement.firstElementChild.nextElementSibling.firstElementChild.textContent;
        showCart(name, price);
}
function showCart(name, price) {

        let cart = document.querySelector('#shoppingCart');

        let li = document.createElement('li');

        li.className = "card card-body mb-5 p-2";

        let div = document.createElement('div');

        let removeBtn = document.createElement('button');
        removeBtn.className = "btn btn-primary";
        removeBtn.setAttribute("type", "button");
        removeBtn.setAttribute('id', 'removeFromCart');
        removeBtn.addEventListener('click', removeFromCart);
        removeBtn.appendChild(document.createTextNode(`Remove From Cart`));

        div.innerHTML = `<p>Product Name: <span class="fw-bold fs-4">${name}</span> Product Price: <span class="fw-bold fs-4"> ${price}</span> </p>
        `;
        div.appendChild(removeBtn);

        li.appendChild(div);

        cart.appendChild(li);

        storeTaskInLocalStorage(name, price);

}
function storeTaskInLocalStorage(name, price) {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
                tasks = [];
        } else {
                tasks = JSON.parse(localStorage.getItem('tasks'));
        }

        tasks.push({ name, price });

        localStorage.setItem('tasks', JSON.stringify(tasks));
}
function getTasks() {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
                tasks = [];
        }
        else {
                tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.forEach(task => {
                let cart = document.querySelector('#shoppingCart');

                let li = document.createElement('li');

                li.className = "card card-body mb-5 p-2";

                let div = document.createElement('div');

                let removeBtn = document.createElement('button');
                removeBtn.className = "btn btn-primary";
                removeBtn.setAttribute("type", "button");
                removeBtn.setAttribute('id', 'removeFromCart');
                removeBtn.addEventListener('click', removeFromCart);
                removeBtn.appendChild(document.createTextNode(`Remove From Cart`));

                div.innerHTML = `<p>Product Name: <span class="fw-bold fs-4">${task.name}</span> Product Price: <span class="fw-bold fs-4"> ${task.price}</span> </p>
                `;
                div.appendChild(removeBtn);

                li.appendChild(div);

                cart.appendChild(li);
        });

}



function removeFromCart(e) {
        let selected = e.target.parentElement.parentElement;
        if (confirm("Are you sure to Remove?")) {
                selected.remove();
                removeFromLS(selected);
        }

}
function removeFromLS(selected) {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
                tasks = [];
        }
        else {
                tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        //console.log(selected);
        let newname = selected.firstElementChild.firstElementChild.firstElementChild.textContent;
        let newprice = selected.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.textContent;

        let currentTask = { name: newname, price: newprice };
        //console.log(currentTask);
        tasks.every((task, index) => {
                if (currentTask["name"].trim() === task["name"] && currentTask["price"].trim() === task["price"]) {
                        tasks.splice(index, 1);
                        return false;
                }
                return true;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
}
