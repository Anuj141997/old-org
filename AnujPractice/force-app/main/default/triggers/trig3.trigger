trigger trig3 on Account (after update) {
    
     account[] acc=[select phone,(select otherphone,mobilephone from contacts) from account where id in:trigger.new];
    contact[] con=new list<contact>();
    
    for(account a:acc){
        
        account oldac=trigger.oldmap.get(a.id);
        
        if(a.phone!=oldac.phone)
        {
			contact[] cl=a.contacts;	
            for(contact c:cl)
                {
                    c.otherphone=oldac.phone;
                    c.mobilephone=a.phone;
                    con.add(c);
                }
        	
        }
        
        
    }
    update con;    

}