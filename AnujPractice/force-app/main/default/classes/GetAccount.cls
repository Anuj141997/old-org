public with sharing class GetAccount {
    @AuraEnabled(cacheable=true)    
    public static List<Account> getaccounts() {

        return [SELECT Id,Name,Type,Rating,Phone,Website,Industry,AnnualRevenue FROM Account LIMIT 10];

    }

    @AuraEnabled
    public static List<Contact> getcon(){

        return [select Id,FirstName,LastName from Contact ];
    }
}