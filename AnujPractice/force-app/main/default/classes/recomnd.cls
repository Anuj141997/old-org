public with sharing class recomnd
{
     public Integer rating { get; set; }
    
    @AuraEnabled
    public static list<Recommendation__c> getRelatedList(Id recordId)
    {
        List<Recommendation__C> Conlist = [Select id,Rating__c,Recommend__c,Priority__c,Status__c,Header__c 
                                           from Recommendation__c where ContactId__c=: recordId ];
        for(Recommendation__c r:Conlist)
        {
            String s=r.Recommend__c;
            String s1=r.Header__c;
            s=s.replaceAll('<[^>]+>','');
                        s1=s1.replaceAll('<[^>]+>','');
            r.Recommend__c=s;
            r.Header__c=s1;
        }
        return Conlist;
    }
}