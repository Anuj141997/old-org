trigger PracTrig5 on Campaign (after update) {
    
    
    if(trigger.isafter && trigger.isupdate)
    {
        Opportunity[] op=[select id from opportunity where campaignId in:trigger.new];
        for(Campaign c:trigger.new)
        {
            if(c.Status == 'Completed')
            {
                for(opportunity o:op)
                {
                    OpportunityLineItem[] li=[select id from OpportunityLineItem where opportunityId =: o.id];
                    if(li.size()>0)
                    {
                        o.StageName='Closed Won';
                    }
                    else{o.StageName='Closed Lost';}
                }
            }
        }
        update op;
    }

}