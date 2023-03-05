public with sharing class AccountSearch {
   
    @AuraEnabled(cacheable=true)
    public static List<Account> getacc(String accname)
    {   
        List<Account> acc=new List<Account>();
        if(accname!=''){
        String s= '%'+accname+'%';

         acc= [select id,name from Account where name like:s WITH SECURITY_ENFORCED];
        return acc;
        }
        return acc;
    }
}