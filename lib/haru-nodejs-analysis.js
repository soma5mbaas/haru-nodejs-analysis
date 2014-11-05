var async = require('async');
var url = require('url');
var RabbitMq = require('./connectors/rabbitmq');

var getHeader = require('haru-nodejs-util').common.getHeader;


module.exports  = function(config){
    var rabbitmq = new RabbitMq(config);

    return function( req, res, next ) {
        var header = getHeader(req);
        header.method = req.method;
        header.url = req.url;
        header.host = req.get('host');

        rabbitmq.publish('analysis', header);

        next();
    }
};