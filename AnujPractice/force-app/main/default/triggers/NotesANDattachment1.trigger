trigger NotesANDattachment1 on ContentVersion (after insert) {
    
     Id conDocId = [SELECT ContentDocumentId,title FROM ContentVersion WHERE Id =:trigger.new].ContentDocumentId;
    
        
        
    if(trigger.isafter && trigger.isinsert)
    {
         set<id> cid=new set<id>();
       	set<id> lid=new set<id>();
       		
        	system.debug('id'+conDocId);
        
        	ContentDocumentLink[] link=[SELECT LinkedEntityId FROM ContentDocumentLink WHERE ContentDocumentId =: conDocID];
				system.debug('link'+link);
        for(ContentDocumentLink l:link)
        {
            lid.add(l.LinkedEntityId);
        }
			//id ent=link[0].LinkedEntityId;
				//system.debug('acc id'+ent);
        	List<ContentDocumentLink> l1=new List<ContentDocumentLink>();
            
        
        	for(Contact c:[Select Id,LastName from Contact where AccountId in:lid])
            {
        		ContentDocumentLink d1=new ContentDocumentLink();
        		d1.ContentDocumentId=conDocId;
        		d1.LinkedEntityId=c.Id;
                  d1.ShareType='V';
                  system.debug('new link'+d1);
                  l1.add(d1);
            }
        insert l1;
	}
    
}