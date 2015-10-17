/**
 * Created by msudalaiyandi
 */
'use strict';

module.exports = {

    /**
     * HTML and JSON render
     */
    renderHTMLandJSON: function (req, res) {
        res.format({
            html: function () {
                res.render(req.model.viewName, req.model);
            },
            json: function () {
                res.json(req.model);
            }
        });
    },

    /**
     * JSON render
     */
    renderJSON: function (req, res) {
        res.json(req.model);
    }

};
