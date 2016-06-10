var age = prompt("Введите ваш возраст: ");
var square = Math.sqrt(age)

if(age < 0) {
	alert("Не ври!");
} else if(age == 21) {
	alert("Тебе 21 год. Прийми поздравления!");
} else if(age % 2 == 1) {
	alert("Твой возраст является нечетным числом.");
} else if (age == 27) {
	alert("Ты обезьяна!!!");
} else if (age == 29) {
	alert("Ты супер крутой чувак!!!");
} else if (Number.isInteger(square)) {
	alert("Твой возраст perfect square!!");
}	else {
	alert("Тебе " + age + " лет.")
} 