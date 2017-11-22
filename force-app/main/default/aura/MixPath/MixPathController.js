({
    onStepChange: function (component, event) {
        var mix = component.get("v.record");
        if (mix) {
            mix.Status__c = event.getParam("step");
            component.find("mixRecord").saveRecord($A.getCallback(function (saveResult) {
                //
            }));
        }
    },

    onRecordUpdated: function (component, event) {
        var changeType = event.getParams().changeType;
        if (changeType === "CHANGED") {
            var service = component.find("mixRecord");
            service.reloadRecord();
        }
    },

    messageHandler: function (component, event) {
        var mix = component.get("v.record");
        var payload = event.getParam("message");
        if (payload.Mix_Id__c === mix.Id) {
            mix.Status__c = "Approved by Manufacturing";
            component.set("v.record", mix);
            // No need to save the record because there is also an Apex listener for the Mix_Approved__e event
        }
    }

})