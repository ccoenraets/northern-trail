({
	scriptsLoaded : function(component, event, helper) {

        component.sentimentData = [70, 20, 10];
        
        var data = {
            labels: ["Positive", "Neutral", "Negative"], 
            datasets: [
                {
                    data: component.sentimentData,
                    backgroundColor: [
                        "#89C059",
                        "#00A1E0",
                        "#C25454"
                    ],
                    hoverBackgroundColor: [
                        "#89C059",
                        "#00A1E0",
                        "#C25454"
                    ]                
                }
            ]
        };
        
		var ctx = component.find("chart").getElement();
        component.chart = new Chart(ctx,{
            type: 'doughnut',
            data: data,
			options: {
                responsive: true,
                cutoutPercentage: 60,
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                onClick: function(event) {
                }
            }

        });
		
	},
    
    onEinsteinEvent: function(component, event, helper) {

        console.log("SentimentToday onEinsteinEvent");
        
        var predictions = event.getParam("sentimentPredictions");
        console.log("chart");
        console.log(predictions);
        predictions.probabilities.forEach(function(item) {
            console.log(item.label + ' ' + item.probability);
            if (item.label === "positive") {
                component.sentimentData[0] = component.sentimentData[0] + item.probability * 100;
            } else if (item.label === "neutral") {
                component.sentimentData[1] = component.sentimentData[1] + item.probability * 100;
            } else if (item.label === "negative") {
                component.sentimentData[2] = component.sentimentData[2] + item.probability * 100;
            }
        });
        //component.chart.data.datasets[0].data = component.sentimentData;
        component.chart.update();
    }
    
})