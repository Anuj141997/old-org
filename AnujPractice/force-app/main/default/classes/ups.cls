public class ups {

    public static void upsrt()
    {
        account[] ac=[select name from account where industry='Banking'];
        for(account a:ac){a.industry='IT';}
            
         account na=new account(name='Ramu',industry='banking');
        ac.add(na);
        upsert ac;
    }
}