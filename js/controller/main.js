import { servicesProducts } from "../service/product-service.js";

const productContainer = document.querySelector("[data-products]");
const form = document.querySelector("[data-form]");

function createCard (name, price, image, id) {
    const card = document.createElement("div");
    card.classList.add("cards")

    card.innerHTML = `
        <div class="img-container">
            <img class="img__producto" src="${image}" alt="${name}">
        </div>
       
            <div class="card-container--info">
                <p>${name}</p>
                <div class="card-container--value">
                    <p>$ ${price}</p>
                    <button class="delete-button" data-id="${id}">
                        <img class="img__borrar" src="./assets/trash.png" alt="Eliminar">
                </div>
            </div>
    `;

    const deleteButton = card.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => handleDelete(id));

    productContainer.appendChild(card);
    return card;
}

const handleDelete = (id) => {
    servicesProducts.deleteProduct(id)
        .then(() => {
            const card = productContainer.querySelector(`[data-id="${id}"]`).closest(".card");
            card.remove();
            console.log("Producto eliminado");
        })
        .catch((err) => console.log(err));
  };
  
  
  
  productContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-button")) {
        const id = event.target.dataset.id;
        servicesProducts.deleteProduct(id)
            .then(() => {
                event.target.closest(".card").remove();
                console.log("Producto eliminado");
            })
            .catch((err) => console.log(err));
    }
  });


const render = async () => {
    try {
        const listProduct = await servicesProducts.productList();
           
            listProduct.forEach(product => {
                productContainer.appendChild(createCard(
                        product.name,
                        product.price,
                        product.image,
                        product.id
                    )
                )
            });

        } catch (error) {
            console.log(error);
         }
};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    servicesProducts.createProducts(name, price, image)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

});

render();