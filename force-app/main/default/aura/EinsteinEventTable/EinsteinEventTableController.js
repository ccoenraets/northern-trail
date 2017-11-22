({
    doInit: function (component, event, helper) {
        var columns = [
            { label: 'Phrase', fieldName: 'phrase', type: 'text' },
            { label: 'Positive', fieldName: 'positive', type: 'percent' },
            { label: 'Neutral', fieldName: 'neutral', type: 'percent' },
            { label: 'Negative', fieldName: 'negative', type: 'percent' },
            { label: 'Intent', fieldName: 'intent', type: 'text' },
            { label: 'Probability', fieldName: 'intentProbability', type: 'percent' },
        ];
        component.set("v.columns", columns);

        var einsteinEvents = [
            {
                phrase: "What's the return policy on jackets?",
                positive: 0.10,
                neutral: 0.75,
                negative: 0.15,
                intent: "Return",
                intentProbability: 0.84
            },
            {
                phrase: "Best tent I ever owned",
                positive: 0.92,
                neutral: 0.06,
                negative: 0.02,
                intent: "Review",
                intentProbability: 0.71
            },
            {
                phrase: "How long is the warranty on jackets?",
                positive: 0.10,
                neutral: 0.80,
                negative: 0.10,
                intent: "Warranty",
                intentProbability: 0.87
            },
            {
                phrase: "Warmest jacket ever!",
                positive: 0.78,
                neutral: 0.05,
                negative: 0.17,
                intent: "Review",
                intentProbability: 0.73
            },
            {
                phrase: "NTO rocks!",
                positive: 0.94,
                neutral: 0.04,
                negative: 0.02,
                intent: "Review",
                intentProbability: 0.92
            },
            {
                phrase: "Size large is way too small",
                positive: 0.12,
                neutral: 0.20,
                negative: 0.68,
                intent: "Review",
                intentProbability: 0.87
            },
            {
                phrase: "How do I return my jacket?",
                positive: 0.16,
                neutral: 0.71,
                negative: 0.13,
                intent: "Return",
                intentProbability: 0.94
            },
            {
                phrase: "Best service ever!!",
                positive: 0.96,
                neutral: 0.02,
                negative: 0.02,
                intent: "Review",
                intentProbability: 0.77
            },
            {
                phrase: "Where can I find NTO products in Boston?",
                positive: 0.06,
                neutral: 0.88,
                negative: 0.06,
                intent: "Sales",
                intentProbability: 0.89
            },
            {
                phrase: "What's the difference between the XC-70 and the XC-90?",
                positive: 0.13,
                neutral: 0.75,
                negative: 0.12,
                intent: "Sales",
                intentProbability: 0.85
            },
            {
                phrase: "How long is the warranty on jackets?",
                positive: 0.10,
                neutral: 0.80,
                negative: 0.10,
                intent: "Warranty",
                intentProbability: 0.87
            },
            {
                phrase: "How do you replace batteries on XC-70?",
                positive: 0.10,
                neutral: 0.74,
                negative: 0.16,
                intent: "Customer Service",
                intentProbability: 0.92
            },
            {
                phrase: "What's the return policy on jackets?",
                positive: 0.10,
                neutral: 0.75,
                negative: 0.15,
                intent: "Return",
                intentProbability: 0.84
            },
            {
                phrase: "Best tent I ever owned",
                positive: 0.92,
                neutral: 0.06,
                negative: 0.02,
                intent: "Review",
                intentProbability: 0.71
            },
            {
                phrase: "How long is the warranty on jackets?",
                positive: 0.10,
                neutral: 0.80,
                negative: 0.10,
                intent: "Warranty",
                intentProbability: 0.87
            },
            {
                phrase: "Warmest jacket ever!",
                positive: 0.78,
                neutral: 0.05,
                negative: 0.17,
                intent: "Review",
                intentProbability: 0.73
            },
            {
                phrase: "NTO rocks!",
                positive: 0.94,
                neutral: 0.04,
                negative: 0.02,
                intent: "Review",
                intentProbability: 0.92
            },
            {
                phrase: "Size large is way too small",
                positive: 0.12,
                neutral: 0.20,
                negative: 0.68,
                intent: "Review",
                intentProbability: 0.87
            },
            {
                phrase: "How do I return my jacket?",
                positive: 0.16,
                neutral: 0.71,
                negative: 0.13,
                intent: "Return",
                intentProbability: 0.94
            },
            {
                phrase: "What's the return policy on jackets?",
                positive: 0.10,
                neutral: 0.75,
                negative: 0.15,
                intent: "Return",
                intentProbability: 0.84
            },

        ];
        component.set("v.einsteinEvents", einsteinEvents);
    },

    onEinsteinEvent: function (component, event, helper) {

        console.log("EinsteinEventTable onEinsteinEvent");

        var phrase = event.getParam("phrase");
        var sentimentPredictions = event.getParam("sentimentPredictions");
        var intentPredictions = event.getParam("intentPredictions");
        
        var item = { phrase: phrase };

        sentimentPredictions.probabilities.forEach(function (element) {
            if (element.label === "positive") {
                item.positive = element.probability * 100;
            } else if (element.label === "neutral") {
                item.neutral = element.probability * 100;
            } else if (element.label === "negative") {
                item.negative = element.probability * 100;
            }
        });

        item.intent = intentPredictions.probabilities[0].label;
        item.intentProbability = intentPredictions.probabilities[0].probability * 100;

        var einsteinEvents = component.get("v.einsteinEvents");
        einsteinEvents.pop();
        einsteinEvents.unshift(item);
        component.set("v.einsteinEvents", einsteinEvents);
    }
})
