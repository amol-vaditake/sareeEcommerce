const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_EMAIL_ADDRESS,
    pass: process.env.SENDER_EMAIL_PASSWORD,
  },
  requireTLS: true,
});

function calculateTotal(allProduct, mode) {

    console.log("All items", allProduct);

    let productTotal = 0;
    allProduct.map((product) => (
            productTotal += (product.price * product.quantity)
    ));

    let orderTotal = productTotal;

    let codCharge = 0;
    let deliveryCharge = 0;

    if (mode === 'cod') {
        codCharge = 100;
        orderTotal += codCharge;
    } else {
        codCharge = 'N/A';
    }

    if (productTotal <= 499) {
        deliveryCharge = 100;
        orderTotal += deliveryCharge;
    } else {
        deliveryCharge = 0;
    }

    return {
        codCharge,
        deliveryCharge,
        productTotal,
        orderTotal,
    }
}

const sendOrderEmail = (
  _id,
  name,
  email,
  address,
  phone,
  transactionId,
  allProduct,
  mode,
) => {
  console.log("Sending E-mail...");

  const { codCharge, deliveryCharge, productTotal, orderTotal } = calculateTotal(allProduct, mode);

  const htmlToSend = `
        <!DOCTYPE html>
        <html>

        <head>
        <style>
        table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        td,
        th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }

        tr:nth-child(even) {
            background-color: #dddddd;
        }
        </style>
        </head>

        <body>
        <h2>Hi ${name}</h2>
        <h3>Your Order has been successfully placed with following details.</h3>
        <table>
        <tbody>
            <tr>
                <td>Order Name</td>
                <td>${_id}</td>
            </tr>
            <tr>
                <td>Customer Name</td>
                <td>${name}</td>
            </tr>
            <tr>
                <td>Customer Address</td>
                <td>${address}</td>
            </tr>
            <tr>
                <td>Customer Mobile #</td>
                <td>${phone}</td>
            </tr>
            <tr>
                <td>Transaction ID</td>
                <td>${transactionId}</td>
            </tr>
        </tbody>
        </table>
        <h3>Item Wise Details</h3>
        <table>
        <thead>
            <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>SubTotal</th>
            </tr>
        </thead>
        <tbody>
            ${allProduct
                .map(
                (p) =>
                    `<tr>
                    <td>${p.name}</td>
                    <td>${p.quantity}</td>
                    <td>${p.price}</td>
                    <td>${p.price * p.quantity}</td>
            </tr>`
                )
                .join("")}
        </tbody>
        </table>
        <br />
        <h3>Invoice Info</h3>
        <table>
        <thead>
            <tr>
                <th>Mode of Payment</th>
                <th>Delivery charge</th>
                <th>COD Charge</th>
                <th>Product Total</th>
                <th>Final Amount</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>${mode === 'cod' ? 'Cash on delivery' : 'Online'}</td>
                <td>${deliveryCharge}</td>
                <td>${codCharge}</td>
                <td>${productTotal}</td>
                <td>${orderTotal}</td>
            </tr>
        </tbody>
        </table>
        <br />
        <div>With Regards</div>
        <div>House Of Miani</div>

        </body>

        </html>`;

  console.log('HTML:', htmlToSend);

  var mailOptions = {
    from: `\"House Of Miani \" <${process.env.SENDER_EMAIL_ADDRESS}>`,
    to: email,
    subject: "House Of Miani New Order",
    html: htmlToSend,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    console.log("Processing!");
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const sendOrderEmailToAdmin = (_id, name, address, phone, transactionId, allProduct, mode) => {
    console.log('Sending E-mail...');
    
    const { codCharge, deliveryCharge, productTotal, orderTotal } = calculateTotal(allProduct, mode);
    
    var mailOptions = {
        from: `\"House Of Miani\" <${process.env.SENDER_EMAIL_ADDRESS}>`,
        to: process.env.ADMIN_EMAIL_ADDRESS,
        subject: 'House Of Miani New Order',
        html: `
<!DOCTYPE html>
<html>
<head>
    <style>
        table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }
        td,
        th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }
        tr:nth-child(even) {
            background-color: #dddddd;
        }
    </style>
</head>
<body>
    <h2>Hi Admin,</h2>
    <h3>A new order has been placed with following details.</h3>
    <table>
        <tbody>
            <tr>
                <td>Order Name</td>
                <td>${_id}</td>
            </tr>
            <tr>
                <td>Customer Name</td>
                <td>${name}</td>
            </tr>
            <tr>
                <td>Customer Address</td>
                <td>${address}</td>
            </tr>
            <tr>
                <td>Customer Mobile #</td>
                <td>${phone}</td>
            </tr>
            <tr>
                <td>Transaction ID</td>
                <td>${transactionId}</td>
            </tr>
        </tbody>
    </table>
    <h3>Item Wise Details</h3>
    <table>
        <thead>
            <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>SubTotal</th>
            </tr>
        </thead>
        <tbody>
            ${allProduct.map(p => (
            `<tr>
                <td>${p.name}</td>
                <td>${p.quantity}</td>
                <td>${p.price}</td>
                <td>${p.price * p.quantity}</td>
            </tr>`
        )).join('')}
        </tbody>
    </table>
    <br />
    <h3>Invoice Info</h3>
    <table>
    <thead>
        <tr>
            <th>Mode of Payment</th>
            <th>Delivery charge</th>
            <th>COD Charge</th>
            <th>Product Total</th>
            <th>Final Amount</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>${mode === 'cod' ? 'Cash on delivery' : 'Online'}</td>
            <td>${deliveryCharge}</td>
            <td>${codCharge}</td>
            <td>${productTotal}</td>
            <td>${orderTotal}</td>
        </tr>
    </tbody>
    </table>
    <br />
    <div>With Regards</div>
    <div>House Of Miani</div>
</body>
</html>`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        console.log('Processing!')
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

const sendOrderStatusChangeEmail = (
    _id,
    name,
    email,
    address,
    phone,
    transactionId,
    allProduct,
    trackingUrl,
    awbNumber
  ) => {
    console.log("Sending E-mail...");
    var mailOptions = {
      from: `\"House Of Miani \" <${process.env.SENDER_EMAIL_ADDRESS}>`,
      to: email,
      subject: "House Of Miani  Order Update",
      html: `
          <!DOCTYPE html>
  <html>
  
  <head>
      <style>
          table {
              font-family: arial, sans-serif;
              border-collapse: collapse;
              width: 100%;
          }
  
          td,
          th {
              border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
          }
  
          tr:nth-child(even) {
              background-color: #dddddd;
          }
      </style>
  </head>
  
  <body>
      <h2>Hi ${name}</h2>
      <h3>Your Order has been shipped successfully. You can track your order by using below link.</h3>
      <table>
          <tbody>
              <tr>
                    <td>Tracking Link</td>
                    <td>${trackingUrl}</td>
              </tr>
              <tr>
                    <td>AWB Number </td>
                    <td>${awbNumber} </td>
              </tr>
              <tr>
                  <td>Order Id</td>
                  <td>${_id}</td>
              </tr>
              <tr>
                  <td>Customer Name</td>
                  <td>${name}</td>
              </tr>
              <tr>
                  <td>Customer Address</td>
                  <td>${address}</td>
              </tr>
              <tr>
                  <td>Customer Mobile #</td>
                  <td>${phone}</td>
              </tr>
              <tr>
                  <td>Transaction ID</td>
                  <td>${transactionId}</td>
              </tr>
          </tbody>
      </table>
      <h3>Item Wise Details</h3>
      <table>
          <thead>
              <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
              </tr>
          </thead>
          <tbody>
              ${allProduct
                .map(
                  (p) =>
                    `<tr>
                  <td>${p.id.pName}</td>
                  <td>${p.quantitiy}</td>
                  <td>${p.id.pPrice}</td>
              </tr>`
                )
                .join("")}
          </tbody>
      </table>
      <br />
      <div>With Regards</div>
      <div>House Of Miani</div>
  
  </body>
  
  </html>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      console.log("Processing!");
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  };

module.exports = {
  sendOrderEmail,
	sendOrderEmailToAdmin,
    sendOrderStatusChangeEmail
};
