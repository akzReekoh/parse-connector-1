'use strict';

const APP_ID = '5GwhgEyOkTX2ebfN8ULSh23HArd1BU8WNxt6NEQ7',
    JAVASCRIPT_KEY = '8FEIc5Pq7BpCFDuiyLz59sYT88NzbLoXDuzoRzlQ';

var cp     = require('child_process'),
	assert = require('assert'),
	connector;

describe('Connector', function () {
	this.slow(5000);

	after('terminate child process', function (done) {
		this.timeout(7000);
        setTimeout(function(){
            connector.kill('SIGKILL');
			done();
        }, 5000);
	});

	describe('#spawn', function () {
		it('should spawn a child process', function () {
			assert.ok(connector = cp.fork(process.cwd()), 'Child process not spawned.');
		});
	});

	describe('#handShake', function () {
		it('should notify the parent process when ready within 5 seconds', function (done) {
			this.timeout(5000);

			connector.on('message', function (message) {
				if (message.type === 'ready')
					done();
			});

			connector.send({
				type: 'ready',
				data: {
					options: {
						app_id: APP_ID,
						javascript_key: JAVASCRIPT_KEY,
                        default_channels : 'default-channel',
                        default_message : 'This is a default message.'
					}
				}
			}, function (error) {
				assert.ifError(error);
			});
		});
	});

	describe('#data', function (done) {
		it('should process the data', function () {
			connector.send({
				type: 'data',
				data: {
					channels: 'test-channel1, test-channel2',
                    message: 'This is a test message from Parse Connector Plugin.'
				}
			}, done);
		});
	});
});