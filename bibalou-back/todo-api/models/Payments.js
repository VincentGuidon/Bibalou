var payments = [
  { id : 0, name : 'CB', image : 'https://phgarin.files.wordpress.com/2014/04/cb_de_paiement.png'},
  { id : 1, name : 'Paypal', image : 'https://www.paypal.com/fr_FR/FR/i/logo/PayPal_mark_180x113.gif'},
  { id : 2, name : 'BitCoin', image : 'https://wemakewebsites.com/sites/default/files/styles/large/public/post_images/headline/bitcoin-logo-with-padding.png?itok=mnfN-yoC'},
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
