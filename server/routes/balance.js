let PoloniexAdapter = require('../adapter/poloniex');
let KrakenAdapter = require('../adapter/kraken');
let config = require('../config/' + process.env.NODE_ENV + '.json');

let balanceApi = {
  getAll : async (req,res)=>{
    var krakenAdp = new KrakenAdapter(config.kraken.apikey, config.kraken.secret);

    let polo = new PoloniexAdapter(config.poloniex.apikey, config.poloniex.secret);

    var makeRequest = async () => {
      let res1 = await krakenAdp.getBalance();
      let res2 = await polo.getBalance();
      return [...res1,...res2];
    };
    res.send({data : await makeRequest()});
  }
};

module.exports = balanceApi;
