@isTest
public class remoteTest {

    @isTest
    static void inctest()
    {
        remotecntrl obj1=new remotecntrl(25);
        integer x=obj1.inc(5);
        system.assertEquals(30, x,'Method Fail');
    } 
@isTest
    static void dectest()
    {
        remotecntrl obj1=new remotecntrl(25);
        integer x=obj1.dec(5);
        system.assertEquals(20, x,'Method Fail');
    } 
    
    @isTest
    static void inctest1()
    {
        remotecntrl obj1=new remotecntrl(25);
        integer x=obj1.inc(35);
        system.assertEquals(50, x,'Method Fail');
    } 
	@isTest
    static void dectest1()
    {
        remotecntrl obj1=new remotecntrl(25);
        integer x=obj1.dec(35);
        system.assertEquals(0, x,'Method Fail');
    } 


}