const brothsDiv = document.querySelector("#broths");
const proteinsDiv = document.querySelector("#proteins");

async function getBroths() {
  const response = await fetch("http://localhost:8080/broths");
  const broths = await response.json();
  return broths;
}

async function getProteins() {
  const response = await fetch("http://localhost:8080/proteins");
  const proteins = await response.json();
  return proteins;
}


async function displayBroths() {
  broths = await getBroths();
  brothsOptions = broths.map(broth => 
    {
    const label = document.createElement("label");
    const labelContent = `
      <input type='radio' name='broth' value='${broth.id}'>
      <div class="condiment__option">
      <img class='condiment__option__img' src='${broth.imageInactive}' alt='${broth.name}'>
      <h3 class='condiment__option__name'>${broth.name}</h3>
      <p class='condiment__option__desc'>${broth.description}</p>
      <p class='condiment__option__price'>U$${broth.price}</p>
      </div>
    `
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

/*
Criar evento de envio do formulário e pegar os valores escolhidos nele para fazer o pedido
*/