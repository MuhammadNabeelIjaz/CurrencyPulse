document.addEventListener("DOMContentLoaded", function () {
  const amountInput = document.getElementById("amount");
  const fromCurrencySelect = document.getElementById("fromCurrency");
  const toCurrencySelect = document.getElementById("toCurrency");
  const resultParagraph = document.getElementById("result");
  const copyResultButton = document.getElementById("copyResultbutton");
  const clearFieldsButton = document.getElementById("clearFieldsbutton");

  function getExchangeRate() {
    const amount = amountInput.value;
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;
    // Validation:
    // Ensure input fields are not left empty.
    // Ensure the entered amount is a valid number greater than zero.
    if (amount === "" || amount <= 0) {
      resultParagraph.textContent = "Enter a valid amount.";
      return;
    }

    // API Integration
    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.rates[toCurrency]) {
          const exchangeRate = data.rates[toCurrency];
          console.log(exchangeRate);

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

  function copyResult() {
    const resultText = resultParagraph.textContent;
    if (resultText === "Enter a valid amount." || resultText === "") {
      alert("Sorry, nothing to copy.");
      return;
    }
    if (resultText) {
      navigator.clipboard
        .writeText(resultText)
        .then(() => {
          alert("Result copied to clipboard.");
        })
        .catch((error) => {
          alert("Failed to copy result.");
          console.error(error);
        });
    } else {
      alert("No result to copy.");
    }
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
  copyResultButton.addEventListener("click", copyResult);
  clearFieldsButton.addEventListener("click", clearFields);
});
