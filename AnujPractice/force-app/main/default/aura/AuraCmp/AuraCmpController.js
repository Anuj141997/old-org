({
    handle : function(component, event, helper) {
            const m=event.getParam('msg');
            alert(m);
    },
    handlelwc : function(component, event, helper)
    {
        var child=component.find('lwc');
        child.lwcmethod('From lwc');
    }
})