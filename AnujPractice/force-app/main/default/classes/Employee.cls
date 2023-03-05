public virtual class Employee {

   public String empnam;
   public integer eid;
   public decimal salary;
  public string lname='Panwar';
    
    public Employee(integer eid,string epnam,decimal salary)
    {
        this.eid=eid;
        this.empnam=epnam;
        this.salary=salary;      
        
    }
    
   /* public Employee()
    {
        this.lname='Panwar';
    }*/
    
   // public void print()
    /*{
        System.debug('Employee Id : '+eid);
        System.debug('Employee Name : '+empnam);
        System.debug('Employee Salary : '+salary);
               
    }*/
    
}