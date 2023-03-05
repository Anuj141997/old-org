import { api, LightningElement } from 'lwc';

export default class BeerTile extends LightningElement {
    @api beerRec;

    handleclick()
    {
        this.dispatchEvent( new CustomEvent('addcart',
        {
            detail:this.beerRec.Id
        }));
    }
}