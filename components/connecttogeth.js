var noflo = require('noflo');

exports.getComponent = function() {
  var c = new noflo.Component();
  c.description = 'Connect to Geth';
  c.icon = 'forward';
  c.inPorts.add('in', {
    datatype: 'all',
    description: 'Empty Input'
  });
  c.outPorts.add('connection', {
    datatype: 'all'
  });
  c.outPorts.add('displayout', {
    datatype: 'all'
  });
  noflo.helpers.WirePattern(c, {
    "in": ['in'],
    out: ['connection','displayout'],
	displayout: 'displayout',
    forwardGroups: true,
    async: true
  }, function(data, groups, out, callback) {
    // do something with data
    // send output
	var Web3 = require('web3');
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    out.connection.send(web3);
	var outputOnScreen = "Forwarded etherium connection. Accounts: \n";
	var accounts = web3.eth.accounts;
	if (!!accounts) {
		for (let i=0; i!= accounts.length;i++) {
			let acc = accounts[i];
			outputOnScreen = outputOnScreen+ (i+1)+": " + acc+ " balance: "+ web3.eth.getBalance(acc)+'\n';
		}
	}
	out.displayout.send(outputOnScreen);
    // tell WirePattern we are done
    return callback();
  });
  return c;
};