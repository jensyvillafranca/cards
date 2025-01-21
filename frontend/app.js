const API_URL = "http://localhost:3000/cards";

document.getElementById("card-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value; 
    const descriptionElements = document.querySelectorAll(".description");
    const descriptions = Array.from(descriptionElements).map((input) => input.value);

    console.log({ title, descriptions });

    const cardId = e.target.dataset.cardId;

    if (cardId) {
        // Actualizar tarjeta
        try {
            await fetch(`${API_URL}/${cardId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, descriptions }),
            });
            resetForm();
            loadCards();
        } catch (error) {
            console.error("Error al actualizar tarjeta:", error);
        }
    } else {
        // Crear nueva tarjeta
        try {
            await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, descriptions }),
            });
            resetForm();
            loadCards();
        } catch (error) {
            console.error("Error al añadir tarjeta:", error);
        }
    }
});

// Añadir campos dinámicos para descripciones
document.getElementById("add-description").addEventListener("click", () => {
    const container = document.getElementById("descriptions-container"); // ID correcto
    const count = container.children.length + 1;
    const input = document.createElement("input");
    input.type = "text";
    input.className = "description";
    input.placeholder = `Descripción ${count}`;
    container.appendChild(input);
});

// Cargar todas las tarjetas desde el backend
async function loadCards() {
    try {
        const response = await fetch(API_URL);
        const cards = await response.json();
        const cardContainer = document.getElementById("card-container");
        cardContainer.innerHTML = "";

        cards.forEach((card) => {
            const cardElement = document.createElement("div");
            cardElement.classList.add("card");

            const descriptionsHtml = card.descriptions
                .map((desc) => `<li>${desc}</li>`)
                .join("");

            cardElement.innerHTML = `
                <h3>${card.titleCard}</h3>
                <p><strong>Created At:</strong> ${new Date(card.createdAt).toLocaleString()}</p>
                <p><strong>Descriptions:</strong></p>
                <ul>${descriptionsHtml}</ul>
                <button onclick="editCard('${card.idCard}', '${card.title}', '${JSON.stringify(
                card.descriptions
            )}')">Edit</button>
                <button onclick="deleteCard('${card.idCard}')">Delete</button>
            `;
            cardContainer.appendChild(cardElement);
        });
    } catch (error) {
        console.error("Error al cargar las tarjetas", error);
    }
}

// Eliminar tarjeta
async function deleteCard(id) {
    try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        loadCards();
    } catch (error) {
        console.error("Error al eliminar la tarjeta", error);
    }
}

// Editar tarjeta
function editCard(id, title, descriptions) {
    document.getElementById("title").value = title; // Campo correcto
    const parsedDescriptions = JSON.parse(descriptions);
    const container = document.getElementById("descriptions-container"); // ID correcto
    container.innerHTML = "";

    parsedDescriptions.forEach((desc, index) => {
        const input = document.createElement("input");
        input.type = "text";
        input.className = "description";
        input.value = desc;
        input.placeholder = `Description ${index + 1}`;
        container.appendChild(input);
    });

    document.getElementById("card-form").dataset.cardId = id;
}

// Resetear formulario
function resetForm() {
    document.getElementById("card-form").reset();
    document.getElementById("descriptions-container").innerHTML = `
        <input type="text" class="description" placeholder="Description 1" required />
    `;
    delete document.getElementById("card-form").dataset.cardId;
}

// Cargar las tarjetas al inicio
loadCards();
