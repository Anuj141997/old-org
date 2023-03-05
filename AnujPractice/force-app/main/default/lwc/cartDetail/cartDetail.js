import { LightningElement , wire, track } from 'lwc';
import { CurrentPageReference , NavigationMixin } from 'lightning/navigation';
import getItems from '@salesforce/apex/BeerController.getItems';
import {deleteRecord} from 'lightning/uiRecordApi';
import coupInfo from '@salesforce/apex/BeerController.coupInfo';
import saveadd from '@salesforce/apex/BeerController.saveadd';
import addDetail from '@salesforce/apex/BeerController.addDetail';
import empty_cart from '@salesforce/resourceUrl/emptyCart';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import createOrder from '@salesforce/apex/BeerController.createOrder';

export default class CartDetail extends NavigationMixin(LightningElement) {

     cartid;
     Items;
     errors;
     totalItems;
     totalAmount = 0.00;
     isCoupon=false;
     applybutton=true;
     couponName;
     couponValue=0;
     isProceed=false;
     addressId;
     totalAdd=0;
     addressDet;
     emptycart=empty_cart;
     istrue=false;
     selectadd;


     addr= {
         City__c:'',
         Country__c:'',
         Postal_Code__c:'',
         State__c:'',
         Street__c:''
     }; 

    @wire(CurrentPageReference)
        setCurrentPageReference(currentPageReference) {
            this.cartid = currentPageReference.state.c__cartId;
            console.log(' Cart Id => ', this.cartid);
        }


    connectedCallback(){
        this.cartItems();
        this.getAddDetails();
    }


    //Address Comp

    backtocart()
    {
        this.isProceed=false;
    }
    handleProceed(){
        this.isProceed=true;
    }

    handleInputChange(ev)
    {
        const name=ev.target.name;
        const val=ev.target.value;
        this.addr[name]=val;
    }

    handleAddressSelect(ev)
    {
        this.addressId = ev.detail;
        
        this.selectadd = this.addressDet.find(
            record => record.Id === this.addressId
        );
    }

    handleSaveAddress()
    {
        console.log(JSON.stringify(this.addr));
     //   console.log(this.addr.State__c.length);
      //  console.log('ji');
        
       if(this.addr.City__c.length>0 && this.addr.Country__c.length>0
             && this.addr.State__c.length>0 && this.addr.Street__c.length>0
              && this.addr.Postal_Code__c.length>0)
        {
            saveadd(
            {
                addressDetails: JSON.stringify(this.addr)

            })
            .then(result=>
                {
                    if(this.addressDet)
                    {
                        this.addressDet.push(result);
                    }else
                    {
                        this.addressDet=[];
                        this.addressDet.push(result);
                    }
                this.totalAdd = 1;
                this.dispatchEvent(new ShowToastEvent({
                    'title':'Saved Successfully',
                    'message': 'Address Saved',
                    'variant': 'success',
                }));  
                })
                .catch(error => {
                    console.error(error);
                });
            }
            else{ this.dispatchEvent(new ShowToastEvent({
                'title':'Empty Field',
                'message': 'Please Fill all the details',
                'variant': 'error',
            }));  }
        
    }
    handleAddNewAddress(){
        this.totalAdd = 0;
       
    }
    cancel() {
        this.totalAdd = 1;
      
    }
    getAddDetails()
    {
        addDetail()
        .then(result=>
            {
                this.addressDet=result;
                this.totalAdd=result.length;
            })
            .catch(error=>
                {
                    console.log('Add eror',error);
                });
    }
    //Address Ends

    // Continue to Beer Shop
    handleContinue(){
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: 'beer_Explorer' // Cart Detail
            },
            state : {
                c__cartId : this.cartId
            }
        });
    }

    //Get Cart Items

    cartItems(){
        getItems({
            caId : this.cartid
        })
        .then(result => {
            console.log(' Cart Items ', result);
            this.Items = JSON.parse(result);
            this.totalItems = this.Items.length;
            this.errors = undefined;

            for ( let i =0 ; i < this.Items.length; i ++) {
                if ( this.Items[i]){
                    this.totalAmount = this.totalAmount + this.Items[i].Total_Amount__c;
                }
            }
        })
        .catch( error => {
            this.carteItems = undefined;
            this.errors = error;
        });
    }

    //Coupon Methods

    handleCoupon(){

        this.isCoupon=true;
        var t=this.totalAmount;
    }
    handleChangeCoupon(ev)
    {
        this.couponName=ev.target.value;
    }
    applyCoupon(ev)
    {
        
        if(!this.couponName)
        {
            alert('Please provide Valid Coupon Name!! ');
            return;
        }
        
        if(this.couponName )
        {
            if(this.totalAmount<1 )
            {
                this.dispatchEvent(new ShowToastEvent({
                    'title':'Error Applying',
                    'message': 'Please Add Items to the Cart!!',
                    'variant': 'error',
                }));  
               
            }
            else
            {
                
                coupInfo({name:this.couponName})
                .then(result=>
                {
                    this.couponValue=result.Price__c;
               
                  this.totalAmount=this.totalAmount-this.couponValue;
                
                    this.applybutton=false;
                    this.istrue=true;
                    this.dispatchEvent(new ShowToastEvent({
                        'title':' Applied Successfully!!',
                        'message': 'You saved '+this.couponValue +' bucks today!!',
                        'variant': 'success',
                        }));
                })
                    .catch(error=>
                         {
                        console.log('Coupon error',error);
                        alert('Please provide valid Coupon Name!!');
                        this.totalAmount=this.totalAmount+ this.couponValue;
                        this.couponValue=0; 
                });      
            
            }
        }
    }

    removeCoupon(ev)
    {
        this.applybutton=true;
        this.istrue=false;
        this.totalAmount=this.totalAmount+this.couponValue;
        this.couponValue=0;
        this.couponName=null;
    }
    //Coupon Ends


    //Delete Cart Items

    handledelete(event)
    {
        const del=event.detail;

        const selitem=this.Items.find(
            item=>item.Id === del
        );

        const indexId=this.Items.indexOf(selitem);
            //console.log('index',indexId);
        deleteRecord(del)
        .then(()=>
        {
            this.Items.splice(indexId,1);
            this.totalAmount=this.totalAmount- selitem.Total_Amount__c;
            this.totalItems=this.Items.length;
        })
        .catch(error=>
            {
                console.log('delete error',error);
            });
    }

    //Place Order

    placeOrder()
    {
        if (!this.selectadd)
        {
            alert('Please select a Address for delivery');
            return;
         }
        createOrder({
            crtId: this.cartid,
            addId: this.addressId,
            amount: this.totalAmount
        })
            .then(result => {
                this.dispatchEvent(new ShowToastEvent({
                    'title': ' Order Placed Successfully!!',
                    'message': 'Order ' + result.Name + ' has been succesfully placed',
                    'variant': 'success',
                }));
                
                this[NavigationMixin.Navigate]({
                    type: 'standard__navItemPage',
                    attributes:
                    {
                        apiName: 'Order_Detail'
                    },
                    state:
                    {
                        c__orderId: result.Id
                    }
                }, true);

            })
            .catch(error => {
                console.log('placed error', error);
            });
        
       
    }
}