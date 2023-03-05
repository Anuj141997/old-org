trigger OpportunityExample on Opportunity (after update,after Insert,after Delete) {

    
    if((trigger.IsInsert && trigger.isAfter)||(trigger.IsUpdate && trigger.isAfter)){
    
    List<Account> accList=new List<Account>();
    Set<Id> accId=new Set<Id>();
    for(Opportunity op:trigger.new)
    {
        if(op.accountId!=null)
        {
            accId.add(op.AccountId);
            
        }
    }
    
        Account[] acc=[Select id,AnnualRevenue,(select id,amount from opportunities) from Account where id in: accId];
        system.debug(acc);
    for(Account a:acc)
    {
        double totalSum=0.00;
        system.debug(a.opportunities);
        Opportunity[] opp=a.opportunities;
        for(Opportunity op:opp)
        {	
            totalSum=totalSum+op.Amount;
        }
        a.AnnualRevenue=totalSum;
        accList.add(a);
    }
    
    if(!accList.isEmpty())
    {
        update accList;
    }
    }
}