({
        doInit: function (component) {
                component.set("v.phrase", "What's your return policy? #nto");
                component.set("v.origin", "Twitter");
                component.set("v.user", "@ccoenraets");
                component.set("v.origin", "Twitter");
                component.set("v.userPicURL", "https://pbs.twimg.com/profile_images/899724208141328387/kAToNylD_bigger.jpg");
                component.set("v.imageURL", "https://s3-us-west-2.amazonaws.com/nto-products/products1110/4003100.jpg");
                component.set("v.sentimentPredictions", { probabilities: [{ label: 'neutral', probability: 0.75 }] });
                component.set("v.intentPredictions", { probabilities: [{ label: 'return', probability: 0.92 }] });
                component.set("v.visionPredictions", { probabilities: [{ label: 'Jester Backpack', probability: 0.92 }] });
        },

        onEinsteinEvent: function (component, event, helper) {

                var sentimentPredictions = event.getParam("sentimentPredictions");

                component.set("v.phrase", event.getParam("phrase"));
                component.set("v.origin", event.getParam("origin"));
                component.set("v.messageURL", event.getParam("messageURL"));
                component.set("v.user", event.getParam("user"));
                component.set("v.userPicURL", event.getParam("userPicURL"));
                component.set("v.imageURL", event.getParam("imageURL"));
                component.set("v.intentPredictions", event.getParam("intentPredictions"));
                component.set("v.sentimentPredictions", sentimentPredictions);
                component.set("v.visionPredictions", event.getParam("visionPredictions"));

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