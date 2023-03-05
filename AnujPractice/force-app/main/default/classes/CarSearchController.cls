public with sharing class CarSearchController {
   
    @AuraEnabled(cacheable=true)
    public static List<Car__c> getcars(String typeId)
    {
        if(String.isEmpty(typeId))
        {
            return [SELECT Id,Name,Picture__C,Contact__r.Name,Geolocation__latitude__s,
                            Geolocation__longitude__s 
                            FROM Car__c WHERE Available_For_Rent__C = true WITH SECURITY_ENFORCED];
        }else
        {
                return [SELECT Id,Name,Picture__C,Contact__r.Name,Geolocation__latitude__s,
                            Geolocation__longitude__s 
                            FROM Car__c WHERE Available_For_Rent__C = true AND
                            Car_Type__c =: typeId WITH SECURITY_ENFORCED];
        }
    }
}