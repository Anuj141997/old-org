trigger trig2 on Account (before update) {

    for(account ac:trigger.new)
    {
        if(ac.industry=='banking')
        {
            ac.phone='7060384858';
        }
    }
}