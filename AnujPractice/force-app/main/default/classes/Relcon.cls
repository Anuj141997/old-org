public with sharing class Relcon {

    @AuraEnabled(cacheable=true)
    public static list<Recommendation__c> getRelatedList(Id recordId)
    {
    
        List<Recommendation__C> conlist = [SELECT id,Rating__c,Recommend__c,Priority__c,Status__c,Header__c 
                                           FROM Recommendation__c WHERE ContactId__c=:recordId
                                           WITH SECURITY_ENFORCED ];
        for(Recommendation__c r:conlist)
        {
            String s=r.Recommend__c;
            String s1=r.Header__c;
            s=s.replaceAll('<[^>]+>','');
                        s1=s1.replaceAll('<[^>]+>','');
            r.Recommend__c=s;
            r.Header__c=s1;
        }
        return conlist;
    }
}