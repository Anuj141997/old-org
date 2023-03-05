@isTest
public class AddPrimaryContactTest {

    
    @testSetup
    static void setup()
    {
        List<Account> acc=new List<Account>();
      
        for(Integer i=0;i<50;i++)
        {

            acc.add(new Account(Name='TestAccount'+i,BillingState='NY'));
            
        }
         for(Integer i=50;i<100;i++)
        {

            acc.add(new Account(Name='TestAccount'+i,BillingState='CA'));
            
        }
        insert acc;
        
        Contact con=new Contact(LastName='Test Contact');
        insert con;
        
    }
        @isTest
        static void method1()
        {
            Contact con=[Select id,LastName from Contact Limit 1];
        	
            AddPrimaryContact addContact=new AddPrimaryContact(con,'CA');
            
            Test.startTest();  
            System.enqueueJob(addContact);
            Test.stopTest();
            
            System.assertEquals(50, [SELECT count() from Contact Where AccountId in (Select id from Account Where BillingState ='CA')]);
            
        }
   
}