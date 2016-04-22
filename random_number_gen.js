
var random_generate = function(from,to,n){
	var nums =[], ranNums = [], resultNums = [];
	for(var i=from;i<=to;i++){
		nums.push(i);
	}
	var i = nums.length, j = 0;
	while(i--){
		j = Math.floor(Math.random()*(i+1));
		ranNums.push(nums[j]);
		nums.splice(j,1);
	}
	for (var i=0;i<n;i++){
		resultNums.push(ranNums[i]);
	}
	return resultNums;
}


console.log(random_generate(1,100,10));
