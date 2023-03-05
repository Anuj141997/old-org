@isTest
public class AccountProcessorTest {
    
    @testSetup
    static void setup()
    {
        List<Account> testAcc = new List<Account>();
         List<Contact> testCon = new List<Contact>();
        for(Integer i=0;i<200;i++)
        {
            testAcc.add(new Account(Name='TestAcc'+i,Industry='Education'));
        }
        insert testAcc;
        
        for( Account a:[Select Id from Account])
        {
            testCon.add(new Contact(LastName='LastNAme', AccountId=a.Id));
        }
        insert testCon;
    }
    
    @isTest
    static void method1()
    {
        List<Id> acId=new List<Id>();
        
        Account acc= [Select Id,Name,Number_of_Contacts__c from Account Limit 1];
        acId.add(acc.Id);
      
        Test.startTest();
        AccountProcessor.countContacts(acId);
        Test.stopTest();
        	//system.debug([Select count() from Account where Number_of_Contacts__c = 1]);
        System.assertEquals(1,[Select count() from Account where Number_of_Contacts__c = 1]);
        
    }

}