@istest
public class trig4test {

	@testsetup
    static void mydata()
    {
        account ac=new account(name='test1');
        insert ac;
    }
    @istest
    static void mytest1()
    {
        account ac=[select id from account limit 1];
        opportunity op=new opportunity(name='op1',stagename='prospecting',closedate=system.today()+15);
        op.accountid=ac.id;
        insert op;
        
        test.startTest();
        database.DeleteResult res=database.delete(ac,false);
        test.stopTest();
        system.assert(res.isSuccess()==false);
    }

	@istest
    static void mytest2()
    {
        account ac=[select id from account limit 1];
        test.startTest();
        database.DeleteResult res=database.delete(ac,false);
        test.stopTest();
        system.assert(res.isSuccess()==true);
    }
}