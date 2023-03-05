public class ins {
    
    public static void create()
    {
        list<account> ac=new List<account>
        {
            new Account(name='Ram'),
                new Account(name='Shyam')
        };
    
    	insert ac;        
    }

}