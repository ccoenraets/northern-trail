({
    doInit : function(component, event, helper) {
        var mixId = component.get("v.recordId");
        helper.loadMixItems(component, mixId);
        
        var columns = [
            {label: 'Name', fieldName: 'name', type: 'text'},
            {label: 'Category', fieldName: 'category', type: 'text'},
            {label: 'Price', fieldName: 'price', type: 'currency'},
            {label: 'Qty', fieldName: 'qty', type: 'number'},
        ];
        component.set("v.columns", columns);
        
    },

    dropHandler : function(component, event, helper) {
        event.preventDefault();
        var cmpTarget= component.find("dropZone");
        $A.util.removeClass(cmpTarget, 'active');
        var mixItems = component.get("v.mixItems");
        var merchandise = JSON.parse(event.dataTransfer.getData("merchandise"));
        var mixItem = {
            mixId: component.get("v.recordId"),
            merchandiseId: merchandise.Id,
            qty: 10,
            name: merchandise.Name,
            price: merchandise.Price__c,
            category: merchandise.Category__c,
            pictureURL: merchandise.Picture_URL__c
        };
        mixItems.push(mixItem);
        helper.addItem(component, mixItem);
        component.set("v.mixItems", mixItems);
    },

    dragOverHandler : function(component, event) {
        event.preventDefault();
        var cmpTarget= component.find("dropZone");
        $A.util.addClass(cmpTarget, 'active');
    },

    dragLeaveHandler : function(component, event){
        event.preventDefault();
        var cmpTarget= component.find("dropZone");
        $A.util.removeClass(cmpTarget, 'active');
    },

    mixItemDeleteHandler : function(component, event, helper) {
        var mixItem = event.getParam("mixItem");
        helper.removeItem(component, mixItem);
    },

    mixItemChangeHandler : function(component, event, helper) {
        var mixItem = event.getParam("mixItem");
        helper.updateItem(component, mixItem);
    },

    getSelectedName: function (cmp, event) {
        /*
        var selectedRows = event.getParam('selectedRows');
        // Display that fieldName of the selected rows
        for (var i = 0; i < selectedRows.length; i++){
            console.log(selectedRows[i]);
        }
        */
    },

    toggleListMode: function (component, event, helper) {       
        var iconName = event.getSource().get("v.iconName");
        component.set('v.isTileView', iconName === 'utility:apps');
    }

})