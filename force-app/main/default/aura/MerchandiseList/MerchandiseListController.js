({
    doInit: function(component, event, helper) {
        var filterObject = {
            searchKey: '',
            category: ''
        };
        component.set("v.filterObject", filterObject);
        helper.loadMerchandise(component);
    },

    onPreviousPage: function(component, event, helper) {
		var page = component.get("v.page") || 1;
        page = page - 1;
        helper.loadMerchandise(component, page);
	},

	onNextPage: function(component, event, helper) {
		var page = component.get("v.page") || 1;
        page = page + 1;
        helper.loadMerchandise(component, page);
	},

    filterChangeHandler: function(component, event, helper) {
        var filterObject = component.get("v.filterObject");
        if (event.getParam("searchKey") !== undefined) {
	        filterObject.searchKey = event.getParam("searchKey");
        }
        if (event.getParam("category") !== undefined) {
	        filterObject.category = event.getParam("category");
        }
        if (event.getParam("minPrice") !== undefined) {
	        filterObject.minPrice = event.getParam("minPrice");;
	        filterObject.maxPrice = event.getParam("maxPrice");;
        }
        helper.loadMerchandise(component);
    }

})