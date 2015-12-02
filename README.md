# Parse Connector
[![Build Status](https://travis-ci.org/Reekoh/parse-connector.svg)](https://travis-ci.org/Reekoh/parse-connector)
![Dependencies](https://img.shields.io/david/Reekoh/parse-connector.svg)
![Dependencies](https://img.shields.io/david/dev/Reekoh/parse-connector.svg)
![Built With](https://img.shields.io/badge/built%20with-gulp-red.svg)

Parse Connector plugin for the Reekoh IoT Platform. Integrates a Reekoh Instance with Parse to send push notifications.

## Description
This plugin sends notifications from the Reekoh Instance Parse Push Notification service.

## Configuration
To configure this plugin a Parse account, application and push notification channel is needed in order to provide the following:

1. Application ID - The Parse Application ID to use.
2. JavaScirpt Key -  The Parse Application's corresponding JavaScript Key.

Other Parameters:

1. Default Channels - The default channel(s) to send notificaitons.
2. Default Message -  The default message to send.

These parameters are then injected to the plugin from the platform.

## Sample input data
```
{
    channels: ['test-channel1', 'test-channel2'], //(Array)
    message: 'This is a test message from Parse Connector Plugin.'
}
```