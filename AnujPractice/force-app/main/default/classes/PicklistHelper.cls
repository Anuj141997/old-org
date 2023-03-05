public with sharing class PicklistHelper {
    public PicklistHelper() {
        

    }
    @AuraEnabled(cacheable=true)
    public static Map<Id,String> getprofile()
    {
        Map<Id,String> obj=new Map<Id,String>();
        for(Profile p:[select id,name from Profile limit 10]){
            obj.put(p.Id,p.name);
        }
        return obj;
    }
}