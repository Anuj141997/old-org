trigger PracTrig4 on OpportunityLineItem (after insert) {

    set<Id> i=new set<Id>();
    for(OpportunityLineItem op:trigger.new)
    {
        if(op.OpportunityId!=null){i.add(op.OpportunityId);}
        
    }
    
        	OpportunityLineItem[] li=[Select Id from OpportunityLineItem where OpportunityId in:i];
        	Integer count=li.size();
    for(OpportunityLineItem o:trigger.new)
    {
        if(count>2)
        {
            o.addError('Already have 2 line items, Can not add more');
        }
    }  
    
}