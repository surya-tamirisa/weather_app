// console.log('Starting Helper....');

const request = require('request');

var sendRequest=(addr,callback)=>{
  var lat;var long;var addr;
  // console.log('inside the send req function ' + addr);
  request({
    url:'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyC_7baHao-jSB2GQbROtFzLEOnsuysjvGw&address='+addr,
    json:true
  },(error,response,body)=>{
    // console.log(JSON.stringify(body,undefined,2));
    if(error){
      console.log('Unable to connect to google servers');
      // return undefined;
    }else if (body.status==="ZERO_RESULTS") {
      console.log('Unable to find the address.');
      // return undefined;
    }else if (body.status==='OK') {
      // console.log(`Address: ${body.results[0].formatted_address}`);
      // console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
      // console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
      addr=body.results[0].formatted_address;
      lat=body.results[0].geometry.location.lat;
      long=body.results[0].geometry.location.lng;
      // console.log(addr);
      // console.log(lat);
      // console.log(long);
      var res_arr= [];
      res_arr.push(addr)
      res_arr.push(lat)
      res_arr.push(long);
    //   var obj={
    //     addr,
    //     lat,
    //     long
    //   }
    // // console.log(obj);
    // return obj;
    }
    else{
      console.log("Something went terribly wrong");
    }
  });
  setTimeout(()=>{
    callback(lat,long,addr);
  },1000);
  
};

module.exports={
  sendRequest
};
