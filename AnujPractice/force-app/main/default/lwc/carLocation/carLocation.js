import { LightningElement, track } from 'lwc';
import {createMessageContext,APPLICATION_SCOPE,subscribe,unsubscribe} from 'lightning/messageService';
import msg from '@salesforce/messageChannel/msgChannel__c';
import LL from '@salesforce/resourceUrl/Leaflet';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CarLocation extends LightningElement {

   context= createMessageContext();
   @track car;    
    subscription = null;
    leafletLoaded = false;
    leafletMap;


    renderedCallback()
    {
        if(!this.leafletLoaded){
            Promise.all([
                loadStyle(this, LL+'/leaflet.css'),
                loadScript(this, LL+'/leaflet-src.js')
            ]).then(() =>{
                this.leafletLoaded = true;
            }).catch((error => {
                this.dispatchEvent(new ShowToastEvent({
                    'title': 'Error!!',
                    'message': error.body.message,
                    'variant': 'error',
                }));
            } ));
        }
     }

    disconnectedCallback()
    {
        this.unsubscribeToMessageChannel();
     }


    connectedCallback() {
        // if (!this.leafletload) {
          this.subscribeMC();
         
    }

    subscribeMC() {
        if (!this.subscription) {
                    
            this.subscription = subscribe(this.context, msg, (message) => {
                this.handlemsg(message);
            }, { scope: APPLICATION_SCOPE });
          
            
        }
    }
    handlemsg(message)
    {
        this.car = message.recordId;
        console.log('lms location', this.car);
         if(this.leafletLoaded){
            if(!this.leafletMap){			
                const map = this.template.querySelector('.map');
                if(map){
                    this.leafletMap = L.map(map, {zoomControl : true} ).setView([42.356045, -71.085650], 13);
                    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {attribution : 'Tiles For Rent A Car'}).addTo(this.leafletMap);
                }
            }
                if(this.car){
                    const location = [this.car.Geolocation__Latitude__s, this.car.Geolocation__Longitude__s];

                    const leafletMarker = L.marker(location);
                    leafletMarker.addTo(this.leafletMap);
                    this.leafletMap.setView(location);
                }
            
        }
        
    }
     unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    } 
               
    get hasCar() {
        
        if (this.car)
        {
            return 'slds-is-expanded';
        }
        return 'slds-is-collapsed';
    }

}