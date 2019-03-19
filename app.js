const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const argv= yargs
  .options({
    a:{
      demand: true,
      alias: 'address',
      describe: 'Give an address to fetch weather data.',
      string: true
    }
  })
  .help()
  .alias('help','h')
  .argv;
  // console.log(argv.p);;
var addr;
addr=encodeURIComponent(argv.a);
//geocode.sendRequest(addr);
geocode.sendRequest(addr,(lat,long,addr)=>{
  //console.log(`wing commander latitude is ${lat} and longitude is ${long} `)
  const url_ds=`https://api.darksky.net/forecast/8cf860ec82128b45680dc781297492a8/${lat},${long}`;
  request({url:url_ds,json:true},(error, response, body)=>{
    // const data=JSON.parse(body.response);
    if(error)
      console.log('Error fetching weather data: 101 Darksky error');
    else{
      console.log(`\n*******************************************************************`);
      console.log(`Hi User, here is the requested weather report for ${addr}`);
      console.log(`*******************************************************************\n`);
      console.log(`Weather Condition: ${body.currently.summary}`);
      console.log(`Temperature: ${body.currently.temperature} Degree F`);
      console.log(`Chances of Rain: ${body.currently.precipProbability}%`)
      console.log('Powered by DarkSky: https://darksky.net/poweredby/');
      console.log(`*******************************************************************`);
    }  
    
  });
});


// const url_ds='https://api.darksky.net/forecast/8cf860ec82128b45680dc781297492a8/37.8267,-122.4233';
// request({url:url_ds,json:true},(error, response, body)=>{
//   // const data=JSON.parse(body);
//   console.log('Hi User, here is the requested weather report');
//   console.log(`Weather Condition: ${body.currently.summary}`);
//   console.log(`Temperature: ${body.currently.temperature} Degree F`);
//   console.log(`Chances of Rain: ${body.currently.precipProbability}%`)
//   console.log('Powered by DarkSky: https://darksky.net/poweredby/');
// });
