({
	add : function(component, event, helper) {
        var r1=component.find('inp1');
		var r2=component.find('inp2');
	
    	var x=r1.get('v.value');
        var y=r2.get('v.value');

		var s=Number(x)+Number(y);
        component.set('v.Result',s);
        component.set('v.show',true);
    }
})