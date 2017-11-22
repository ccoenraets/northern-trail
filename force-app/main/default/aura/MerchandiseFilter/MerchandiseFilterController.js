({

	searchKeyChangeHandler : function(component, event) {
        var merchandiseFilterChangeEvent = $A.get("e.c:MerchandiseFilterChange");
        merchandiseFilterChangeEvent.setParams({
            "searchKey": event.getParam("value")
        });
        merchandiseFilterChangeEvent.fire();
	},

    categoryChangeHandler : function(component, event) {
        var merchandiseFilterChangeEvent = $A.get("e.c:MerchandiseFilterChange");
        merchandiseFilterChangeEvent.setParams({
            "category": event.getParam("value")
        });
        merchandiseFilterChangeEvent.fire();
    },
    
    rangeChangeHandler: function(component, event) {
        var merchandiseFilterChangeEvent = $A.get("e.c:MerchandiseFilterChange");
        merchandiseFilterChangeEvent.setParams({
            "minPrice": event.getParam("minValue"),
            "maxPrice": event.getParam("maxValue"),
        });
        merchandiseFilterChangeEvent.fire();
    }

})