@isTest
public class DailyLeadProcessorTest {

    
    @testSetup
    static void setup()
    {
        List<lead> leadData=new List<lead>();
        
        for(Integer i=0;i<200;i++){
            
            leadData.add(new Lead(LastName='Lead'+i,Company='HHH',Status='Open - Not Contacted'));
        }
        insert leadData;
            
    }
    
    @isTest
    static void method()
    {
          String cronExp = '0 0 0 15 3 ? 2022';
        
        Lead[] l1=[Select id,Name,LeadSource from Lead Limit 200];
        
        
        Test.startTest();
        String jobId=System.schedule('TestLead1', cronExp, new DailyLeadProcessor() );
        test.stopTest();
        
        system.assertEquals(200, [Select count() from Lead where LeadSource='DreamForce']);
    }
}