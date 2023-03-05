public class db {

    public static void dbm()
    {
        contact[] c=new contact[]
        {
            new contact(firstname='Rahul',lastname='Tyagi',phone='7060384878'),
            new contact(firstname='Amay',lastname='Shamra'),
                new contact(firstname='Jitu',lastname='Singh'),
                new contact(firstname='Pearl',lastname='Malothra',phone='7060388970')
        };
        database.SaveResult[] re=database.insert(c,false);
        
        for(database.SaveResult r:re)
        {
            if(r.issuccess())
            {
                system.debug('Inserted Successfuly');
            }
            else
            {
                database.Error[] err=r.getErrors();
                for(database.error er:err)
                {
                    system.debug('Error :'+er.getmessage()+' '+er.getfields());
                }
            }
        }
    }
}