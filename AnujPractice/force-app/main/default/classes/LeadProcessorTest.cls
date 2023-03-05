@isTest
public class LeadProcessorTest {

    
    @testSetup
    static void setup()
    {
        List<Lead> l1=new List<Lead>();
        for(Integer i=0;i<50;i++)
        {
            l1.add(new Lead(LastName='Lead'+i,Company='HHH',Status='Open - Not Contacted'));
        }
    		insert l1;
    }
    
    @isTest
    static void method1()
    {
        Test.startTest();
        
        LeadProcessor l= new LeadProcessor();
        Id batchId=Database.executeBatch(l);
        Test.stopTest();
        
        System.assertEquals(50, [SELECT count() from Lead Where LeadSource= 'DreamForce']);
    }
}