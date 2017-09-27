//e1c46b39fc49e81a30a0bb32fb377f6d7f3c51318c3eb58000643d07bf7a8c15e0c92f19082209e18178ca23ef59c0d0a7ef1392d2b10ad12ff75e77e639c970
//USIUZT1P-UK4SSLWG-T23WGCTN-ZSDDBMLW


/* let key = 'USIUZT1P-UK4SSLWG-T23WGCTN-ZSDDBMLW';
let secret = 'e1c46b39fc49e81a30a0bb32fb377f6d7f3c51318c3eb58000643d07bf7a8c15e0c92f19082209e18178ca23ef59c0d0a7ef1392d2b10ad12ff75e77e639c970';
const Poloniex = require('poloniex-api-node');
let poloniex = new Poloniex(key, secret, { socketTimeout: 15000 });

poloniex.returnLoanOrders('BTC', null, function (err, ticker) {
  //if (!err) console.log(ticker);
});

poloniex.returnBalances().then((balances)=>{
  //console.log(balances);
  let balancesClean = new Array();
  for(let key in  balances){
    if (balances[key]> 0 ) {
      balancesClean.push ({ id :key,val:balances[key]});

    }
  }
  console.log(balancesClean);

}).catch((err)=>{
  console.log(err);
}); */

var Adapter = require('./Adapter');
const Poloniex = require('poloniex-api-node');

function PoloniexAdapter(key,secret){
  const client = new Poloniex(key, secret, { socketTimeout: 15000 });
  console.log("plop");
  this.getBalance = async ()=> {
    console.log("plop2");
    let balances = await client.returnBalances();
    let balancesClean = new Array();
    for(let key in  balances){
      if (balances[key]> 0 ) {
        balancesClean.push ({ id :key,val:balances[key]});
      }
    }
    console.log("plop2");
    return Promise.resolve(balancesClean);
  }
}

module.exports= PoloniexAdapter;

/* let polo = new PoloniexAdapter('USIUZT1P-UK4SSLWG-T23WGCTN-ZSDDBMLW','e1c46b39fc49e81a30a0bb32fb377f6d7f3c51318c3eb58000643d07bf7a8c15e0c92f19082209e18178ca23ef59c0d0a7ef1392d2b10ad12ff75e77e639c970')

let plop = async ()=> {
  console.log(await polo.getBalance());
};

plop(); */

