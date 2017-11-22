({
        doInit: function (component) {
                component.set("v.phrase", "What's your return policy? #nto");
                component.set("v.origin", "Twitter");
                component.set("v.user", "ccoenraets");
                component.set("v.userPicURL", "https://pbs.twimg.com/profile_images/899391129757536257/GwsKcNnM_bigger.jpg");
                component.set("v.sentimentPredictions", { probabilities: [{ label: 'neutral', probability: 0.75 }] });
                component.set("v.intentPredictions", { probabilities: [{ label: 'return', probability: 0.92 }] });
        },

        onEinsteinEvent: function (component, event, helper) {

                var sentimentPredictions = event.getParam("sentimentPredictions");

                component.set("v.phrase", event.getParam("phrase"));
                component.set("v.origin", event.getParam("origin"));
                component.set("v.messageURL", event.getParam("messageURL"));
                component.set("v.user", event.getParam("user"));
                component.set("v.userPicURL", event.getParam("userPicURL"));
                component.set("v.intentPredictions", event.getParam("intentPredictions"));
                component.set("v.sentimentPredictions", sentimentPredictions);

                var sentiment = sentimentPredictions.probabilities[0].label;
                var backgroundColor;
                if (sentiment == "positive") {
                        backgroundColor = "#89C059";
                } else if (sentiment == "negative") {
                        backgroundColor = "#C25454";
                } else {
                        backgroundColor = "#00A1E0";
                }
                component.set("v.backgroundColor", backgroundColor);
        }
})