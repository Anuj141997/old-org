public class LeadProcessor implements Database.Batchable<Sobject>,Database.Stateful{

	public Integer count=0;
    public Database.QueryLocator start(Database.BatchableContext bc)
    {
        return Database.getQueryLocator('SELECT Id,LeadSource from Lead');
    }
    
    public void execute(Database.BatchableContext bc,List<Lead> li)
    {
        List<Lead> up=new List<Lead>();
        for(Lead l:li)
        {
            l.LeadSource = 'DreamForce';
            up.add(l);
            count =count +1;
        }
		update up;
    }
    
    public void finish(Database.BatchableContext bc)
    {
     	system.debug(count);   
    }
    
}