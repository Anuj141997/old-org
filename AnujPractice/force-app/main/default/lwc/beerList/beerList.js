import { LightningElement, track, wire } from 'lwc';
import searchbeer from '@salesforce/apex/BeerController.getbeer';
import getCartId from '@salesforce/apex/BeerController.getCartId';
import createItem from '@salesforce/apex/BeerController.createCartItems';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import icon from '@salesforce/resourceUrl/cart1';
import {NavigationMixin} from 'lightning/navigation';

export default class BeerList extends NavigationMixin(LightningElement) {

     beerRecord;
     errors;
     cartId;
     cart=icon;
     itemCount=0;



     connectedCallback()
     {
         this.defaultCart();
     }

     defaultCart()
     {
         getCartId()
         .then(data=>
            {
                const wrap= JSON.parse(data);
                if(wrap)
                {
                    this.itemCount=wrap.count;
                    this.cartId=wrap.caId;
                }
                
            })
            .catch(error=>
                {
                    console.log('Error',error);
                    this.cartId=undefined;
                    this.errors=error;
                })
     }

    @wire(searchbeer)
    beers({error,data})
    {
       // console.log('data',data);
        this.beerRecord=data;
        this.errors=error;
    }

    handlesearch(event)
    {
        const value=event.detail;
       // console.log('val', value);

        searchbeer({
            searchval : value
        })
        .then(result=>
            {
                //console.log( 'RESULT',result);
                this.beerRecord=result;
                this.error=undefined;
            })
        .catch(error=>
            {  // console.log('Error',error);
                this.beerRecord=undefined;
                this.errors=error;

            })
    }

    addTocart(event)
    {
        const beerId=event.detail;
            const selId=this.beerRecord.find(
            record=> record.Id === beerId
        );
        
        createItem({
            cId:this.cartId,
            bId:beerId,
            amount:selId.Price__c
        })
        .then(data=>
            {
                this.itemCount=this.itemCount+1;
                this.dispatchEvent(new ShowToastEvent({
                    'title':'Success!!',
                    'message':selId.Name +' Added to the Cart!!',
                    'variant': 'success',
                }));
            })
        .catch(error=>{
            //console.log(error);
            this.dispatchEvent(new ShowToastEvent({
                'title':'Error!!',
                'message':JSON.stringify(error),
                'variant': 'error',
            }));
        })

    }

    //Handle Navigation to cart detail
    navtocartdetail()
    {
        this[NavigationMixin.Navigate]
        (
            {  type:'standard__navItemPage',
                            attributes: {
                                apiName:'Cart_Detail1'
                            },
                            state:{
                                c__cartId:this.cartId
                            }
                        });
    }

}