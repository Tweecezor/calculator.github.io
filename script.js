
var numbers = document.querySelectorAll('.number');
var operations = document.querySelectorAll('.operation');
console.log(operations);
var decimalBtn = document.getElementById('idDecimal');
var acBtn = document.getElementById('ac');
var znakBtn = document.getElementById('idZnak');
var percentBtn = document.getElementById('idPercent');
var display = document.getElementById('res');
var currenNumber = 0;
var newNumber = false;
var currentOperation = '';
var orange = document.querySelectorAll('.orange');
console.log(orange);
var activeOper = false;

for(var i = 0; i < orange.length; i++){
    var active = orange[i];
    active.addEventListener('click' , function(e){
        activeOper = true;
        console.log('haha');
        console.log(e.target.textContent);
        activeOp(e.target.textContent);
	})
}

function activeOp(oper){
    if(oper === 'X'){
        document.getElementById('idUmnozh').classList.add('active');
        document.getElementById('idMinus').classList.remove('active');
        document.getElementById('idPlus').classList.remove('active');
        document.getElementById('idDelit').classList.remove('active');
    } else if(oper === '/'){
        document.getElementById('idUmnozh').classList.remove('active');
        document.getElementById('idMinus').classList.remove('active');
        document.getElementById('idPlus').classList.remove('active');
        document.getElementById('idDelit').classList.add('active');
    } else if(oper === '+'){
        document.getElementById('idUmnozh').classList.remove('active');
        document.getElementById('idMinus').classList.remove('active');
        document.getElementById('idPlus').classList.add('active');
        document.getElementById('idDelit').classList.remove('active');
    } else if(oper === '-'){
        document.getElementById('idUmnozh').classList.remove('active');
        document.getElementById('idMinus').classList.add('active');
        document.getElementById('idPlus').classList.remove('active');
        document.getElementById('idDelit').classList.remove('active');
    } else if(oper === '='){
        document.getElementById('idUmnozh').classList.remove('active');
        document.getElementById('idMinus').classList.remove('active');
        document.getElementById('idPlus').classList.remove('active');
        document.getElementById('idDelit').classList.remove('active');
    }
}

for(var i=0; i<numbers.length; i++){
	var number = numbers[i];
	number.addEventListener('click' , function(e){
		console.log(e.target.textContent);
		pressNumber(e.target.textContent);
	})
}

for(var i=0; i<operations.length; i++){
	var operation = operations[i];
	operation.addEventListener('click' , function(e){
		console.log(e.target.textContent);
		pressOperations(e.target.textContent);
	})
}

acBtn.addEventListener('click',function(e){
	clear(e.srcElement.id);
})

decimalBtn.addEventListener('click', function(e){
	pressDecimal(e.srcElement.id);
})

znakBtn.addEventListener('click', pressZnak);
percentBtn.addEventListener('click', pressPercent);

function pressNumber(number){
    if(display.value === 'Ошибка'){
        clear();
    }
    var displayLength = 0;
    displayLength = display.value;
        if(newNumber){
            display.value = number;
            newNumber = false;
        } else{
            if(displayLength.length === 8 ){
                return;
            } else{
                if(display.value==="0"){
                    display.value = number;
                } else{
                    display.value += number;
                };
            }
        };
        changeSize();
        console.log('клик по цифре '+ number)
    // }
};

function pressOperations(oper){
	var localNumber = display.value;
	if(newNumber && currentOperation !=='='){
		display.value = currenNumber;
	} else{
		newNumber = true;
		if(currentOperation === '+'){
			currenNumber += parseFloat(localNumber);
		} else if( currentOperation ==='-'){
			currenNumber -= parseFloat(localNumber);
		} else if( currentOperation ==='X'){
			currenNumber *= parseFloat(localNumber);
		} else if( currentOperation ==='/'){
            if(localNumber === '0'){
                document.getElementById('res').style.fontSize = '57px';
                document.getElementById('res').style.color = 'white';
                display.value = 'Ошибка';
                newNumber = false;
                currenNumber = 0;
                return;
            } else 
            currenNumber /= parseFloat(localNumber);
            
		} else {
			currenNumber = parseFloat(localNumber);
		};
        fixedNumber();
        currentOperation = oper;
        changeSize();
	};
	console.log('клик по операции ' + oper);
}

function clear(id){
	display.value = 0;
	newNumber = false;
	currenNumber = 0;
    console.log('клик по кнопке ' + id);
    currentOperation = '';
    document.getElementById('res').style.fontSize = '69px';
}

function pressDecimal(symbol){
	var localDecimal = display.value;
	if(newNumber){
		localDecimal = '.0';
		newNumber = false;
	} else {
		if(localDecimal.indexOf('.') === -1){
			localDecimal += '.';
		};
	};
    display.value = localDecimal;
    changeSize();
	console.log('клик по кнопке '+ symbol)
}

function pressZnak(){
	var currentNumb = parseFloat(display.value);
	currentNumb
	if(currentNumb > 0 ){
		currentNumb -= currentNumb * 2;
	} else if(currentNumb < 0 ){
		currentNumb += currentNumb * -2;
	}
	display.value = currentNumb;
}

function pressPercent(){
	var currentNumb = parseFloat(display.value);
	currentNumb /= 100;
    display.value = currentNumb; 
    changeSize();
}
function changeSize(){
    var displayLength = display.value;
    if(displayLength.length < 5){
        document.getElementById('res').style.fontSize = '69px';
    };
    if(displayLength.length > 5){
        document.getElementById('res').style.fontSize = '48px';
    } 
     if(displayLength.length > 8){
        document.getElementById('res').style.fontSize = '38px';
    }
    if(displayLength.length > 10){
        document.getElementById('res').style.fontSize = '28px';
    }
    if(displayLength.length > 12){
        document.getElementById('res').style.fontSize = '24px';
    }
    if(displayLength.length > 15){
        document.getElementById('res').style.fontSize = '20px';
    }
}
function fixedNumber(){
    var localValue = 0;
    if ( currenNumber % 1 == 0) {
        display.value = currenNumber;
    } else{
    var fixedCurrenNumber = 0;
    var decimalCount = f(currenNumber);
    // alert(decimalCount);
    if(decimalCount > 15){
        fixedCurrenNumber = currenNumber.toFixed(1);
        display.value = fixedCurrenNumber;
    } else if(decimalCount > 6){
        fixedCurrenNumber = currenNumber.toFixed(6);
        display.value = fixedCurrenNumber;
    } else
        display.value = currenNumber;
    };
    // var newValue = 0;
    // if(display.value > 10){
    //      localValue = display.value;
    //      newValue = localValue.toFixed(0);
    //      display.value = newValue;
    // } else if(display.value > 9){
    //     localValue = display.value;
    //     newValue = localValue.toFixed(1);
    //      display.value = newValue;
    // }
}
const f = x => ( (x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0) );

