public class DMLmethod {

    public static void upd(Sobject[] li1)
    {
        database.SaveResult[] res=database.update(li1,false);
        for(database.SaveResult re:res)
        {
            if(re.issuccess()){system.debug('Record with '+re.getId()+' Saved successfuly');}
            else{system.debug('Problem occured :'+re.getErrors());}
        }
    }
    public static void del(sobject[] li2)
    {
        database.DeleteResult[] del=database.delete(li2);
    	for(database.DeleteResult de:del)
        {
            if(de.issuccess()){system.debug('Record with '+de.getId()+' Deleted successfuly');}
            else{system.debug('Problem occured :'+de.getErrors());}
        }
    }
}