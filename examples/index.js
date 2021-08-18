'use strict';
const { default: axios } = require('axios');
const escpos = require('escpos');
escpos.USB = require('escpos-usb')
const device  = new escpos.USB(0x04b8, 0x0202);
// const device  = new escpos.RawBT();
// const device  = new escpos.Network('localhost');
// const device  = new escpos.Serial('/dev/usb/lp0');
const printer = new escpos.Printer(device);
getAwaitingOrders();
function getAwaitingOrders() {
  try {
    //const order = await (await axios.get())
    device.open(function(err){

      printer
      .font('b')
      .align('ct')
      .style('b')
      .size(.01, .01)
      .text('yo')
      .text('order.id')
      .barcode('1234567', 'EAN8')
      
      .qrimage('https://github.com/song940/node-escpos', function(err){
        this.cut();
        this.close();
      });
    
    });

  }
  catch(e) {
    console.log('NOGO', e);
  }
}

