public class sosl {
    
    public static void sacc(){
        
        list<list<sobject>> li=[find 'Edge' IN ALL FIELDS RETURNING Account(name),Opportunity(name,stagename)];
        
        for(list<sobject> lis:li)
        {
            if(lis instanceof list<account>)
            {
                list<account> acc=(list<account>)lis;
                
                for(Account a:acc)
                {
                    System.debug('Account Name :'+a.name);
                }          
            }
        	
            if(lis instanceof list<opportunity>)
            {
                list<opportunity> opp=(list<opportunity>)lis;
                
                for(opportunity o:opp)
                {
                    System.debug('Opportunity Name :'+o.name);
                    system.debug('Stage Name :'+o.stagename);
                }
            }
                
        }
	}
}