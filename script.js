const form = document.getElementById("form");
const search = document.getElementById("search");
const products = document.getElementById("products");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    products.innerHTML = "";
    msg.textContent = "Loading...";

    try {
        const res = await fetch(
            `https://dummyjson.com/products/search?q=${search.value}`
        );

        const data = await res.json();

        const result = data.products
            .filter(p => p.price > 0)
            .map(p => `
                <div class="card">
                    <img src="${p.thumbnail}">
                    <h3>${p.title}</h3>
                    <p>₹${p.price}</p>
                </div>
            `).join("");

        products.innerHTML = result || "<p>No products found</p>";
        msg.textContent = "";
    } catch (error) {
        msg.textContent = "Something went wrong!";
    }
});
