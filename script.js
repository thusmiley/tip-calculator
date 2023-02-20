const bill = document.getElementById("bill");
const customTip = document.getElementById("custom");
const people = document.getElementById("people");
const errMsg = document.getElementById("err-msg");
const showTip = document.getElementById("tip");
const showTotal = document.getElementById("total");
const resetBtn = document.getElementById("reset");
const selectBtns = document.getElementsByClassName("select-tip");
let tipPercent = 0;

// Change opacity of the Reset button (empty state)
let changeResetBtnOpacityToActive = function(){
  resetBtn.style.opacity = '1';
};

//Calculates the final bill if there are inputs for bill, tip, and number of people
let calculateBill = function(){
  if(bill.value !== '' && people.value !== '' && tipPercent){
    if (+people.value === 0) {
      errMsg.style.display = "block";
      showTip.innerText = `$0.00`;
      showTotal.innerText = `$0.00`;
    } else {
      const billAmount = +bill.value;
      const peopleNo = +people.value;
      const tip = (billAmount * tipPercent) / 100;
      const total = tip + billAmount;
      const totalPerPerson = (total / peopleNo).toFixed(2);
      const tipPerPerson = (tip / peopleNo).toFixed(2);
      showTip.innerText = `$${tipPerPerson}`;
      showTotal.innerText = `$${totalPerPerson}`;
    }
  }
};

//Handles bill input
bill.addEventListener('input', function () {
  changeResetBtnOpacityToActive();
  calculateBill();
}) 

//Handles input to tip percent buttons
for (let btn of selectBtns) {
  btn.addEventListener("click", () => {   
    changeResetBtnOpacityToActive();
    customTip.value = '';
    tipPercent = Number.parseInt(btn.textContent);
    calculateBill();
    });
}

//Handles input for custom tip ammount
customTip.addEventListener("input", () => {
  changeResetBtnOpacityToActive();
  tipPercent = customTip.value;
  calculateBill();
});

//Handles input for number of people
people.addEventListener("input", () => {
  changeResetBtnOpacityToActive();
  calculateBill();
});

//Resets the app to initial state
resetBtn.addEventListener("click", () => {
  bill.value = people.value = customTip.value = "";
  showTip.textContent = showTotal.textContent = `$0.00`;
  resetBtn.style.opacity = "0.3";
  tipPercent = 0;
  errMsg.style.display = "none";
});

