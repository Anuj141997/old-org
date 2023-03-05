public with sharing class LookUpCont {
    
    @AuraEnabled(cacheable=true)
    public static List<sObject> frec(String obj,String fld,String skey)
    {
        String k='%'+skey+'%';
            
        String q=' Select Id,'+String.escapeSingleQuotes(fld)+' from '+String.escapeSingleQuotes(obj)+' Where '+ String.escapeSingleQuotes(fld)+' Like : k' ;

        List<sObject> slist=Database.query(q);

        return slist;
    }
}