trigger onEinsteinEvent on Einstein_Event__e (after insert) {

    // public class Probability {
    //     public string label;
    //     public Decimal probability;
    // }

    // public class Predictions {
    //     public Probability[] probabilies; 
    // }

    // List<Case> cases = new List<Case>();

        // Case newCase = new Case();
        // newCase.Subject = 'Follow Up with Customer';
        // newCase.Description = 'einsteinEvent.Phrase__c';
        // newCase.Origin = 'Web';
        // insert newCase;


    // for (Einstein_Event__e einsteinEvent : Trigger.New) {

    //     //Predictions sentimentPredictions = (Predictions) JSON.deserialize(einsteinEvent.Sentiment_Predictions__c, Predictions.class);
    //     //Predictions intentPredictions = (Predictions) JSON.deserialize(einsteinEvent.Intent_Predictions__c, Predictions.class);

    //     Case newCase = new Case();
    //     newCase.Subject = 'Follow Up with Customer';
    //     newCase.Description = einsteinEvent.Phrase__c;
    //     newCase.Origin = 'Web';
    //     // newCase.Queue__c = event.Intent__c;
    //     // newCase.Sentiment__c = event.Sentiment__c;
    //     // newCase.Sentiment_Percent__c = event.Sentiment_Probability__c;
    //     cases.add(newCase);

    // }

    // insert cases;

}