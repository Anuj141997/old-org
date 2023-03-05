public with sharing class MassDelete {
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContact()
    {
        return[SELECT Id,FirstName,LastName,Title,Phone,Email 
            FROM Contact where FirstName!=null Order By createdDate desc];
    }
    
    @AuraEnabled
    public static void delcon(List<Id> selcon)
    {
        List<Contact> conlist=new List<Contact>();

            conlist = [ select Id from Contact where Id in:selcon WITH SECURITY_ENFORCED ];
            
            if(conlist!=null && conlist.size()>0)
                {
                    
            if(Contact.SObjectType.getDescribe().isDeletable()==true){
                    delete conlist;
                }
            }
               
                 
        
    }

}