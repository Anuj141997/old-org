public with sharing class GetContact {

    @AuraEnabled(cacheable=true)
    public static List<Contact> getcon(String accid)
    {
        return [Select Id,FirstName,LastName,Email from 
                    Contact where  AccountId=:accid LIMIT 10];
    }
}