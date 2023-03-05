public class contactbatch implements database.Batchable<sobject>,database.stateful {
    
    integer tot=0;
    integer suc=0;
    integer fail=0;
    
    public database.QueryLocator start(database.BatchableContext bcon)
    {
		        system.debug('Start');
        database.QueryLocator ql=database.getQueryLocator('select id,name,fax,email,mobilephone,description,account.fax,account.name,account.rating,account.phone,account.industry from contact');
        
        return ql;

    }
    
    public void execute(database.BatchableContext bcon,list<contact> cl)
    {
        tot=cl.size()+tot;
        system.debug('Execute');
        for(contact c:cl)
        {
            if(c.fax==null || c.fax=='')
            {
                c.fax=c.account.fax;
            }
            if(c.mobilephone==null||c.mobilephone=='')
            {
                c.mobilephone=c.account.phone;
            }
            c.email='anujpanwar445@gmail.com';
            c.description=c.account.name+''+c.account.rating+''+c.account.industry+''+c.email; 
        }
    	list<database.SaveResult> res=database.update(cl,false);
        for(database.SaveResult r:res)
        {
            if(r.issuccess()){suc++;}
            else{fail++;}
        }
    }
    public void finish(database.BatchableContext bcon)
    {
        messaging.SingleEmailMessage email=new messaging.SingleEmailMessage();
        email.setSubject('Contact Batch Class');
        email.setHtmlBody('Dear User, Batch has been processed succesfully<br/>	Total Records :'+tot+'<br/>Success :'
                         +suc+'<br/>Failure :'+fail);
        email.setSenderDisplayName('Anuj Panwar');
        
        list<string> eto=new list<string>();
        eto.add('anuj.panwar@wipro.com');
        email.setToAddresses(eto);
        list<messaging.SingleEmailMessage> el=new list<messaging.SingleEmailMessage>{email};
        messaging.sendEmail(el);
    }

}