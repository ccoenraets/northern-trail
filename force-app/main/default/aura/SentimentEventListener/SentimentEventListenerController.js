({
    onJSLoaded : function(component, event, helper) {
        
        var action = component.get("c.getSessionId");
        action.setCallback(this, function(response) {
            var sessionId = response.getReturnValue();
            var cometd = new window.org.cometd.CometD();
            cometd.configure({
                url: window.location.protocol + '//' + window.location.hostname + '/cometd/39.0/',
                requestHeaders: { Authorization: 'OAuth ' + sessionId},
                appendMessageTypeToURL : false
            });
            
            cometd.handshake($A.getCallback(function(status) {
                console.log(status);
                if (status.successful) {
                    var eventName = component.get("v.eventName");
                    console.log('*** ' + eventName);
                    cometd.subscribe('/event/Language_Event__e', $A.getCallback(
                        function(platformEvent) {
                            // console.log(platformEvent.data.payload.Phrase__c);
                            // console.log(platformEvent.data.payload.Label__c);
                            // var appEvent = $A.get("e.c:SentimentEvent");
                            // appEvent.setParams({
                            //     label: platformEvent.data.payload.Label__c,
                            //     phrase: platformEvent.data.payload.Phrase__c,
                            //     origin: platformEvent.data.payload.Origin__c
                            // });
                            // appEvent.fire();
                        }
                    ));
                }
            }));
            
            
        });
        $A.enqueueAction(action);
        
    }
})