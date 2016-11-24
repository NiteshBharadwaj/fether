var noflo = require('noflo');

exports.getComponent = function() {
  var c = new noflo.Component();
  c.description = 'Puts transaction on block chain';
  c.icon = 'forward';
  c.inPorts.add('in', {
    datatype: 'all',
    description: 'Transaction and Web3'
  });
  c.outPorts.add('out', {
    datatype: 'all'
  });
  noflo.helpers.WirePattern(c, {
    "in": ['in'],
    out: 'out',
    forwardGroups: true,
    async: true
  }, function(data, groups, out, callback) {
    // do something with data
    // send output
	var web3 = data.web3;
	var transactionCode = data.transactionCode;
	var plainTransaction = transactionCode.plainTransaction;
	//web3.personal.unlockAccount(web3.eth.accounts[0],'SmartNodeProtocol1');
	//web3.personal.unlockAccount(web3.eth.accounts[1],'SmartNodeProtocol2');
	if (!!plainTransaction) {
		web3.eth.sendTransaction(plainTransaction);
	}
    out.send("Finished sending transaction. Start miner or wait for transaction to be mined");
    // tell WirePattern we are done
    return callback();
  });
  return c;
};