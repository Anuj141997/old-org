trigger trig4 on Account (before insert,before delete,after undelete) {
    
   
 if(trigger.isinsert && trigger.isbefore)
 {
    list<string> names=new list<string>();
    for(account ac:trigger.new)
    {
        names.add(ac.name);
    }
    account[] acl=[select name from account where name in :names];
    
    for(account ac:trigger.new)
    {
        for(account ac1:acl)
        {
            if(ac.Name==ac1.Name){ac.adderror('Already exist');}
        }
    }
 }
	
    if(trigger.isdelete && trigger.isbefore)
    {
        account[] acc=[select id,name,(select id from opportunities) from account where id in:trigger.old];
        
        for(Account ac:acc)
        {
            opportunity[] op=ac.opportunities;
            if(op.size()>0)
            {
                trigger.oldmap.get(ac.id).adderror('Account Cant be deleted');	
            }
        }
    }
    		
    if(trigger.isundelete && trigger.isafter)
    {
        account[] acc=[select name,active__c from account where id in:trigger.new];
        account[] acl=new list<account>();
        for(account ac:acc)
        {
            ac.Active__c='Yes';
            acl.add(ac);
        }
    	update acl;  
    }
}