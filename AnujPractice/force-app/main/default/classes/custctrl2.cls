public class custctrl2 {

    public integer num1{get; set;}
    public integer num2{get; set;}
    public integer res{get; set;}
    
    public void add()
    {
        res=num1+num2;
    }
    public void sub()
    {
        res=num1-num2;
    }
    public void mul()
    {
        res=num1*num2;
    }
    public void div()
    {
        res=num1/num2;
    }
}