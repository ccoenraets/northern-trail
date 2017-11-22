({
    predict: function(component) {
        var action = component.get("c.predictIntent"); 
        var modelId = component.get("v.modelId"); 
        var phrase = component.get("v.phrase"); 
        action.setParams({
            modelId: modelId,
            content: phrase
        });
        action.setCallback(this, function(a) {
            component.set("v.waiting", false);
            var state = a.getState();
            console.log(state);
            if (state === 'ERROR') {
                console.log(a.getError());
                alert("An error has occurred");
                return;
            }
            var result = a.getReturnValue();
            var rawPredictions=JSON.stringify(result, null, 4);
            var predictions = [];
            if (result && result.length) {
                for (var i=0; i<result.length; i++) {
                    predictions.push({
                        label: result[i].label,
                        formattedProbability: '' + Math.round(result[i].probability * 100) + '%'
                    });
                }
	            component.set("v.predictions", predictions);
	            component.set("v.rawPredictions", rawPredictions);
            }
        });
        component.set("v.predictions", null);
        component.set("v.rawPredictions", null);
        component.set("v.waiting", true);
        $A.enqueueAction(action); 
    }

})