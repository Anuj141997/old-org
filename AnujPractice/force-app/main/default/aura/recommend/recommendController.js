({
     handleLikeButtonClick : function (cmp) {
        cmp.set('v.liked', !cmp.get('v.liked'));
        
     },     
	         
	myAction : function(component, event, helper) {
        
         var rec = component.get("c.getRelatedList");
        rec.setParams
        ({
            recordId: component.get("v.recordId")
        });
        
        rec.setCallback(this, function(data) 
                           {
                               component.set("v.Reclist", data.getReturnValue());
                           });
        $A.enqueueAction(rec);
		
	}
})