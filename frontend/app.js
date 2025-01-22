const API_URL = "http://localhost:3000/cards";

document.getElementById("card-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value; 
    const descriptionElements = document.querySelectorAll(".description");
    const descriptions = Array.from(descriptionElements).map((input) => input.value);

    console.log({ title, descriptions });

    const cardId = e.target.dataset.cardId;
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

async function loadCards() {
    try {
        const response = await fetch(API_URL);
        const cards = await response.json();
        const cardContainer = document.getElementById("card-container");
        cardContainer.innerHTML = ""; 

        cards.forEach((card) => {
            const cardElement = document.createElement("div");
            cardElement.classList.add("card");

            // console.log(card.descriptions.idDescription);
            const descriptionsHtml = card.descriptions
                .map((desc) => `<li id="${desc.idDescription}">${desc.description}</li>`)
                .join("");

            cardElement.innerHTML = `
                <h3>${card.titleCard}</h3>
                <p><strong>Created At:</strong> ${new Date(card.createdAt).toLocaleString()}</p>
                <p><strong>Descriptions:</strong></p>
                <ul>${descriptionsHtml}</ul>
                <button onclick="editCard('${card.idCard}', '${encodeURIComponent(card.titleCard)}', '${encodeURIComponent(JSON.stringify(card.descriptions))}')">Edit</button>
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

// Resetear formulario
function resetForm() {
    document.getElementById("title").value = "";
    document.getElementById("descriptions-container").innerHTML = `
        <input type="text" class="description" placeholder="Descripción 1" required />
    `;
    document.getElementById("save-button").style.display = "inline-block";
    document.getElementById("update-button").style.display = "none";
}


//Esto es para poder actualizar los datos 
async function updateCard(idCard) {
    const title = document.getElementById("title").value;
    const descriptions = Array.from(document.querySelectorAll(".description")).map((input, index) => ({
        idDescription: input.dataset.idDescription || null, 
        description: input.value.trim(),
    }));

    const updateCardDto = { title, descriptions };
    console.log(descriptions);

    try {
        const response = await fetch(`${API_URL}/${idCard}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateCardDto),
        });

        if (response.ok) {
            alert("Tarjeta actualizada correctamente.");
            loadCards(); 
            resetForm(); 
        } else {
            throw new Error("Error al actualizar la tarjeta.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Hubo un problema al actualizar la tarjeta.");
    }
}


function editCard(idCard, titleCard, descriptions) {
    // Asignar el título al campo correspondiente
    document.getElementById("title").value = decodeURIComponent(titleCard);

    // Limpiar el contenedor de descripciones
    const descriptionsContainer = document.getElementById("descriptions-container");
    descriptionsContainer.innerHTML = "";

    // Procesar y mostrar las descripciones
    const parsedDescriptions = JSON.parse(decodeURIComponent(descriptions));
    parsedDescriptions.forEach((desc) => {
        const input = document.createElement("input");
        input.type = "text";
        input.className = "description";
        input.placeholder = "Descripción";

        // Asignar valores de descripción
        input.value = desc.description || ""; // Si `desc` es un objeto, usamos `desc.description`
        input.dataset.idDescription = desc.idDescription || null; // Guardar el ID en data-idDescription

        descriptionsContainer.appendChild(input);
    });

    // Configurar botón de actualización
    const updateButton = document.getElementById("update-button");
    updateButton.onclick = () => updateCard(idCard);
    document.getElementById("update-button").style.display = "inline-block";
}


loadCards();
