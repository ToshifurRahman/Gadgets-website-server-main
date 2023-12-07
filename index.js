const express = require('express')
const cors = require("cors");
const app = express()
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require("dotenv").config();


app.use(express.json());
app.use(cors());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mpobb6h.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {
        const productCollection = client.db("product-collection").collection("products");
        const teamCollection = client.db("product-collection").collection("team")
        const reviewCollection = client.db("product-collection").collection("reviews")
        app.post('/add-a-product', async (req, res) => {
            const product = req.body;
            const result = await productCollection.insertOne(product);
            console.log(product)
            res.send(result);
        })
      //add teammate information
        app.post('/add-teammate', async (req, res) => {
            const teammate = req.body;
            const result = await teamCollection.insertOne(teammate);
            console.log(teammate)
            res.send(result);
        })
        //review
        app.post('/add-review', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            console.log(review)
            res.send(result);
        })
        //for teammatea get
        app.get('/all-teammate', async (req, res) => {
            const result = await teamCollection.find().toArray();
            res.send(result);

        })
       //for product
        app.get('/all-products', async (req, res) => {
            const result = await productCollection.find().toArray();
            res.send(result);

        })
        //for review
        app.get('/all-review', async (req, res) => {
            const result = await reviewCollection.find().toArray();
            res.send(result);
            console.log(result);
        })

        //singleproduct details
        app.get('/product/:id', async (req, res) => {
            const id = req.params.id;
            const result = await productCollection.findOne({ _id: new ObjectId(id) })
            res.send(result);
        })

        //update
        app.put('/update-by-id/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updateProduct = req.body;
            const updates = { $set: updateProduct }

            const result = await productCollection.updateOne(filter, updates);
            res.send(result);
        })


        http://localhost:3000/delete-teammate/${teammateId}
        //Delect
        
        app.delete('/delete-teammate/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const filter = {_id: new ObjectId(id) };
            const result = await teamCollection.deleteOne(filter);
            res.send(result);
            console.log(result)
        });

        app.delete('/delete-by-id/:id', async (req, res) => {
            const id = req.params.id;
            const filter = {_id: new ObjectId(id) };
            const result = await productCollection.deleteOne(filter);
            res.send(result);
        });
        app.delete('/delete-review/:id', async (req, res) => {
            const id = req.params.id;
            const filter = {_id: new ObjectId(id) };
            const result = await reviewCollection.deleteOne(filter);
            res.send(result);
        });

    }

    finally {
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Helloo World')
})

app.get('/Home', (req, res) => {
    res.send(user)
})


app.listen(port, () => {
    console.log(` http://localhost:${port}/ `)
})



//nodemon index.js
// npm i -g nodemon cors express mongodb
// npm install -g nodemon


