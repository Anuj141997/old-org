public class DailyLeadProcessor implements Schedulable {
	
    public void execute(SchedulableContext sc)
    {
        List<Lead> l1= [Select Id,LeadSource from lead where LeadSource = null ];
        List<Lead> l2=new List<Lead>();
        for(Lead l:l1)
        {
            l.LeadSource='Dreamforce';
        	l2.add(l);
        }
        
        if(l2.size()>0)
        {
            Update l2;
        }
    }    
    

}