var noflo = require('noflo');

exports.getComponent = function() {
  var c = new noflo.Component();
  c.description = 'Make Transaction';
  c.icon = 'forward';
  c.inPorts.add('connection', {
    datatype: 'all',
    description: 'Web3 Connection'
  });
  c.inPorts.add('amount', {
    datatype: 'all',
    description: 'Ether'
  });
  c.outPorts.add('transaction', {
    datatype: 'all'
  });
  c.outPorts.add('displayout', {
    datatype: 'all'
  });
  noflo.helpers.WirePattern(c, {
    "in": ['connection','amount'],
    out: ['transaction','displayout'],
    forwardGroups: true,
    async: true
  }, function(data, groups, out, callback) {
    // do something with data
    // send output
	var amountD = data.amount;
	if (!amountD) throw "Enter amount > 0"
	var amountT = "ether";
	var web3 = data.connection;
	var amount = web3.toWei(amountD, amountT);
	var sender = web3.eth.accounts[0];
	var receiver = web3.eth.accounts[1];
	var transactionCode = {plainTransaction: {from:sender, to:receiver, value: amount}, toCompileTransaction:null};
	var result = {transactionCode: transactionCode, web3:web3};
	out.displayout.send('Sending transaction amount: '+ amountD + ' ether');
	out.transaction.send(result);
    // tell WirePattern we are done
    return callback();
  });
  return c;
};