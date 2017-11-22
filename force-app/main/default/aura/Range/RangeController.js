({
    handleMinChange: function(component, event, helper) {
        var minValue = event.getParam("value");
        component.set("v.min", minValue);
        var rangeChangeEvent = component.getEvent("onchange");
        rangeChangeEvent.setParams({
            "minValue": minValue,
            "maxValue": component.get("v.maxValue")
        });
        rangeChangeEvent.fire();
    },

    handleMaxChange: function(component, event, helper) {
        var maxValue = event.getParam("value");
        component.set("v.max", maxValue);
        var rangeChangeEvent = component.getEvent("onchange");
        rangeChangeEvent.setParams({
            "minValue": component.get("v.minValue"),
            "maxValue": maxValue
        });
        rangeChangeEvent.fire();
    },
    
})