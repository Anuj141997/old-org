trigger LeadPracTrig on Lead (before insert) {
    
    Id userid=UserInfo.getUserId();
   // String name=UserInfo.getName();
    
    system.debug('user'+userid );
    for(Lead l:trigger.new)
    {
        List<Lead> li=[Select id,Name from Lead where CreatedById =: userid];
        system.debug('list'+li);
        system.debug('size'+li.size());
        if(li.size()>=20)
        {
            l.addError('Can not add more than 20 leads for this User');
        }
    }
}