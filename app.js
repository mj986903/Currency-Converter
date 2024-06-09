/** @format */

const BASE_URL =
  "https://v6.exchangerate-api.com/v6/78a11e7d94d32c8573e40e33/latest/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const exchangeBtn = document.querySelector(".dropdown button");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}${fromCurr.value.toLowerCase()}`;
  let respose = await fetch(URL);
  let data = await respose.json();
  let rate = data.conversion_rates[toCurr.value.toUpperCase()];
  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const exchange = () => {
  const temp = fromCurr.value;
  fromCurr.value = toCurr.value;
  toCurr.value = temp;
  let flag1 = dropdowns[0].parentElement.querySelector("img");
  let flag2 = dropdowns[1].parentElement.querySelector("img");
  let tempflag = flag1.getAttribute("src");
  flag1.setAttribute("src", flag2.getAttribute("src"));
  flag2.setAttribute("src", tempflag);
};

exchangeBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  exchange();
  updateExchangeRate();
});

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
