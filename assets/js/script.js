document.addEventListener("DOMContentLoaded", function () {
  const amountInput = document.getElementById("amount");
  const fromCurrencySelect = document.getElementById("fromCurrency");
  const toCurrencySelect = document.getElementById("toCurrency");
  const resultParagraph = document.getElementById("result");

  function getExchangeRate() {
    const amount = amountInput.value;
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    // console.log(
    //     "( Ammount :",
    //     amount,
    //     ") ",
    //     "FromCurrency :",
    //     fromCurrency,
    //     " -> ",
    //     "ToCurrency:",
    //     toCurrency
    //   );

    if (amount === "") {
      resultParagraph.textContent = "";
      return;
    }

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

  amountInput.addEventListener("input", getExchangeRate);
  fromCurrencySelect.addEventListener("change", getExchangeRate);
  toCurrencySelect.addEventListener("change", getExchangeRate);
});
