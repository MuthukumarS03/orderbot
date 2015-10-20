/**
 * Created by msudalaiyandi.
 */

'use strict';

module.exports = {

    getItems: function () {


        //TODO: Fetch items list from DB rest service

        var itemsList = [
            {
                "item_id": "1",
                "item_upc": "123",
                "item_name": "COKE",
                "item_desc": "BLACK"
            },
            {
                "item_id": "2",
                "item_upc": "1234",
                "item_name": "FANTA",
                "item_desc": "ORANGE"
            },
            {
                "item_id": "3",
                "item_upc": "12345",
                "item_name": "SPRITE",
                "item_desc": "GREEN"
            }
        ];

        return itemsList;


    }

};