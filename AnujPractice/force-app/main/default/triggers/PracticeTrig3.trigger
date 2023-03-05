trigger PracticeTrig3 on Opportunity (After insert) {
    
    OpportunityContactRole[] oplist=new List<OpportunityContactRole>();
     List<AccountTeamMember> li=new List<AccountTeamMember>();
    for(Opportunity op:trigger.new)
    {  
        Contact[] con=[select Id,LastName,Email from Contact where AccountId =: op.AccountId];
        
        for(Contact c:con)
        {
            OpportunityContactRole opr=new OpportunityContactRole();
            opr.OpportunityId=op.Id;
            opr.ContactId=c.Id;
            oplist.add(opr);
        }
        
        if(op.Probability == 20){
            
            AccountTeamMember a=new AccountTeamMember();
            a.AccountId=op.AccountId;
            a.UserId=op.OwnerId;
            a.TeamMemberRole='Account Manager';
            li.add(a);
        }
       // ContactEmail.send(con,op);
        
    }
	insert li;    
	insert oplist;    
}