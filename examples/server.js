const escpos = require('escpos');
escpos.USB = require('escpos-usb')
escpos.Server = require('../packages/server/server')
const device = new escpos.USB(0x04b8, 0x0202);
const server = new escpos.Server(device);
const printer = new escpos.Printer(device);


  server.listen(6000, err => {
    console.log('Your printer is running at', server.address().port);
    setInterval(() => getAwaitingOrders(), 5000)

    function getAwaitingOrders() {
      console.log('AGAIN');
      try {
        //const order = await (await axios.get())
        device.open(function (err) {

          printer
            .font('b')
            .align('ct')
            .style('b')
            .size(.01, .01)
            .text('yo')
            .text('order.id')

            .qrimage('https://github.com/song940/node-escpos', function (err) {
              this.cut();
              this.close();
            });

        });

      }
      catch (e) {
        console.log('NOGO', e);
      }
    }
  })

