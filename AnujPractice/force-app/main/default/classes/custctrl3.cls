public class custctrl3 {
    
    public contact con{get; set;}
  
    public Contact[] cl{get; set;}
    public string confn{get; set;}
    
    public custctrl3(){con=new contact();}
        
    public void cont()
    {
               
        try{
            insert con;
        
           ApexPages.addMessage(new ApexPages.message(Apexpages.Severity.INFO,'Contact with id '+con.id+' created succesfully..'));
        	}
        catch(DMLException e)        
        	{
              ApexPages.addMessage(new ApexPages.message(Apexpages.Severity.ERROR,e.getMessage()));
         	}
        }
    public void dis()
    {
        cl=[select firstname,lastname,email,phone from contact];
    }
    
    public void del()
    {
        contact ac=[select id,lastname from Contact where lastname=:confn];
        
                try{
            delete ac;
        
           ApexPages.addMessage(new ApexPages.message(Apexpages.Severity.INFO,'Contact with id '+ac.id+' deleted succesfully..'));
        	}
        catch(DMLException e)        
        	{
              ApexPages.addMessage(new ApexPages.message(Apexpages.Severity.ERROR,e.getMessage()));
         	}

    }

}