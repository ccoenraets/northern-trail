({
    loadMixItems: function (component, mixId) {
        var action = component.get("c.getMixItems");
        action.setStorable();
        action.setParams({
            "mixId": mixId
        });
        action.setCallback(this, function (response) {
            var result = response.getReturnValue();
            var mixItems = [];
            result.forEach(function(item) {
                var mixItem = {
                    id: item.Id,
                    merchandiseId: item.Merchandise__r.Id,
                    name: item.Merchandise__r.Name,
                    price: item.Merchandise__r.Price__c,
                    category: item.Merchandise__r.Category__c,
                    pictureURL: item.Merchandise__r.Picture_URL__c,
                    qty: item.Qty__c
                };
                mixItems.push(mixItem);
            });
            component.set("v.mixItems", mixItems);
            this.calculateMix(component);
        });
        $A.enqueueAction(action);
    },

    addItem: function (component, mixItem) {
        var action = component.get("c.addMixItem");
        action.setParams({
            "mixId": mixItem.mixId,
            "productId": mixItem.merchandiseId,
            "qty": mixItem.qty
        });
        action.setCallback(this, function (response) {
            var result = response.getReturnValue();
            mixItem.id = result.Id;
            this.calculateMix(component);
        });
        $A.enqueueAction(action);
    },

    updateItem: function (component, mixItem) {
        var action = component.get("c.updateMixItem");
        action.setParams({
            "mixItem": {
                "Id": mixItem.id,
                "Qty__c": mixItem.qty
            }
        });
        action.setCallback(this, function (response) {
            this.calculateMix(component);
        });
        $A.enqueueAction(action);
    },

    removeItem: function (component, mixItem) {
        var action = component.get("c.removeMixItem");
        action.setParams({
            "mixItemId": mixItem.id
        });
        action.setCallback(this, function (response) {
            var result = response.getReturnValue();
            console.log(result);
            var mixItems = component.get("v.mixItems");
            for (var i = 0; i < mixItems.length; i++) {
                if (mixItems[i].id === mixItem.id) {
                    mixItems.splice(i, 1);
                    component.set("v.mixItems", mixItems);
                    this.calculateMix(component);
                    return;
                }
            }
        });
        $A.enqueueAction(action);
    },

    calculateMix: function (component) {
        var mixItems = component.get("v.mixItems");
        var oldTotalMSRP = component.get("v.totalMSRP");
        var totalQty = 0;
        var totalMSRP = 0;
        if (mixItems && Array.isArray(mixItems)) {
            mixItems.forEach(function (mixItem) {
                totalQty = totalQty + mixItem.qty;
                totalMSRP = totalMSRP + (mixItem.qty * mixItem.price);
            });
            component.set("v.totalQty", totalQty);
            component.set("v.totalMSRP", totalMSRP);
            var totalMSRPEl = component.find("totalMSRP");
            if (totalMSRPEl && totalMSRPEl.getElement()) {
                var numAnim = new CountUp(totalMSRPEl.getElement(), oldTotalMSRP, totalMSRP, 0, 0.5);
                numAnim.start();
            }
        }
    },


})