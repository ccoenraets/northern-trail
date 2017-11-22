global with sharing class EinsteinController {
    
    // Modify with value of the email account you used to generate your Einstein key
    private static String einsteinAccountEmail = 'EMAIL_ADDRESS_USED_FOR_EINSTEIN_ACCOUNT';

    public static String API_URL = 'https://api.einstein.ai/v2';
    public static String OAUTH_URL = API_URL + '/oauth2/token';
    public static String VISION_URL = API_URL + '/vision/predict';
    public static String SENTIMENT_URL = API_URL + '/language/sentiment';
    public static String INTENT_URL = API_URL + '/language/intent';
    
    public class Prediction {
        @AuraEnabled
        public String label {get;set;}
        @AuraEnabled
        public Double probability {get;set;}
    }
    
    private static String getAccessToken() {
        ContentVersion base64Content;
        try {
            base64Content = [SELECT Title, VersionData FROM ContentVersion where Title='einstein_platform' LIMIT 1];
        } catch (Exception e) {
            throw new AuraHandledException('Cannot create Einstein Vision token: einstein_platform.pem file not found');    
        }
        String keyContents = base64Content.VersionData.tostring();
        keyContents = keyContents.replace('-----BEGIN RSA PRIVATE KEY-----', '');
        keyContents = keyContents.replace('-----END RSA PRIVATE KEY-----', '');
        keyContents = keyContents.replace('\n', '');
        
        // Get a new token
        JWT jwt = new JWT('RS256');
        jwt.pkcs8 = keyContents; // Comment this if you are using jwt.cert
        jwt.iss = 'developer.force.com';
        jwt.sub = einsteinAccountEmail;
        jwt.aud = OAUTH_URL;
        jwt.exp = '3600';
        String access_token;
        if (!Test.isRunningTest()) {
            access_token = JWTBearerFlow.getAccessToken(OAUTH_URL, jwt);
        }
        System.debug(access_token);
        return access_token;    
    }
    
    @AuraEnabled
    public static List<Prediction> predictVision(String fileName, String modelId, String content) {
        return EinsteinController.predict(VISION_URL, modelId, 'sampleBase64Content',content);
    }
    
    @AuraEnabled
    public static List<Prediction> predictSentiment(String modelId, String content) {
        return EinsteinController.predict(SENTIMENT_URL, modelId, 'document', content);
    }
    
    @AuraEnabled
    public static List<Prediction> predictIntent(String modelId, String content) {
        return predict(INTENT_URL, modelId, 'document', content);
    }
    
    private static List<Prediction> predict(String endpoint, String modelId, String contentKey, String content) {

        String access_token;
        try {
            access_token = getAccessToken();
        } catch (Exception e) {
            throw new AuraHandledException('Cannot create Einstein token. Did you upload the einstein_platform.pem file and specify the right value for "einsteinAccountEmail"?');			
        }
        
        string contentType = HttpFormBuilder.GetContentType();
        //  Compose the form
        string form64 = '';
        form64 += HttpFormBuilder.WriteBoundary();
        form64 += HttpFormBuilder.WriteBodyParameter('modelId', EncodingUtil.urlEncode(modelId, 'UTF-8'));
        form64 += HttpFormBuilder.WriteBoundary();
        form64 += HttpFormBuilder.WriteBodyParameter(contentKey, content);
        form64 += HttpFormBuilder.WriteBoundary(HttpFormBuilder.EndingType.CrLf);
        
        blob formBlob = EncodingUtil.base64Decode(form64);
        string contentLength = string.valueOf(formBlob.size());
        
        //  Compose the http request
        HttpRequest httpRequest = new HttpRequest();
        httpRequest.setBodyAsBlob(formBlob);
        httpRequest.setHeader('Connection', 'keep-alive');
        httpRequest.setHeader('Content-Length', contentLength);
        httpRequest.setHeader('Content-Type', contentType);
        httpRequest.setMethod('POST');
        httpRequest.setTimeout(120000);
        httpRequest.setHeader('Authorization','Bearer ' + access_token);
        httpRequest.setEndpoint(endpoint);
        
        Http http = new Http();
        List<Prediction> predictions = new List<Prediction>();
        if (!Test.isRunningTest()) {
            try {
                HTTPResponse res = http.send(httpRequest);
                if (res.getStatusCode() == 200) {
                    System.JSONParser parser = System.JSON.createParser(res.getBody());
                    while (parser.nextToken() != null) {
                        if ((parser.getCurrentToken() == JSONToken.FIELD_NAME) && (parser.getText() == 'probabilities')) {
                            parser.nextToken();
                            if (parser.getCurrentToken() == JSONToken.START_ARRAY) {
                                while (parser.nextToken() != null) {
                                    // Advance to the start object marker to
                                    //  find next probability object.
                                    if (parser.getCurrentToken() == JSONToken.START_OBJECT) {
                                        // Read entire probability object
                                        Prediction probability = (Prediction)parser.readValueAs(Prediction.class);
                                        predictions.add(probability);
                                    }
                                }
                            }
                            break;
                        }
                    }
                }
            } catch(System.CalloutException e) {
                System.debug('ERROR:' + e);
            }
        }
        return(predictions);
    }
    
}