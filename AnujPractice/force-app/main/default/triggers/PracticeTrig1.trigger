trigger PracticeTrig1 on Account (after insert) {
    
    
    
    contact[] c=new List<contact>();
    case[] li=new List<case>();
    opportunity[] opp=new List<opportunity>();
    Account[] acc=[Select id,Name,NumberOfEmployees from Account where id in:trigger.new];
    for(account a:acc)
    {
        if(a.NumberOfEmployees>100)
        {
        	contact con=new contact();
            con.LastName='Default Contact'+a.Name;
            con.AccountId=a.Id;
            c.add(con);
          
           
        	
        	Opportunity op=new Opportunity();
        	op.Name='Default Opp'+a.Name;
        	op.AccountId=a.Id;
        	op.StageName='Prospecting';
        	op.CloseDate=system.today();
        	opp.add(op);
        }
    }
    insert c;
   
   insert opp;
    for(Account a:acc)
    {
    	for(Contact co:c)
    	{
        	 Case cs=new Case();
            cs.AccountId=a.Id;
            cs.ContactId=co.Id;
            cs.Status='New';
            cs.Origin='Web';
        	li.add(cs);
    	}
    }
     insert li;
}