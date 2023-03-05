public with sharing class AccountCreator {
    
    @AuraEnabled
    public static Account createAcc(Account accobj){
        try {
            insert accobj;
            return accobj;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static List<Account> acclist(List<Account> li)
    {
        insert li;
        return li;
    }
}