/**
 * Created by msudalaiyandi
 */


module.exports = function () {

    return function (req, res, next) {

        //Initialize req.model
        req.model = req.model || {};

        next();
    }
};