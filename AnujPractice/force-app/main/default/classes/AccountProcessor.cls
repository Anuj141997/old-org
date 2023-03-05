public class AccountProcessor {
	@future
    public static void countContacts(List<Id> ids)
    {
        List<Account> Toupdate = new List<Account>();
        List<Account> li = [SELECT Id,Number_of_Contacts__c from Account where Id in: ids];
        	
        for(Account a:li)
        {
            List<Contact> con=[Select id,LastName from Contact where AccountId =:a.Id];
            a.Number_of_Contacts__c=con.size();
            Toupdate.add(a);
        }
        
        Update Toupdate;
    }
}