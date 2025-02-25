import { API_KEY } from "./config1.js";
import { country_code } from "./country-list.js";

const dropList = document.querySelectorAll(".drop-list select"),
  fromCurrency = document.querySelector(".from select"),
  toCurrency = document.querySelector(".to select"),
  getButton = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
  for (let currency_code in country_code) {
    //Default currencies (FROM: USD  TO: GBP)
    let selected;
    if (i == 0) {
      selected = currency_code == "USD" ? "selected" : "";
    } else if (i == 1) {
      selected = currency_code == "GBP" ? "selected" : "";
    }
    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }

  dropList[i].addEventListener("change", (e) => {
    loadFlag(e.target);
  });
}

//Function to get the flag based on the country code
function loadFlag(element) {
  for (let code in country_code) {
    if (code == element.value) {
      let imgTag = element.parentElement.querySelector("img");
      imgTag.src = `https://flagsapi.com/${country_code[code]}/flat/64.png`;
    }
  }
}

window.addEventListener("load", () => {
  getExchangeRate();
});

getButton.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

//Code to make the exchange icon work
const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", () => {
  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
});

function getExchangeRate() {
  const amount = document.querySelector(".amount input");
  const exchangeRateTxt = document.querySelector(".exchange-rate");
  let amountVal = amount.value;
  // Giving a default value of 1 when nothing has been entered into the field
  if (amountVal == "" || amountVal == "0") {
    amount.value = "1";
    amountVal = 1;
  }

  exchangeRateTxt.innerText = `Getting exchange rate...`;
  let url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency.value}`;
  //Fetchig result from API
  fetch(url).then((response) =>
    response
      .json()
      .then((result) => {
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExchageRate = (amountVal * exchangeRate).toFixed(2);

        exchangeRateTxt.innerHTML = `${amountVal} ${fromCurrency.value} = ${totalExchageRate} ${toCurrency.value}`;
      })
      .catch(() => {
        exchangeRateTxt.innerText = "Something went wrong :(";
      })
  );
}
