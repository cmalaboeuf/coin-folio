/* const key          = 'wGGFQt/p2fZIyoWJAsqLt41y5XlutLhtWrkSc0cuEnmNKMpMbHaXUTj5'; // API Key
const secret       = 'BcLH/uP6UqArwTT80uG9IhCDGyj98UmScVHT2TKpCEu4N4jFcM6v1W3S54owJyweowoEgV1nrY/NfoDuHeH7IQ=='; // API Private Key
const KrakenClient = require('kraken-api');
const kraken       = new KrakenClient(key, secret);

(async () => {
	// Display user's balance
	console.log(await kraken.api('Balance'));

	// Get Ticker Info
  //console.log(await kraken.api('Ticker', { pair : 'XXBTZUSD' }));

  console.log(await kraken.api('AssetPairs'));
})(); */

let Adapter = require('./adapter');
const KrakenClient = require('kraken-api');

function KrakenAdapter(key,secret){

  let client = new KrakenClient(key, secret);

  this.getBalance = async() => {
    var res =  await client.api('Balance');
     return Object.keys(res.result)
    // iterate over them and generate the array
    .map(function(k) {
      // generate the array element
      return {"id": k,val : res.result[k]};
    });
  };
}

/* var krakenAdp = new KrakenAdapter('wGGFQt/p2fZIyoWJAsqLt41y5XlutLhtWrkSc0cuEnmNKMpMbHaXUTj5','BcLH/uP6UqArwTT80uG9IhCDGyj98UmScVHT2TKpCEu4N4jFcM6v1W3S54owJyweowoEgV1nrY/NfoDuHeH7IQ==')
var plop = async () => {
  console.log(await krakenAdp.getBalance())
} */


//plop();
//.then((data)=> {console.log(data)});


module.exports = KrakenAdapter;
