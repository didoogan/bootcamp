function printReverse(arr) {
	var result = [];

	arr.forEach(function(item, i) {
		console.log(i);
		result[arr.length - i -1] = item;
	});
	// for(var i=0; i < arr.length; i++) {
	// 	result[i] = arr[arr.length - 1 - i];
	// }
	return result;
}

arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr2 = ["a", "b", "c", "d"]
// console.log(printReverse(arr));
result = printReverse(arr2);
console.log(result);


function isUniform(arr) {
	var pattern = arr[0];
	arr.forEach(function(item) {
		if (item != pattern) {
			return false; 
		}
	});
	// for(var i=1; i < arr.length; i++) {
	// 	if (arr[i] !== pattern) {
	// 		return false;
	// 	}
	// }
	return true;
}

// arr[1,1,1];
// arr2[1,1,1,2,1,1,1];
// result = isUniform(arr2);
// console.log(result);

function max(arr) {
	var max = arr[0];
	for(var i = 1; i < arr.length; i++) {
		if(arr[i] > max) {
			max = arr[i];
		}
	}
	return max;
}

function sumArray(arr) {
	var result = 0;
	// for(var i = 0; i < arr.length; i++) {
	// 	result += arr[i];
	// }
	arr.forEach(function(item) {
		result += item;
	})
	return result;
}