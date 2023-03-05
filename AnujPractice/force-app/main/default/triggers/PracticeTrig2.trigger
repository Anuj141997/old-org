trigger PracticeTrig2 on Contact (before insert,after insert,after delete) {
    
    if(trigger.isinsert && trigger.isbefore){    
    //Contact[] con=[Select Id,FirstName,LastName,Account.Id from Contact where id in:trigger.new];
    Account[] acc=new List<Account>();   
   
    for(Contact c:trigger.new)
    {
        if(c.AccountId!=null)
        {
                Account ac=[Select id,Name from Account where Id=: c.AccountId];
              ac.Name=ac.Name+c.LastName;
            system.debug(ac.Name);
            acc.add(ac);
            
           
        }
    }
    update acc;
    }
    
    if(trigger.isdelete && trigger.isafter)
    {
        Account[] accList=new List<Account>();
        Contact[] cont=new List<Contact>();
        for(Contact c:trigger.old)
        {
            Account ac=[select id,Name from Account where id =: c.AccountId];
            ac.Name=ac.Name.replace(c.LastName,'');
             cont=[Select id from Contact where AccountId=:c.AccountId];
            ac.Count__c=cont.size();
            accList.add(ac);
        }
        update accList;
        
    }
    
    if(trigger.isinsert && trigger.isafter)
    {
       
         Set<id> cid=new Set<id>();
         List<Contact> lic=new List<Contact>();
        List<Account> acl=new List<Account>();
        List<ContentDocumentLink> li=new List<ContentDocumentLink>();
        for(Contact con:trigger.new)
        {
            if(con.AccountId!=null)
            {
            Account ac=[Select id ,Name from Account Where id=:con.AccountId] ;       
         ContentDocumentLink[] cd=[Select ContentDocumentId from ContentDocumentLink Where LinkedEntityId=: ac.Id];
            system.debug('acc'+ac);
            system.debug('cdl'+cd);    
                
                for(ContentDocumentLink c:cd)
                {
                    ContentDocumentLink ncdl=new ContentDocumentLink();
                    ncdl.ContentDocumentId=c.ContentDocumentId;
                    ncdl.LinkedEntityId=con.Id;
                    li.add(ncdl);
                    
                }
            
                 lic=[Select id from Contact where AccountId=:con.AccountId];
                    ac.Count__c=lic.size();
                acl.add(ac);
            }
            
            
        }
        
       
        system.debug('list'+li);
        insert li;
        update acl;
        
    }
}