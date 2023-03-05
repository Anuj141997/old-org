trigger trig5 on Contact (after delete) {
    
    account[] acl=new list<account>();
    
    list<id> aid=new list<id>();
    for(contact c:trigger.old)
    {
        aid.add(c.accountid);
    }
    account[] acc=[select id,(select id from contacts) from account where id in:aid];
    
    for(account ac:acc)
    {
        contact[] co=ac.contacts;
        if(co.size()==0)
        {
            acl.add(ac);
        }
    }
    delete acl;
}