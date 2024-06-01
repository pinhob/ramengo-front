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
      <div class="broth__option">
      <img src='${broth.imageInactive}' alt='${broth.name}'>
      <h3>${broth.name}</h3>
      <p>${broth.description}</p>
      <p>$${broth.price}</p>
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
      <div class="protein__option">
      <img src='${protein.imageInactive}' alt='${protein.name}'>
      <h3>${protein.name}</h3>
      <p>${protein.description}</p>
      <p>$${protein.price}</p>
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