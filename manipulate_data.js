d3.csv("data.csv", function(data) {
	d3.csv("dataMM.csv", function(mm_data){
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
	console.log(datasets[12]);

	x.domain(d3.extent(datasets, function(d) { return d.incurred_month; }));
	y.domain(d3.extent(datasets, function(d) { return d.auth_admit; }));

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Price ($)");

  svg.append("path")
      .datum(datasets)
      .attr("class", "line")
      .attr("d", line);			
	});
});
