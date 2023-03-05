public with sharing class BeerController {
    
  

    public static String genCartId()
    {
        String c='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_';
        Integer pos;
        Integer len=30;
        String res='';
        for(Integer i=0;i<=len;i++)
        {
            pos=Integer.valueOf(String.valueOf(Math.roundToLong(c.length()*Math.random())))-1;
            res +=c.substring(pos,pos+1);
        }
        return res;
    }

    
    public static String getCouponInfo(String name)
    {
        Coupon__c co= [SELECT Id,Name,Price__c FROM Coupon__c 
                    WHERE Expired__c=false AND Name=:name WITH SECURITY_ENFORCED];
            return co.Id;
    }
    
    @AuraEnabled(cacheable=false)
    public static string getCartId()
    {
        List<Cart__c> cartInfo=[SELECT Id,Name 
                                FROM Cart__c
                                WHERE  User__c=: UserInfo.getUserId()
                                AND Cart_Status__c='Open'
                                AND Is_Active__c=true  WITH SECURITY_ENFORCED];
            if(cartInfo!=null && cartInfo.size()>0)
            {
                List<Cart_Item__c> cartItems=new List<Cart_Item__c>();
                
                cartItems=[SELECT Id,Name,Beer__c,Cart__c,Item_Quantity__c
                                        ,Item_Amount__c FROM Cart_Item__c 
                                        WHERE Cart__c =: cartInfo.get(0).Id];

                   // String cartItem='';
                   Decimal dcount=0;
                   for(Cart_Item__c cc: cartItems)
                   {
                       dcount=dcount+cc.Item_Quantity__c;
                   }
                    CartWrapper c=new CartWrapper();
                    c.caId=cartInfo.get(0).Id;
                    c.count=dcount;
                    c.items=cartItems;

                    return JSON.serialize(c);
            }
            else
            {
                Cart__c dcart=new Cart__c();
                String coupId= getCouponInfo('Default');
                dcart.Cart_Id__c= genCartId();
                dcart.Cart_Status__c='Open';
                dcart.Is_Active__c=true;
                dcart.Coupon__c= coupId;
                dcart.User__c= UserInfo.getUserId();
                insert dcart;
                
                 CartWrapper c=new CartWrapper();
                 c.caId=dcart.Id;
                 c.count=0;
                 c.items=null;
                return JSON.serialize(c);   
            }
    }
    @AuraEnabled(cacheable=true)
    public static List<Beer__c> getbeer(String searchval)
    {
        String s= '%'+searchval+'%';
        String q='';

        if(searchval != null)
        {
            q= 'Select Id , Id__c, brewery_id__c, Name,Price__c,brewery_Name__c,Alcohol__c,Image__c,Remaining_Quantity__c,Tags__c,Total_Quantity__c FROM Beer__c Where Name like:s LIMIt 50';
        }
        else
        {
            q='Select Id ,Id__c ,brewery_id__c ,Name ,Price__c ,brewery_Name__c,Alcohol__c,Image__c,Remaining_Quantity__c,Tags__c,Total_Quantity__c FROM Beer__c  LIMIt 50';
        }

        List<Beer__c> beer=Database.query(q);
        return beer;
        
        // return [ Select Id__c,Name,Price__c,brewery_Name__c,Alcohol__c from Beer__c 
                // Where Name like:src];
    }

    @AuraEnabled
    public static String createCartItems(String cId, String bId, Decimal amount)
    {
        Cart_Item__c cartItem=new Cart_Item__c();
        Map<Id,Cart_Item__c> c=getCartItems(cId);
        if(c.containsKey(bId))
        {
            cartItem = c.get(bId);
            cartItem.Item_Amount__c= cartItem.Item_Amount__c+ amount;
            cartItem.Item_Quantity__c =cartItem.Item_Quantity__c+1;
            update cartItem;
        }
        else
        {
            cartItem.Beer__c=bId;
            cartItem.Cart__c=cId;
            cartItem.Item_Quantity__c=1;
            cartItem.Item_Amount__c= amount;
            insert cartItem;
        }
       
        return cartItem.Id;
    }

    public static Map<Id, Cart_Item__c> getCartItems(String carId)
    {
        Map<Id,Cart_Item__c> cartMap=new Map<Id,Cart_Item__c>();
        for(Cart_Item__c c:[SELECT Id,Beer__c,Name,Cart__c,
                                Item_Quantity__c,Item_Amount__c 
                                FROM Cart_Item__c 
                                WHERE Cart__c=:carId ])
        {
            cartMap.put(c.Beer__c,c);
        }
        return cartMap;
    }

    @AuraEnabled
    public static OrderWrapper orderDet(String ordId)
    {
        Order__c oInfo=[SELECT Id,Name,User__c,Shipping_Address__c,
                                subTotal__c,
                                Shipping_Address__r.Street__c, Shipping_Address__r.City__c,
                                Shipping_Address__r.Country__c,
                                Shipping_Address__r.State__c,
                                Shipping_Address__r.Postal_Code__c,
                                (
                                    SELECT Id, Name,Beer__r.Name,Ordered_Quantity__c,
                                    Item_Price__c FROM Order_Items__r
                                ) FROM  Order__c WHERE Id =: ordId ];

            OrderWrapper wrap=new OrderWrapper();
            wrap.order=oInfo;
            wrap.orderItems=oInfo.Order_Items__r;

            return wrap;

    }


    @AuraEnabled
    public static String getItems(String caId)
    {
        List<Cart_Item__c> it= [SELECT Id,Name,Total_Amount__c,Beer__c,
                                Cart__c,Item_Quantity__c,Item_Amount__c,
                                Beer__r.Name FROM Cart_Item__c
                                WHERE Cart__c=: caId];

            return JSON.serialize(it);
    }

    @AuraEnabled
    public static Coupon__c coupInfo(String name)
    {
        Coupon__c c=getCoupInfo(name);
        return c;
    }

    public static Coupon__c getCoupInfo(String name)
    {
        Coupon__c c=[SELECT Id,Name,Price__c FROM Coupon__c WHERE
                        Expired__c= false AND (Remaining_Quantity__c>0 OR Name='Default') 
                        AND Name =: name];

        return c;
    }

    @AuraEnabled
    public static Address_Book__c  saveadd(String addressDetails)
    {
        Address_Book__c addInfo=  (Address_Book__c)JSON.deserialize(addressDetails,
                                                Address_Book__c.class);
                                                
            addInfo.User__c=UserInfo.getUserId();
            
            insert addInfo;
            return addInfo;

    }

    @AuraEnabled
    public static Order__c createOrder(String crtId,String addId, Decimal amount)
    {
        Order__c ord=new Order__c();
        ord.User__c=UserInfo.getUserId();
        ord.Cart__c=crtId;
        ord.Shipping_Address__c=addId;
        ord.subTotal__c=amount;
        insert ord;

        List<Cart_Item__c> caitem= (List<Cart_Item__c>)JSON.deserialize( getItems(crtId),
                                            List<Cart_Item__c>.class);

        List<Order_Item__c> orlist= new List<Order_Item__c>();
        For(Cart_Item__c c:caitem)
        {
            Order_Item__c oitem=new Order_Item__c();
            oitem.Beer__c=c.Beer__c;
            oitem.Related_order__c=ord.Id;
            oitem.Ordered_Quantity__c=c.Item_Quantity__c;
            oitem.Item_Price__c=c.Item_Amount__c; 
            orlist.add(oitem);
        }
        insert orlist;

        Cart__c cart= new Cart__c();
        cart.Id=crtId;
        cart.Cart_Status__c= 'Closed';
        cart.Is_Active__c =false;
        update cart;


        Order__c o= [SELECT Id,Name FROM Order__c WHERE Id =:ord.Id];
        return o;
    }


    @AuraEnabled
    public static List<Address_Book__c> addDetail()
    {
        return [SELECT Id,City__c,Country__c,Postal_Code__c,State__c,
                            Street__c,User__c FROM Address_Book__c
                            WHERE User__c!=null AND User__c=: UserInfo.getUserId()];
    }

    public class CartWrapper
    {
        @AuraEnabled
        public String caId {get; set;}
        @AuraEnabled
        public Decimal count {get;set;}
        @AuraEnabled
        public List<Cart_Item__c> items {get; set;}
    }

    public class OrderWrapper
    {
        @AuraEnabled
        public Order__c order {get; set;}

        @AuraEnabled
        public List<Order_Item__c> orderItems {get; set;}
    }


}