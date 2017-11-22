({

    upload: function(component, fileName, base64Data) {
        var action = component.get("c.predictVision"); 
        var modelId = component.get("v.modelId"); 
        action.setParams({
            fileName: fileName,
            content: base64Data, 
            modelId: modelId
        });
        console.log('upload');
        console.log(modelId);
        console.log(base64Data);
        action.setCallback(this, function(a) {
            console.log(a);
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
            console.log(result);
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
                /*
                var myEvent = $A.get("e.c:EinsteinVisionEvent");
                myEvent.setParams({
                    "predictions": result
                });
                myEvent.fire();
                */
            }
        });
        component.set("v.predictions", null);
        component.set("v.rawPredictions", null);
        component.set("v.waiting", true);
        $A.enqueueAction(action); 
    }

})