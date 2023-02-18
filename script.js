const bill = document.getElementById("bill");
const customTip = document.getElementById("custom");
const people = document.getElementById("people");
const errMsg = document.getElementById("err-msg");
const showTip = document.getElementById("tip");
const showTotal = document.getElementById("total");
const resetBtn = document.getElementById("reset");

bill.addEventListener('input', function () {
    resetBtn.style.opacity = '1';
}) 

// Check tip percent
const selectBtns = document.getElementsByClassName("select-tip");

// Change opacity of the Reset button (empty state)
for (let btn of selectBtns) {
  btn.addEventListener("click", function () {
    tipPercent = Number.parseInt(btn.textContent);
  });
}

let tipPercent = 0;

for (let btn of selectBtns) {
  btn.addEventListener("click", function () {
    tipPercent = Number.parseInt(btn.textContent);
    });
}
console.log(tipPercent);

// Calculate bill
people.addEventListener("input", function () {
  if (+people.value === 0) {
    errMsg.style.display = "block";
    showTip.innerText = `$0.00`;
    showTotal.innerText = `$0.00`;
  } else {
    errMsg.style.display = "none";
      
    if (customTip !== "") {
      tipPercent = +customTip.value;
    }

    const billAmount = +bill.value;
    const peopleNo = +people.value;
    const tip = (billAmount * tipPercent) / 100;
    const total = tip + billAmount;
    const totalPerPerson = (total / peopleNo).toFixed(2);
    console.log(total);
    const tipPerPerson = (tip / peopleNo).toFixed(2);
    console.log(tipPerPerson);

    showTip.innerText = `$${tipPerPerson}`;
    showTotal.innerText = `$${totalPerPerson}`;
  }
});



// Reset
resetBtn.addEventListener("click", function () {
  bill.value = people.value = customTip.value = "";
  showTip.textContent = showTotal.textContent = `$0.00`;
  resetBtn.style.opacity = "0.3";
  tipPercent = 0;
  errMsg.style.display = "none";
});
