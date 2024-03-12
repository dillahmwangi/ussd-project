const express  = require('express');
const bodyParser = require('body-parser');
const UssdMenu = require('ussd-menu-builder');

const app = express()
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
const port = 3000
let menu = new UssdMenu();
// Define menu states()
menu.startState({
    run: () => {
        // use menu.con() to send response without terminating session      
        menu.con('Welcome. Choose option:' +
            '\n1. Subscribe' +
            '\n2. View Subscriptions'+
            '\n3. Unsubscribe'
            );
    },
    // next object links to next state based on user input
    next: {
        1: 'Sub',
        2: 'viewSub',
        3: "unSub"

     }
 });

menu.state('Sub', {
    run: () => {
        // fetch subscription
        menu.con("Enter Your Name");

    },
    next:{
        1:'location',
    },
});

        menu.state('location',{
            run: () => {
                menu.con('Choose a Location:' +
                '\n1. Nairobi' +
                '\n2. Mombasa' 


                );
            },

next:{
    1:'nairobi',
    2:'Mombasa' 
},
});

    menu.state('nairobi',{
        run: () => {
            menu.con('Select a Region:' +
            '\n1. Embakasi' +
            '\n2. Rongai'+
            '\n3. ThikaRoad'
            );
        },

        next:{
            1:'nairobi',
            2:'Mombasa' 
        },
        });
    
        menu.state('nairobi',{
            run: () => {
                menu.con('Select a Region:' +
                '\n1. Watamu' +
                '\n2. Nyali'+
                '\n3. Bamburi'
                );
            },

    next:{
        1:'houseType',
    },
    });

    menu.state('houseType',{
        run: () => {
            menu.con('Select the Type of house:' +
            '\n1. 1 Bedroom' +
            '\n2. 2 Bedroom'+
            '\n3. 3 Bedroom'+
            '\n4. Studio Room'
            );
        },

        next:{
            1:'price',
        },
        });
    
        menu.state('price',{
            run: () => {
                menu.con('Select Price Range:' +
                '\n1. 10k - 20k' +
                '\n2. 21k - 30k'+
                '\n3. 31k - 40k'+
                '\n4. 41k - 50k'+
                '\n5.51k - 100k'
                );
            }
});


menu.state('viewSub', {
    run: () => {
        menu.end('These are your current Subscriptions:'+
                '\n1.Nairobi' +
                '\n2. Naivasha'+
                '\n3. Mombasa'+
                '\n4. Kitale'+
                '\n5. Eldoret'

        );
    },
});
    next: {

    }
    menu.state('unSub', {
        run: () => {
            menu.end('You have successfully unsubscribed:' );
     },
    })



app.post('/ussd', function(req, res){
    menu.run(req.body, ussdResult => {
        res.send(ussdResult);
    });
});

app.listen(port || 5090, async () => {
    console.log(`Server Running ${port}`);
});