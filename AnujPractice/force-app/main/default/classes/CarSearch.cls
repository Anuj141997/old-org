public with sharing class CarSearch {
   
    @AuraEnabled(cacheable=true)
    public static List<Car_Type__c> carType()
    {
        return [SELECT Id,Name FROM Car_Type__c WITH SECURITY_ENFORCED];
    }
}