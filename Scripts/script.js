const formulario = document.querySelector(".perfil-form");
const nomeInput = formulario.querySelectorAll("input")[0];
const emailInput = formulario.querySelectorAll("input")[1];

const API = "https://jsonplaceholder.typicode.com/users";

const botao = document.createElement("button");
botao.textContent = "Mostrar usuários já cadastrados!";
botao.classList.add("btn-usuarios");
botao.style.marginTop = "15px";
formulario.parentElement.appendChild(botao);

let listaVisivel = false; 

botao.addEventListener("click", async () => {
    listaVisivel = !listaVisivel; 

    if (listaVisivel) {
        botao.textContent = "Fechar lista de usuários";
        lista.style.display = "block"; 
        
        const resposta = await fetch(API);
        usuarios = await resposta.json();
        mostrar();
    } else {
        botao.textContent = "Mostrar usuários já cadastrados!";
        lista.style.display = "none"; 
    }
});

const lista = document.createElement("div");
lista.classList.add("lista-usuarios");
formulario.parentElement.appendChild(lista);

let usuarios = [];

// GET
botao.addEventListener("click", async () => {
  const resposta = await fetch(API);
  usuarios = await resposta.json();
  mostrar();
});

function mostrar() {
  lista.innerHTML = "";

  usuarios.forEach(u => {
    const div = document.createElement("div");

    div.innerHTML = `
      <strong>${u.name}</strong> - ${u.email}
      <button data-id="${u.id}" class="editar">Editar</button>
      <button data-id="${u.id}" class="deletar">Deletar</button>
      <hr>
    `;

    lista.appendChild(div);
  });
}

// POST
formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: nomeInput.value,
      email: emailInput.value
    })
  });

  nomeInput.value = "";
  emailInput.value = "";
});


lista.addEventListener("click", async (e) => {
  const id = e.target.dataset.id;
  if (!id) return;

  // PUT
  if (e.target.className === "editar") {
    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Alterado",
        email: "alterado@email.com"
      })
    });

    usuarios = usuarios.map(u =>
      u.id == id ? { ...u, name: "Alterado", email: "alterado@email.com" } : u
    );

    mostrar();
  }

  // DELETE
  if (e.target.className === "deletar") {
    await fetch(`${API}/${id}`, {
      method: "DELETE"
    });

    usuarios = usuarios.filter(u => u.id != id);
    mostrar();
  }
});

//Query buscar

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');

searchForm.addEventListener('submit', function(event) {
    event.preventDefault(); 
    const termoBusca = searchInput.value.trim();
    if (termoBusca) {
        window.location.href = `/produtos?busca=${encodeURIComponent(termoBusca)}`;
    } else {
        alert("Por favor, digite algo para pesquisar!");
    }
});