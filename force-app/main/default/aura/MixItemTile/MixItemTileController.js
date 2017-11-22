({
	titleClickHandler: function(component) {
		var navEvt = $A.get("e.force:navigateToSObject");
	    navEvt.setParams({
		      "recordId": component.get("v.mixItem").merchandiseId,
		      "slideDevName": "detail"
		    });
	    navEvt.fire();
	},

	deleteHandler : function(component) {
        var deleteEvent = component.getEvent("onDelete");
        deleteEvent.setParam("mixItem", component.get("v.mixItem"));
        deleteEvent.fire();
	},

	qtyChangeHandler: function(component, event) {
		var qty = parseInt(event.getSource().get('v.value'), 10);
		var mixItem = component.get("v.mixItem");
		if (qty !== mixItem.qty) {
			mixItem.qty = parseInt(qty, 10);
	        var changeEvent = component.getEvent("onChange");
	        changeEvent.setParam("mixItem", mixItem);
	        changeEvent.fire();
		}
	}

})