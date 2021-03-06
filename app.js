'use strict';

var platform = require('./platform'),
    isPlainObject = require('lodash.isplainobject'),
    isEmpty = require('lodash.isempty'),
    isArray = require('lodash.isarray'),
    async = require('async'),
    trim = require('lodash.trim'),
    map = require('lodash.map'),
	Parse, config;

let sendData = (data) => {
    if(isEmpty(data.channels))
        data.channels = config.channels;

    if(isEmpty(data.message))
        data.message = config.message;

    Parse.Push.send({
        channels: map(data.channels.split(','), trim),
        data: {
            alert: data.message
        }
    }, {
        success: function() {
            platform.log(JSON.stringify({
                title: 'Parse push notification sent.',
                data: data
            }));
        },
        error: function(error) {
            console.error(error);
            platform.handleException(error);
        }
    });
};
platform.on('data', function (data) {
    if(isPlainObject(data)){
        sendData(data);
    }
    else if(isArray(data)){
        async.each(data, (datum) => {
            sendData(datum);
        });
    }
    else
        platform.handleException(new Error('Invalid data received. Must be a valid Array/JSON Object. Data ' + data));
});

platform.once('close', function () {
    platform.notifyClose();
});

platform.once('ready', function (options) {
    var domain = require('domain'),
        d = domain.create();

    d.once('error', function(error){
        console.error(error);
        platform.handleException(error);
        d.exit();
    });

    d.run(function(){
        Parse = require('parse/node');
        Parse.initialize(options.app_id, options.javascript_key);

        config = {
          channels : options.default_channels,
            message : options.default_message
        };

        platform.log('Parse Connector Initialized.');
        platform.notifyReady();
        d.exit();
    });
});