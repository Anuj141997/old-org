public class del {
    
    public static void delt()
    {
        list<account> a=[select name from account where industry='banking'];
        delete a;
        
    }

}