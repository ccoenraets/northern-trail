({
	scriptsLoaded : function(component, event, helper) {

        component.sentimentData = [10, 3, .1];
        
        var data = {
            labels: ["Positive", "Neutral", "Negative"], 
            datasets: [
                {
                    data: component.sentimentData,
                    label: '',
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
            type: 'bar',
            data: data,
			options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                        }
                    }]
                },
                onClick: function(event) {
                }
            }

        });
		
	},
    
    onSentimentEvent: function(component, event, helper) {
        var label = event.getParam("label");
		if (label === "positive") {
			component.sentimentData[0] = component.sentimentData[0] + 1;
        } else if (label === "neutral") {
			component.sentimentData[1] = component.sentimentData[1] + 1;
        } else if (label === "negative") {
			component.sentimentData[2] = component.sentimentData[2] + 1;
        }
        component.chart.data.datasets[0].data = component.sentimentData;
        component.chart.update();
    }
    
})