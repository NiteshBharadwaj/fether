var noflo = require('noflo');

exports.getComponent = function() {
  var c = new noflo.Component();
  c.description = 'Make Transaction';
  c.icon = 'forward';
  c.inPorts.add('data', {
    datatype: 'all',
    description: 'Web3 Connection'
  });
  c.inPorts.add('start', {
    datatype: 'all',
    description: 'Start Display'
  });
  c.outPorts.add('transaction', {
    datatype: 'all'
  });
  c.outPorts.add('done', {
    datatype: 'all'
  });
  noflo.helpers.WirePattern(c, {
    "in": ['data','start'],
    out: ['transaction','done'],
    forwardGroups: true,
    async: true
  }, function(data, groups, out, callback) {
    // do something with data
    // send output
    // tell WirePattern we are done
		if (data.data && data.start) {
			console.log(data.data);
			if (data.data) out.done.send(data.data);
			else out.done.send(1);
		}
    return callback();
  });
  return c;
};