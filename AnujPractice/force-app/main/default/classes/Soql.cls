public class Soql {
    public static void sql()
    {	
       /*string str='%'+s+'%';
        List<account> acc=[Select name,phone,industry from account where name like :str];
        
        for(Account ac:acc)
      	{
          system.debug(ac.name+' '+ac.phone+' '+ac.industry);
        }*/
        
      /*  list<department__c> dep=[select name,total_employees__c,
                                 (select name,name__c from employees__r) from department__c];
        
        for(department__c d:dep)
        {
            system.debug('Department name :'+d.name);
            system.debug('Total No. of Employees :'+d.total_employees__c);
            
            for(employee__c e:d.employees__r)
            {
                system.debug('Employee Code : '+e.name);
                system.debug('Employee name : '+e.name__c);
            }
        }*/
        
     /*   for(Account a: [Select name,industry,(select name,stagename from opportunities ) from account])
        {
            system.debug('Account name '+a.name);
            system.debug('Industry type '+a.industry);
        
            for(Opportunity o:a.opportunities)
            {
                system.debug('Opportunity name '+o.name);
            	system.debug('Stage name '+o.stagename);
            }
        }*/
        
     /*   for(Contact c: [select name,email,phone,account.name,account.phone from contact])
        {
            system.debug('Contact name: '+c.name);
            system.debug('Contact Email: '+c.email);
            system.debug('Contact Phone: '+c.phone);
            system.debug('Account name: '+c.account.name);
            system.debug('Account Phone: '+c.account.phone);
        }*/
        
        for(employee__c e: [select name,name__c,department__r.name from employee__c])
        {
            system.debug('Employee Details-------');
            system.debug('Employee Code'+e.name);
            system.debug('Employee name'+e.name__c);
            system.debug('Department name'+e.Department__r.name);
        }
    }
}