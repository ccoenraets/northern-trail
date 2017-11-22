({
	onEinsteinEvent : function(component, event, helper) {

        var sentimentPredictions = event.getParam("sentimentPredictions");

        component.set("v.phrase", event.getParam("phrase"));
        component.set("v.intentPredictions", event.getParam("intentPredictions"));
        component.set("v.sentimentPredictions", sentimentPredictions);

        var sentiment = sentimentPredictions.probabilities[0].label;
        var backgroundColor;
        if (sentiment == "positive") {
	        backgroundColor = "#89C059";
        } else if (sentiment == "negative") {
	        backgroundColor = "#C25454";
        } else {
	        backgroundColor = "#00A1E0";
        }
        component.set("v.backgroundColor", backgroundColor);
	}
})