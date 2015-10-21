'use strict';




function getCustomerItemByMacId(macId, callback) {

    //TODO: Make DB rest service call to retrieve Customer and Item details.

    var res = {
        body: {
            customer: {
                customer_id: '12345',
                first_name: 'Muthukumar',
                last_name: 'Sudalaiyandi',
                email: 'pearlurpal@gmail.com',
                phone_number: '8562783474',
                account_id: '98765'
            },
            device: {
                device_id: '2345',
                mac_id: '12:23:34:56:67',
                item_id: '2468',
                customer_id: '12345',
                quantity: '1'
            }
        }
    };

    var customerItem = {
        customerId: res.body.customer.customer_id,
        itemId: res.body.device.item_id
    };

    callback(null, customerItem);
}

function getItemByItemId (itemId, callback) {

    //TODO: Make DB rest service call to retrieve Customer and Item details.

    var res = {
        body: {
            item_id: '2468',
            item_upc: '67890',
            item_name: 'Coke',
            item_desc: 'Coke 2 liters'
        }
    };

    var item = res.body;

    callback(null, item);
}





module.exports = {

    initiateOrder : function (req, res, next) {

       getCustomerItemByMacId(req.body.mac_id, function (err, customerItem) {

           console.log('customerItem : ' + JSON.stringify(customerItem));

           getItemByItemId(customerItem.itemId, function (err, item) {

               console.log('item : ' + JSON.stringify(item));

               var initiateOrderRequest = {
                   customer_id: customerItem.customerId,
                   item_upc: item.item_upc
               };

               //TODO: Make Order rest service call to send order details.
               next(null, initiateOrderRequest);

           });
       });
    }
};
