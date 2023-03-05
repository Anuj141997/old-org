public class Sobjectdemo {
    
    public static Hospital__c getHospital()
    {
        Hospital__c hobj=[select Name,Hospital_Type__c,Contact__c,Website__c
                         ,City__c,State__c from Hospital__c limit 1];
        
        return hobj;
        
    }
    public static void setHospital(String name,String typ,string cont,string web,
                              string city,string state){
			Hospital__c obj=new Hospital__c(Name=name,Hospital_Type__c=typ,Contact__c=cont,
                                           Website__c=web,City__c=city,State__c=state);  
        
        	insert obj;
        	system.debug('Hospital Created Succesfully');
    }
    
}