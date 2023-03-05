public class custctrl4 {
	
    public string msg{get; set;}
    public list<string> fruit{get; set;}
    
    public custctrl4()
    {	
        msg='Hello';
        fruit=new list<string>{'Apple','Banana','Mango'};
    }
}