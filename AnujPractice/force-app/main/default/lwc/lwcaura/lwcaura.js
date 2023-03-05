import { api, LightningElement } from 'lwc';

export default class Lwcaura extends LightningElement {

    @api
    lwcmethod(message)
    {
        alert(message);
    }

    ev()
    {
        const event=new CustomEvent('even',
        {
            detail:
            {
                msg:'Lwc msg' 
            }
        }
        );

        this.dispatchEvent(event);
    }
}