const brothsDiv = document.querySelector("#broths");
const proteinsDiv = document.querySelector("#proteins");
const proteinsData = [];
const brothsData = [];

async function getBroths() {
  const response = await fetch("http://localhost:8080/broths");
  const broths = await response.json();
  brothsData.push(...broths); 
  return broths;
}

async function getProteins() {
  const response = await fetch("http://localhost:8080/proteins");
  const proteins = await response.json();
  proteinsData.push(...proteins);
  return proteins;
}


async function displayBroths() {
  broths = await getBroths();
  brothsOptions = broths.map(broth => 
    {
    const label = document.createElement("label");
    const labelContent = `
      <input type='radio' name='broth' value='${broth.id}'>
      <div class='condiment__option broth-${broth.id}'>
      <img class='condiment__option__img' src='${broth.imageInactive}' alt='${broth.name}'>
      <h3 class='condiment__option__name'>${broth.name}</h3>
      <p class='condiment__option__desc'>${broth.description}</p>
      <p class='condiment__option__price'>U$${broth.price}</p>
      </div>
    `
    label.className = "condiment__label";
    label.innerHTML = labelContent;
    return label
    })
  brothsOptions.forEach(option => brothsDiv.appendChild(option));
}

async function displayProteins() {
  const proteins = await getProteins();
  const proteinsOptions = proteins.map(protein => 
    {
    label = document.createElement("label");
    labelContent = `
      <input type='radio' name='protein' value='${protein.id}'>
      <div class="condiment__option">
      <img src='${protein.imageInactive}' alt='${protein.name}' class='condiment__option__img'>
      <h3 class='condiment__option__name'>${protein.name}</h3>
      <p class='condiment__option__desc'>${protein.description}</p>
      <p class='condiment__option__price'>$${protein.price}</p>
      </div>
    `
    label.innerHTML = labelContent;
    return label
    })
  
  proteinsOptions.forEach(option => proteinsDiv.appendChild(option));
  }

displayBroths();
displayProteins();

// TODO: change the image of the selected condiment. need refactor
document.querySelector(".condiments").addEventListener('click', function (event) {
  if (event.target && event.target.matches("input[type='radio']")) {
    const optionDiv = event.target.nextElementSibling;
    for (const child of optionDiv.children) {
      if (child.tagName === 'IMG') {
        if (child.src.includes("inactive")) {
          child.src = child.src.replace("inactive", "active");
          }
        }
      }
  }
});

function createOrderLocalSession(data) {
  sessionStorage.setItem("orderDetails", JSON.stringify(data));
}

function redirectToOrderPage() {
  window.location.href = "order.html";
}

async function validateForm() {
  event.preventDefault();

  const selectedBroth = document.querySelector('input[name="broth"]:checked');
  const selectedProtein = document.querySelector('input[name="protein"]:checked');

  console.log(selectedBroth.value, selectedProtein.value);

  const reqBody = JSON.stringify({
    "brothId": selectedBroth.value,
    "proteinId": selectedProtein.value
  });

  const request = await fetch("http://localhost:8080/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "ZtVdh8XQ2U8pWI2gmZ7f796Vh8GllXoN7mr0djNf"
    },
    body: reqBody
  });

  const response = await request.json();

  console.log("res: ", response);

  createOrderLocalSession(response);
  redirectToOrderPage();
}

/*
Criar evento de envio do formulário e pegar os valores escolhidos nele para fazer o pedido
*/