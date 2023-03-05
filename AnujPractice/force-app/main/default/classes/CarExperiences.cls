public with sharing class CarExperiences {

    @AuraEnabled
    public static List<Car_Experience__c> getexp(string id)
    {
        return [SELECT id,Name,Experience__c,LastModifiedDate,CreatedDate,
                    CreatedBy.Name,CreatedBy.SmallPhotoUrl,CreatedBy.CompanyName
                    FROM Car_Experience__c WHERE Car__c =:id ORDER BY CreatedDate DESC];
    }
}