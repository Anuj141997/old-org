public with sharing class GetRecommendations {
 
    @AuraEnabled(cacheable=true)
    public static List<Recommendation__c> getRec(String id)
    {
       List<Recommendation__c> li= [Select Id,Header__c,Name,Priority__c,Status__c,Rating__c
                ,Recommend__c, ContactId__r.Name From Recommendation__c where ContactId__c =:id WITH SECURITY_ENFORCED];

        //          for(Recommendation__c r:li)
        // {
        //     String s=r.Recommend__c;
        //     String s1=r.Header__c;
        //     s=s.replaceAll('<[^>]+>','');
        //                 s1=s1.replaceAll('<[^>]+>','');
        //     r.Recommend__c=s;
        //     r.Header__c=s1;
        // }
        return li;
    }
}