public class Acc{
    
    public void Accdetail()
    {
       List<Account> ac=[select Id,Name,Phone,Industry from Account];
        
        for(Account acc:ac)
        {
            System.debug(acc.Id+' '+acc.Name+' '+acc.Phone+' '+acc.Industry);
        }
    }
    public void InsertAcc(List<Account> ac)
    {
     	insert ac;
        system.debug('Inserted Succesfully');
    }    
    

}