trigger CustomerTrig on Customer__c (after insert,after delete) {
    
    if(trigger.isInsert && trigger.isAfter){
    List<AccountTeamMember> li=new List<AccountTeamMember>();
    for(Customer__c c:trigger.new)
    {
        if(c.Account_Manager__c != null)
        {
            AccountTeamMember acc=new AccountTeamMember();
            acc.AccountId=c.Account__c;
            acc.UserId=c.Account_Manager__c;
            acc.TeamMemberRole='Account Manager';
            li.add(acc);
        }
        
    }
    
	insert li;

	}
    
    if(trigger.isDelete && trigger.isAfter)
    {
        List<AccountTeamMember> li=new List<AccountTeamMember>();
        for(Customer__c c:trigger.old)
        {
            AccountTeamMember[] acc=[select id from AccountTeamMember where AccountId=:c.Account__c];
            system.debug(acc);
        }
    }
    
}