public class ContractualEmp  extends Employee{
    
    decimal rate;
    integer days;
    
    public ContractualEmp(integer eid,string epnam,decimal salary,decimal rate,integer days){
        
        super(eid,epnam,salary);
        this.rate=rate;
        this.days=days;
    }
    
  
    
    public void print(){
        
          System.debug('Employee Id : '+eid);
       	  System.debug('Employee Name : '+empnam+lname);
          System.debug('Employee Salary : '+salary);
      	  System.debug('Employee Rate : '+rate);
          System.debug('Employee Days In Month : '+days);
      
      
    }

}