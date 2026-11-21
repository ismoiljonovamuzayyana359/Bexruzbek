let products = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        category: "Telefon",
        price: 13000000,
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500"
    },
    {
        id: 2,
        name: "Samsung Galaxy",
        category: "Telefon",
        price: 4500000,
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500"
    },
    {
        id: 3,
        name: "MacBook Air",
        category: "Kompyuter",
        price: 14000000,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500"
    },
    {
        id: 4,
        name: "Lenovo Laptop",
        category: "Kompyuter",
        price: 6500000,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500"
    },
    {
        id: 5,
        name: "Erkaklar futbolkasi",
        category: "Kiyim",
        price: 120000,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
    },
    {
        id: 6,
        name: "Nike krossovka",
        category: "Kiyim",
        price: 850000,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },
    {
        id: 7,
        name: "JBL naushnik",
        category: "Texnika",
        price: 550000,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    },
    {
        id: 8,
        name: "Smart Watch",
        category: "Texnika",
        price: 700000,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    }
];

let cart = [];

function money(price) {
    return price.toLocaleString("uz-UZ") + " so'm";
}

function displayProducts(list) {
    let box = document.getElementById("products");

    box.innerHTML = "";

    if (list.length === 0) {
        box.innerHTML = "<h3>Mahsulot topilmadi!</h3>";
        return;
    }

    list.forEach(product => {
        box.innerHTML += `
            <div class="card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${money(product.price)}</p>
                <button onclick="addCart(${product.id})">
                    Savatga qo'shish
                </button>
            </div>
        `;
    });
}

function showAll() {
    document.getElementById("title").innerText = "Barcha mahsulotlar";
    displayProducts(products);
}

function filterCategory(category) {
    let result = products.filter(product =>
        product.category === category
    );

    document.getElementById("title").innerText = category + "lar";
    displayProducts(result);
}

function addCart(id) {
    let product = products.find(item => item.id === id);
    let existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
    alert("Mahsulot savatga qo'shildi!");
}

function updateCart() {
    let count = cart.reduce((sum, item) => sum + item.quantity, 0);

    document.getElementById("count").innerText = count;

    let box = document.getElementById("cartItems");
    box.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        box.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong>
                    <p>${money(item.price)} × ${item.quantity}</p>
                </div>

                <button onclick="removeCart(${item.id})">
                    O'chirish
                </button>
            </div>
        `;
    });

    document.getElementById("total").innerText =
        "Jami: " + money(total);
}

function removeCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function showCart() {
    document.getElementById("cartBox").style.display = "flex";
}

function closeCart() {
    document.getElementById("cartBox").style.display = "none";
}

function order() {
    if (cart.length === 0) {
        alert("Savatingiz bo'sh!");
        return;
    }

    let name = prompt("Ismingizni kiriting:");

    if (!name || !name.trim()) return;

    let phone = prompt("Telefon raqamingizni kiriting:");

    if (!phone || !phone.trim()) return;

    alert(
        "Rahmat, " + name +
        "! Buyurtmangiz qabul qilindi.\n" +
        "Telefon: " + phone
    );

    cart = [];
    updateCart();
    closeCart();
}

document.getElementById("search").addEventListener("input", function() {
    let value = this.value.toLowerCase();

    let result = products.filter(product =>
        product.name.toLowerCase().includes(value)
    );

    document.getElementById("title").innerText = "Qidiruv natijalari";
    displayProducts(result);
});

displayProducts(products);
updateCart();