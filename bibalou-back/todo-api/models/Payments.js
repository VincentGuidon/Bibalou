var payments = [
  { id : 0, name : 'CB', image : ''},
  { id : 1, name : 'Paypal', image : ''},
  { id : 2, name : '', image : ''},
  { id : 3, name : '', image : ''},
  { id : 4, name : '', image : ''}
];

module.exports = {
  Payments : function() { return payments;},
  findPaymentById : function(tmpId)
  {
    return payments.find(function(iterationID) {
      return iterationID.id == tmpId;
    });
  }
};
