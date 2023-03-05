trigger trig1 on Account (After insert) {
    
    account[] acc=Trigger.new;
    
    opportunity[] opp=new list<opportunity>();
    
    for(account a:acc)
    {
        if(a.industry=='education' && a.rating=='warm')
        {
            opportunity op=new opportunity();
            
            op.name=a.Name;
            op.stagename='prospecting';
            op.closedate=system.today()+15;
            op.type='New Customer';
            op.AccountId=a.Id;
            opp.add(op);
        }
    }
    insert opp;

}