public class opprat {

     
    // Used to get Opportunity's current rating.
    // Params: recordId - Opportunity record id.
    @AuraEnabled
    public static Integer getr( Id recordId ){
        Recommendation__c r = [SELECT Id, Rating__c from Recommendation__c WHERE Id=:recordId];
        return r.Rating__c != null ? Integer.valueOf( r.Rating__c )  : 0;
    }
 
    // Used to update Opportunity record with new rating.
    // Params: { recordId: Opportunity record id, rating: new rating for this opportunity }
    @AuraEnabled
    public static String upd(Id recordId, String rating ){
        update new Recommendation__c( id=recordId, Rating__c= rating);
        return 'SUCCESS';
    }

}