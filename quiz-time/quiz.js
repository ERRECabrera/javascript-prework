var user = {};
var responser = [];

function whatsName(){
	exprereg_ctr = /^[a-zA-Z]+/;
	name = prompt("What is your name?");
	if (exprereg_ctr.test(name)) {
		user.name = name;
	} else {
		alert("Write something!");
		return whatsName();
	}	
}

function question(number){
	switch (number){
		case 1:
			var firstquestion = prompt("Your name is " + user.name + "? (Yes or No)");
			exprereg_yes = /y+/;
			exprereg_not = /n+/;
			firstquestion = firstquestion.toLowerCase()
			if (exprereg_yes.test(firstquestion)){
				responser.push(true);
			} else if (exprereg_not.test(firstquestion)){
				responser.push(false);
				return whatsName();
			} else {
				alert("Please answer either Yes or No");
				return question(number);
			}
		break;
		case 2:
			var secondquestion = prompt("What political party rules Spain: PSOE, CIU or PP?")
			switch (secondquestion.toLowerCase()){
				case "psoe":
					secondquestion = false;
				break;
				case "ciu":
					secondquestion = false;
				break;
				case "pp":
					secondquestion = true;
				break;
				default:
					alert("Please answer: PSOE, CIU or PP");
					return question(number);
			}
		responser.push(secondquestion);
		break;
		case 3:
			var thirdquestion = prompt("What day is today?");
			var week = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
			var day = new Date();
			var today = week[day.getDay()];
			thirdquestion = thirdquestion.toLowerCase();
			var array_thirdquestion = thirdquestion.split(" ");
			if (array_thirdquestion.indexOf(today) >= 0){
				responser.push(true);
			} else {
				var check = 0; 
				for (var index = 0; index<week.length; index++){
					var otherDay = week[index];
					if (array_thirdquestion.indexOf(otherDay) >= 0){
						check += 1;
					}
				}
				if (check > 0){
					responser.push(false);		
				} else {
					alert("Hint!: Today is a weekday.");
					question(number);					
				}
			}
		break;
		case 4:
			var fourthquestion = prompt("2 + 2 are?");
			exprereg_num = /\d+/;
			if (exprereg_num.test(fourthquestion)){
				fourthquestion = parseInt(fourthquestion);
				if (fourthquestion === 4) {
					responser.push(true);
				} else {
					responser.push(false);
				}
			} else {
				fourthquestion = fourthquestion.toLowerCase();
				exprereg_ctr = /^[otfsent]/;
				if (fourthquestion === "four"){
					responser.push(true);
				} else if (exprereg_ctr.test(fourthquestion)){
					responser.push(false);
				} else {
					alert("Don't be fool. Answer the question!");
					return question(number);
				}
			}
		break;
		case undefined:
			alert("Error!: Question's number is not defined!")
		break;
		default:
			exprereg = /\d+/;
			if ((exprereg.test(number)) && number >=5){
				alert("Error!: No question inside! Test with a lower number than " + number);
			} else {
				alert("Error!: Argument not valid! You need a number.")
			}
		break;
	}

}

function evaluate(responsesArray){
	var correct = 0;
	var incorrect = 0;
	for (i=0; i<responser.length; i++){
		if (responser[i] === true){
			++correct;
		} else {
			++incorrect;
		}
	}
	user.correct = correct;
	user.incorrect = incorrect;
}

whatsName();
question(1);
question(2);
question(3);
question(4);
evaluate(responser);
console.log(user);