const BROTHS_FORM_DIV = document.querySelector("#broths");
const PROTEINS_FORM_DIV = document.querySelector("#proteins");
const CONDIMENTS = document.querySelectorAll(".condiments");

const API_URL = "http://localhost:8080";
const API_KEY = "ZtVdh8XQ2U8pWI2gmZ7f796Vh8GllXoN7mr0djNf";


/* get condiments */
async function getCondimentsByType(condiment) {
  const response = await fetch(`${API_URL}/${condiment}`, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY
    }
  });

  const condiments = await response.json();

  return condiments;
}

async function getBroths() {
  const broths = await getCondimentsByType("broths");
  return broths;
}

async function getProteins() {
  const proteins = await getCondimentsByType("proteins");
  return proteins;
}

/* display condiments */
function createCondimentDataElement(condimentType, data) {
  return `
  <input type='radio' name='${condimentType}' value='${data.id}'>
  <div class='condiment__option ${condimentType}-${data.id}'>
  <img class='condiment__option__img' src='${data.imageInactive}' alt='${data.name}'>
  <h3 class='condiment__option__name'>${data.name}</h3>
  <p class='condiment__option__desc'>${data.description}</p>
  <p class='condiment__option__price'>U$${data.price}</p>
  </div>
  `
}

function createCondimentOptionElement(condimentType, data) {
  const condiment = document.createElement("label");
  const condimentContent = createCondimentDataElement(condimentType, data);
  condiment.className = "condiment__label";
  condiment.innerHTML = condimentContent;
  return condiment
}


async function displayBroths() {
  broths = await getBroths();
  brothsOptions = broths.map(brothData => createCondimentOptionElement("broth", brothData))
  brothsOptions.forEach(option => BROTHS_FORM_DIV.appendChild(option));
}

async function displayProteins() {
  const proteins = await getProteins();
  const proteinsOptions = proteins.map(protein => createCondimentOptionElement("protein", protein));
  proteinsOptions.forEach(option => PROTEINS_FORM_DIV.appendChild(option));
}

/* handle interaction with inputs */
function handleCtaButtonClick() {
  document.querySelector(".condiment__label").focus();
}

function handleSubmitButtonState() {
  const selectedBroth = document.querySelector('input[name="broth"]:checked');
  const selectedProtein = document.querySelector('input[name="protein"]:checked');

  if (selectedBroth?.value && selectedProtein?.value) {
    document.querySelector(".form__button").disabled = false;
  }
}

function handleOptionImageState(child) {
    const radioInput = child.childNodes[1];
    const imageElement = child.childNodes[3].getElementsByTagName("img")[0];
    const isOptionSelected = radioInput.checked;
    let imageSrcUrl = imageElement.src;
    const imageIsActive = new RegExp(/\bactive\b/).test(imageSrcUrl);
    

    if (isOptionSelected && !imageIsActive) {
      imageElement.src = imageSrcUrl.replace("inactive", "active");
    }

    if (!isOptionSelected && imageIsActive) {
      imageElement.src = imageSrcUrl.replace("active", "inactive");
    }
}

// Add a click event handler to every option of broths and proteins.Handle the option image state and the submit button state.
function handleCondimentSelection() {
  for (let i = 0; i < CONDIMENTS.length; i++) {
    const condimentOptions = CONDIMENTS[i];

    condimentOptions.addEventListener('click', () => {
      handleSubmitButtonState();

      for (const child of CONDIMENTS[i].children) {
        handleOptionImageState(child);
      }
    });
  }
}

/* handle order form submission */
function createOrderLocalSession(data) {
  sessionStorage.setItem("orderDetails", JSON.stringify(data));
}

function redirectToOrderPage() {
  window.location.href = "order.html";
}

async function createOrder() {
  event.preventDefault();

  const selectedBroth = document.querySelector('input[name="broth"]:checked');
  const selectedProtein = document.querySelector('input[name="protein"]:checked');

  const requestBody = JSON.stringify({
    "brothId": selectedBroth.value,
    "proteinId": selectedProtein.value
  });

  const request = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY
    },
    body: requestBody
  });

  const response = await request.json();

  createOrderLocalSession(response);
  redirectToOrderPage();
}

/* call functions */
displayBroths();
displayProteins();
handleCondimentSelection();
