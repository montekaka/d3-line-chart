var date_crunch = function(data){
	var datasets = [];
	var incurred_months = [];
	var auth_admits = [];	
	for (var i=0; i<data.length; i++){
		item = data[i];
		incurred_month = item["IncurredMonth"];
		auth_admit = Number(item["FinalAdmit"]);
		key = incurred_months.indexOf(incurred_month);
		if (key < 0){
			incurred_months.push(incurred_month);
			auth_admits.push(auth_admit);
		}
		else{
			auth_admits[key] = auth_admits[key]+auth_admit;
		}
	}
	for (var i =0; i<incurred_months.length; i++){
		datapoint = new Object();
		incurred_month = incurred_months[i];
		datapoint.incurred_month = new Date(incurred_month);
		datapoint.auth_admit = auth_admits[i];
		datasets.push(datapoint);
	}
	datasets.sort(function(a, b){
		return a.incurred_month-b.incurred_month
	});
	
	for (var i =0; i<datasets.length; i++){
		incurred_months[i] = datasets[i].incurred_month;
		auth_admits[i] = datasets[i].auth_admit;
	}

	return datasets;
}
