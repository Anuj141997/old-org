public with sharing class LeadInfo {
    
    @AuraEnabled(cacheable=true)
    public static String getlead(String id)
    {
        Lead l=[SELECT Id,Rating FROM Lead WHERE Id=:id];

        if(l.Rating!=null){
        return l.Rating;
        }
        else{
            return '0';
        }
    }

     @AuraEnabled(cacheable=true)
    public static String getRating(String id)
    {
         Lead l=[SELECT Id,Rating FROM Lead WHERE Id=:id];
          if(l.Rating!=null){
        return l.Rating;
        }
        else{
            return '0';
        }

    }
       @AuraEnabled(cacheable=true)
    public static String getStatus(String id)
    {
         Lead l=[SELECT Id,Status FROM Lead WHERE Id=:id];
         if(l.Status!=null){
        return l.Status;
        }
        else{
            return '0';
        }
    }
}