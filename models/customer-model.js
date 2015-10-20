/**
 * Created by msudalaiyandi.
 */

'use strict';

var _ = require('underscore');

function getItems () {
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



module.exports = {

    loadData: function (req) {
        var registrationData = {},
            states=['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'],
            months = [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ],
            expMonths = [],
            expYears = ['2015', '2016', '2017', '2018', '2019', '2020'];

        // Expiration Months
        _.each(months, function (month, index) {
            expMonths.push({
                month: index+1,
                name: month
            });
        });

        registrationData = {
            items: getItems(),
            states: states,
            expMonths: expMonths,
            expYears: expYears
        };

        _.extend(req.model, {data: registrationData});

    }
};