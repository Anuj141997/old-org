public class Remotecntrl {
    
    integer vol;
    static final integer max=50;
    
    public remotecntrl(integer vol)
    {
        this.vol=vol;
    }
    
    public integer inc(integer v)
    {
        vol=vol+v;
        if(vol>max)
        {
            vol=50;
        }
        return vol;
    }

    public integer dec(integer v)
    {
        vol=vol-v;
        if(vol<0)
        {
            vol=0;
        }
        return vol;
    }

}