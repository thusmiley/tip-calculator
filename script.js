const bill = document.getElementById("bill");
const customTip = document.getElementById("custom");
const people = document.getElementById("people");
const errMsg = document.getElementById("err-msg");
const showTip = document.getElementById("tip");
const showTotal = document.getElementById("total");
const resetBtn = document.getElementById("reset");
const selectBtns = document.getElementsByClassName("select-tip");
let tipPercent = 0;

//Sets reset button to default state
let setResetBtnDefault = function(){
  resetBtn.classList.remove('active');
};

//Sets reset button to active state
let setResetBtnActive = function(){
  resetBtn.classList.add('active');
};

//Sets tip buttons to default state
let setTipButtonsDefault = function(){
  for (let btn of selectBtns){
    btn.classList.remove('active');
  }
};

//Sets tip button to active state
let setTipButtonActive = function(btn){
  btn.classList.add('active');
};

//Sets customTip field to default
let setCustomTipDefault = function(){
  customTip.value = '';
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
  //Handles button colors
  setResetBtnActive();

  //Handles input and calculates the bill
  calculateBill();
}); 

//Handles input to tip percent buttons
for (let btn of selectBtns) {
  btn.addEventListener('click', () => {   
    //Handles button colors
    setTipButtonsDefault();
    setTipButtonActive(btn)
    setResetBtnActive();

    //Handles input and calculates the bill
    setCustomTipDefault();
    tipPercent = Number.parseInt(btn.textContent);
    calculateBill();
    });
};

//Handles input for custom tip ammount
customTip.addEventListener("input", () => {
  //Handles button colors
  setResetBtnActive();
  setTipButtonsDefault();

  //Handles input and calculates the bill
  tipPercent = customTip.value;
  calculateBill();
});

//Handles input for number of people
people.addEventListener("input", () => {
  //Handles button colors
  setResetBtnActive();
  
  //Handles input and calculates the bill
  calculateBill();
});

//Resets the app to initial state
resetBtn.addEventListener("click", () => {
  //Handles button colors
  setTipButtonsDefault();
  setResetBtnDefault();

  //Resets app
  bill.value = people.value = customTip.value = "";
  showTip.textContent = showTotal.textContent = `$0.00`;
  tipPercent = 0;
  errMsg.style.display = "none";
});

