import { LightningElement,api } from 'lwc';

export default class CartItems extends LightningElement {
    @api item;

    handledel()
    {
        this.dispatchEvent(new CustomEvent('delete',
        {
            detail: this.item.Id
        }));
    }
}