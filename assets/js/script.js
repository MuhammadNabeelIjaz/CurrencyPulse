document.addEventListener("DOMContentLoaded", function () {
  const amountInput = document.getElementById("amount");
  const fromCurrencySelect = document.getElementById("fromCurrency");
  const toCurrencySelect = document.getElementById("toCurrency");
  const resultParagraph = document.getElementById("result");
  const clearFieldsButton = document.getElementById("clearFieldsbutton");

  function getExchangeRate() {
    const amount = amountInput.value;
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (amount === "") {
      resultParagraph.textContent = "";
      return;
    }
    // API Integration
    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.rates[toCurrency]) {
          const exchangeRate = data.rates[toCurrency];
          const convertedAmount = (amount * exchangeRate).toFixed(2);
          resultParagraph.textContent = `${convertedAmount}`;
        } else {
          //   resultParagraph.textContent = "Unable to get exchange rates.";
          alert("Unable to get exchange rates.");
        }
      })
      .catch((error) => {
        // resultParagraph.textContent = "Error fetching exchange rates.";
        alert("Error fetching exchange rates.");
        console.error(error);
      });
  }

  function clearFields() {
    amountInput.value = "";
    fromCurrencySelect.selectedIndex = 0;
    toCurrencySelect.selectedIndex = 0;
    resultParagraph.textContent = "";
  }

  amountInput.addEventListener("input", getExchangeRate);
  fromCurrencySelect.addEventListener("change", getExchangeRate);
  toCurrencySelect.addEventListener("change", getExchangeRate);
  clearFieldsButton.addEventListener("click", clearFields);
});
