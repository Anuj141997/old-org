public class upd {
    
    public static void updt()
    {
        list<Account> ac=[select id,name,industry from account where createddate=today];
        for(Account a:ac){a.industry='banking';}
        update ac;
    }

}