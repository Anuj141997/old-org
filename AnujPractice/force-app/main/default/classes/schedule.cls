public class schedule implements schedulable {
    
    public void execute(schedulablecontext sc)
    {
        contactbatch obj=new contactbatch();
        database.executeBatch(obj,7);
    }

}