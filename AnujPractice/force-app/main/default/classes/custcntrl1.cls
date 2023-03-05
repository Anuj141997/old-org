public class custcntrl1 {

    public string fname{get; set;}
    public string lname{get; set;}
    public string full{get; set;}
    
    public void fullname()
    {
        full=fname+' '+lname;
    }
}