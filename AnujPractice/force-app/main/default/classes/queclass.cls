public class queclass implements queueable{
    
    public account ac;
    
    public queclass(account ac)
    {
        this.ac=ac;
    }
    public void execute(queueablecontext qc)
    {
        ac.Name=this.ac.name+' updated';
        ac.Industry='education';
        update ac;
    }

}