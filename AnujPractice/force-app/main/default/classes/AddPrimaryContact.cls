public class AddPrimaryContact implements Queueable{

    private Contact con;
    private String state;
    
    public AddPrimaryContact(Contact con,String state)
    {
        this.con=con;
        this.state=state;
    }
    
    public void execute(QueueableContext qc)
    {
        List<Account> acc=[Select id from Account where BillingState =:state Limit 200];
       
        List<Contact> l1=new List<Contact>();
        
        for(Account ac:acc)
        {
            Contact c=con.clone();
            c.AccountId=ac.Id;
            l1.add(c);
        }
        
        if(l1.size()>0)
        {
            insert l1;
        }
        
        
    }
    
}