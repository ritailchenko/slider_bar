
var annualPercent;
var profitDiv = document.querySelector(".profit");
var monthlyPay = document.querySelector(".monthlyPayment");
var rate = 0.125;
var percentage = document.querySelector(".percent");
var prof;
//SROK HRANENIA ////////////////////////
var rangeSlider = document.getElementById("rs-range-line");////line
var rangeBullet = document.getElementById("rs-bullet");//the amount on top
//DEPOSIT AMOUNT ////////////////////////
var rangeSliderDep = document.getElementById("rs-range-line-deposit");
var rangeBulletDep = document.getElementById("rs-bullet-deposit");//the amount on top
/////// REPLENISHMENT AMOUNT ////////////////////////
var rangeSliderRep = document.getElementById("rs-range-line-rep");
var rangeBulletRep = document.getElementById("rs-bullet-rep");//the amount on top

function revenue(){
  profitAmount = parseFloat(Math.round(rangeSlider.value / 12 * rate * (+ rangeSliderDep.value  + + rangeSliderRep.value)));
  profitDiv.textContent = toLocalNumber(profitAmount, '.', 3)  + ' руб.';
};

function monthlyPayments() {
  monthlyPay.textContent = toLocalNumber((Math.ceil(profitAmount/ rangeSlider.value)), '.',3) + ' руб.';
}

function toLocalNumber(number,divider,len){
	var sup = [];
	let word = number.toString().split('').reverse().join('');

  if(len){
		for(i=0; i<word.length; i+=len){
			let piece=[];

			for(j=0; j<len; j++){
				piece.unshift(word[i+j] || '')
			}

			sup.unshift(piece.join(''))

		}
		return sup.join(divider)
	}else{
		return word
	}
}

function setProgram(month, annualPercent, deposit, add, btn){
  rangeSlider.value = month;
  showSliderValue();

  percentage.textContent = annualPercent + "%";
  rangeSliderDep.value = deposit;
  showSliderValueDeposit();

  rangeSliderRep.value = add;
  showSliderValueReplenishment();

  monthlyPayments();

  ['sb','pens','udobn-plus','udobn'].forEach(i => document.getElementById(i).className = '');
	document.getElementById(btn).className = 'focus';
};

document.getElementById('sb').addEventListener("click", ()=>setProgram(6, 12.5, 420000, 20000,'sb'));
document.getElementById('pens').addEventListener("click", ()=>setProgram(12,12,250000, 20000, 'pens'));
document.getElementById('udobn-plus').addEventListener("click", ()=>setProgram(12,13.5, 250000, 20000, 'udobn-plus'));
document.getElementById('udobn').addEventListener("click", ()=>setProgram(12,10,250000,20000, 'udobn'));

//SROK HRANENIA ////////////////////////
rangeSlider.addEventListener("input", showSliderValue, false);

function showSliderValue() {

  rangeBullet.innerHTML = rangeSlider.value;
  
  // console.log(rangeSlider.value)

  var bulletPosition = (rangeSlider.value /rangeSlider.max);
 
  rangeBullet.style.left = (bulletPosition * 578) + "px";
  revenue();

  monthlyPayments(profitAmount, rangeSlider.value)
  
}
//DEPOSIT AMOUNT ////////////////////////
rangeSliderDep.addEventListener("input", showSliderValueDeposit, false);

function showSliderValueDeposit() {
  rangeBulletDep.innerHTML = toLocalNumber(rangeSliderDep.value, '.', 3);

  var bulletPositionDep = (rangeSliderDep.value /rangeSliderDep.max);
 
  rangeBulletDep.style.left = (bulletPositionDep * 578) + "px";
  revenue();

  monthlyPayments(profitAmount,rangeSlider.value);
}
/////// REPLENISHMENT AMOUNT ////////////////////////
rangeSliderRep.addEventListener("input", showSliderValueReplenishment, false);

function showSliderValueReplenishment() {
  rangeBulletRep.innerHTML = toLocalNumber(rangeSliderRep.value, '.', 3);


  var bulletPositionRep = (rangeSliderRep.value /rangeSliderRep.max);

  rangeBulletRep.style.left = (bulletPositionRep * 578) + "px";
  revenue();

  monthlyPayments(profitAmount,rangeSlider.value);
}

















