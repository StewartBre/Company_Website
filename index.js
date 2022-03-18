var express = require('express');

var app = express();

var port = normalizePort(process.env.PORT || '3000');

app.use(express.static('public_html'));

app.set('port', port);

app.use(express.urlencoded({ extended : false}));

app.post('/order', function (req, res, next) {
    
    let firstname = req.body.firstname;
    let surname = req.body.surname;
    
    let temp = "";
    let html = "";

    let address = req.body.address;
    let city = req.body.city;
    let state = req.body.state;
    let postcode = req.body.postcode;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let orderType = req.body.orderType;
    let numOrder = req.body.numOrder;
    let discountCode = req.body.discountCode;
    let orderTotalCost;
    let discountVar = { name: "", discount: 0};
    let deliveryCost;



      if (typeof (discountCode) === "undefined") {
          discountCode ="";
      }
    
    function addDays(date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
      }


    let orderdate = new Date();
    deliverytime = addDays(orderdate, 7);

    html += '<html><head>';
    html += '<title> Customer Order Page </title>';
    html += '<link rel="stylesheet"'; 
    html += ' href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap c.min.css"';
    html += 'integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"';
    html += 'crossorigin="anonymous">';
    html += '</head>';

    html +='</body>';
    
    html += '<div class ="container">';
    html += '<h2> Order Confirmation </h2>';
    html += '<p> Thank you for your order received on <strong>' + orderdate.toString() + '</strong></p><br>';
    html += '<h3> Pet Supply Order Details<h3>';
    html += numOrder + " " + orderType + ".";
    html += '<h3> Customer Details</h3>';
    html += '<ul><li>Customer: '+ firstname + " " + surname + '</li>';
    html += '<li>Address: ' + address + " , " + city + " , " + state + " , " + postcode + "</li>";
    html += '<li>Phone Number: ' + mobile + '</li><li>Email: ' + email + '</li></ul>';

    html += '<h3>Order Cost</h3>';
    html += 'The total cost of your order is :<br>';

    discountVar = discount(discountCode);

    orderTotalCost = (numOrder * (costorderType(orderType)));
    html += 'Order(s):' + numOrder + " x " + orderType + ", " + orderTotalCost + "<br>";
    html += 'Delivery: $5.00 for VIC. Every other state $10.00<br>';
    deliveryCost = costState(state);

    if (discountVar.discount == 0) {
        html += 'Discount not applied.<br>'
    } else {
        html += 'discount (' + discountVar.name + ") :" + ((discountVar.discount * orderTotalCost) / 100).toFixed(2) + "<br>";
        orderTotalCost = (orderTotalCost - (orderTotalCost * discountVar.discount) /100).toFixed(2);
    }

    html += '<h2>Total Cost: $' + (orderTotalCost  + deliveryCost) + '</h2>';
    html += '<h3>Etimated Delivery</h3>';
    html += 'Your product is expected by'  + ' (' + deliverytime.toLocaleDateString() + ' )';
    temp += "document.location.href='index.html'";
    html += 'To return to the home page, please click here: <button type ="button" onclick=' + temp + ">Return</button>";
    html += '</body></div>';
    res.send(html);
    console.log("Received POST data for users endpoint");
    });

    app.listen(port, function () {
        console.log(`Web server running at: http://localhost:3000`);
        console.log("Type Ctrl+C to shut down the web server");
});

function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
       if (port >= 0) {
    return port;

    } return false;
};


function costorderType(type) {
    if (type == "Adult Dog Food") {
        return 100;
    } else if (type == "Cat Food") {
        return 20;
    } else if (type == "Small Dog Food") {
        return 30;
    } else if (type == "Pet Toy Frisbee") {
        return 20;
    } else if (type == "Squeaky Bone") {
        return 10;
    } else if (type == "Cat Ball Bell Toy") {
        return 15;
    }
};

function costState(state) {
    if (state == "VIC") {
        return 5.00;
    } else {
        return 10.00; } 
    
};

function discount(code) {
    if (code == 'ILOVEPETS') {
        return { discount: 10, name: 'Yes, you love pets!'};
    } else return {
discount: 0, name: ""
};
};


