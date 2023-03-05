public class ContactEmail {
    
    public static void send(List<Contact> cons,Opportunity o){
        
        
        system.debug(cons);
        system.debug(o);
       
        for(Contact c:cons){
             list<string> eto=new list<string>();
           eto.add(c.Email);
            
      	Messaging.SingleEmailMessage email=new Messaging.SingleEmailMessage();
        email.setSubject('Contact added as Contact Role');
        email.setPlaintextbody('Dear '+c.LastName+', your Contact is added as Contact Role for '+o.Name);
        email.setSenderDisplayName('Anuj Panwar');
         email.setToAddresses(eto);
             List<Messaging.SingleEmailMessage> emailList=new List<Messaging.SingleEmailMEssage>{email};
        
       			 Messaging.sendEmail(emailList);

            system.debug(email);
        // li.add(email);
           // system.debug(emails);
        }
         
   
    }

}