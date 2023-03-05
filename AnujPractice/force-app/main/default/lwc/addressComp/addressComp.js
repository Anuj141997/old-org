import { LightningElement,api } from 'lwc';

export default class AddressComp extends LightningElement {
    @api address;

    handleSelect()
    {
        this.dispatchEvent(new CustomEvent('address',
        {
            detail: this.address.Id
            }));
        console.log(this.address.Id);
    }
}