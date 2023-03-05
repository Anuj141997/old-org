import { LightningElement,api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CarDetailTab extends NavigationMixin(LightningElement) {

    @api car;

    fulldetails()
    {
      
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes:
            {
                recordId: this.car.data.fields.Id.value,
                objectApiName: 'Car__c',
                actionName: 'view'

            },
        });
    }
    
    get carName()
    {
        //console.log('tab',this.car);
        try{
            return this.car.data.fields.Name.value;
        } catch (error) { return 'NA';}
    }
     get ownerName()
    {
        try{
            return this.car.data.fields.Contact__r.value.fields.Name.value;
        } catch (error) { return 'NA';}
     }
     get type()
    {
        try{
            return this.car.data.fields.Car_Type__r.value.fields.Name.value;
        } catch (error) { return 'NA';}
     }
     get year()
    {
        try{
            return this.car.data.fields.Build_Year__c.value;
        } catch (error) { return 'NA';}
     }
     get rent()
    {
        try{
            return this.car.data.fields.Per_Day_Rent__c.value;
        } catch (error) { return 'NA';}
     }
     get mileage()
    {
        try{
            return this.car.data.fields.Mileage__c.value;
        } catch (error) { return 'NA';}
     }
     get picture()
    {
        try{
            return this.car.data.fields.Picture__c.value;
        } catch (error) { return 'NA';}
     }
}