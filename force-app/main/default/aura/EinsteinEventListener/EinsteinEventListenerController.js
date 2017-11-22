({
    onJSLoaded : function(component, event, helper) {
        
        var action = component.get("c.getSessionId");
        action.setCallback(this, function(response) {
            var sessionId = response.getReturnValue();
            var cometd = new window.org.cometd.CometD();
            cometd.configure({
                url: window.location.protocol + '//' + window.location.hostname + '/cometd/41.0/',
                requestHeaders: { Authorization: 'OAuth ' + sessionId},
                appendMessageTypeToURL : false
            });
            
            cometd.handshake($A.getCallback(function(status) {
                console.log(status);
                if (status.successful) {
                    var eventName = component.get("v.eventName");
                    cometd.subscribe('/event/Einstein_Event__e', $A.getCallback(
                        function(platformEvent) {
                            console.log(platformEvent.data.payload.Message__c);
                            console.log(platformEvent.data.payload.Intent_Predictions__c);
                            console.log(platformEvent.data.payload.Sentiment_Predictions__c);
                            console.log(platformEvent.data.payload.Vision_Predictions__c);
                            var appEvent = $A.get("e.c:EinsteinEvent");
                            appEvent.setParams({
                                phrase: platformEvent.data.payload.Phrase__c,
                                origin: platformEvent.data.payload.Origin__c,
                                messageURL: platformEvent.data.payload.Message_URL__c,
                                user: platformEvent.data.payload.User__c,
                                userPicURL: platformEvent.data.payload.User_Pic_URL__c,
                                imageURL: platformEvent.data.payload.Image_URL__c,
                                intentPredictions: JSON.parse(platformEvent.data.payload.Intent_Predictions__c),
                                sentimentPredictions: JSON.parse(platformEvent.data.payload.Sentiment_Predictions__c),
                                visionPredictions: JSON.parse(platformEvent.data.payload.Vision_Predictions__c)
                           });
                            appEvent.fire();
                            console.log("Einstein event fired");
                        }
                    ));
                }
            }));
            
            
        });
        $A.enqueueAction(action);
        
    }
})