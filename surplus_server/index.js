const {
  MongoClient,
  ServerApiVersion,
  ObjectId
} = require('mongodb');
var jwt = require('jsonwebtoken');
const express = require('express')
var cors = require('cors')
require('dotenv').config()
var app = express()
var cookieParser = require('cookie-parser')
// app.use(cors())
app.use(cors({
    origin: ['http://localhost:5173', 'https://authentication-15b67.web.app', 'https://authentication-15b67.firebaseapp.com'],

    credentials: true

  }

))
app.use(express.json())
app.use(cookieParser())
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const verifytoken = async (req, res, next) => {
  const token = req?.cookies?.token;
  console.log('middelware', token)
  if (!token) {
    return res.status(401).send({
      message: 'not authorized'
    })
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'not authorized'
      })
    }
    console.log('decode value', decoded);
    req.user = decoded
    next();
  })


}

USERNAME = process.env.S3_BUCKET
PASS = process.env.SECRET_KEY
const uri = `mongodb+srv://${USERNAME}:${PASS}@cluster0.xrp2z6o.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const foodcollection = client.db("food").collection("fooddata");
    const usercollection = client.db("food").collection("userdata");
    const reviewcollection = client.db("food").collection("reviewdata");
    const requestedfoodcollection = client.db("food").collection("requestedfooddata");
    const donatedmoneycollection = client.db("food").collection("donatedmoneydata");
    // JWT Authorization
    app.post('/jwt', async (req, res) => {
      const user = req.body;
      // console.log(process.env.ACCESS_TOKEN_SECRET)
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1h'
      })

      res
        .cookie('token', token, {

          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        .send({
          success: true
        })
    })

    // // token remove when logout
    // app.post('/logout', async (req, res) => {
    //   const user = req.body;
    //   console.log('logging out', user);
    //   res.clearCookie('token', {
    //     maxAge: 0
    //   }).send({
    //     success: true
    //   })
    // })

    // Logout
    app.post('/logout', async (req, res) => {
      const user = req.body;
      console.log('logging out', user);
      res
        .clearCookie('token', {
          maxAge: 0,
          sameSite: 'none',
          secure: true
        })
        .send({
          success: true
        })
    })

    // add new product to database
    app.post('/newfood', verifytoken, async (req, res) => {
      const newfood = req.body
      console.log(newfood)
      const result = await foodcollection.insertOne(newfood);
      res.send(result)
    })
    // add requested food to database
    app.post('/requestedfood', async (req, res) => {
      const newfood = req.body
      console.log(newfood)
      const result = await requestedfoodcollection.insertOne(newfood);
      res.send(result)
    })
    // add donated money to database
    app.post('/moneydonation', async (req, res) => {
      const donatedmoney = req.body
      console.log(donatedmoney)
      const result = await donatedmoneycollection.insertOne(donatedmoney);
      res.send(result)
    })

    // add new user to database
    app.post('/users', async (req, res) => {
      const user = req.body
      console.log(user)
      const result = await usercollection.insertOne(user);
      res.send(result)
    })
    // add new review to database
    app.post('/newreview', async (req, res) => {
      const review = req.body
      console.log(review)
      const result = await reviewcollection.insertOne(review);
      res.send(result)
    })

    // update userdata
    app.patch('/users', async (req, res) => {

      const user = req.body
      const query = {
        email: user.email
      }

      const updateuserdb = {
        $set: {
          lastloggedat: user.lastloggedat
        },
      };
      // Update the first document that matches the filter
      const result = await usercollection.updateOne(query, updateuserdb);
      res.send(result)
    })

    // update reqested food status
    app.patch('/requestedfood', async (req, res) => {

      const update = req.body
      console.log(req.body)
      const query = {
        _id: new ObjectId(update._id)
      }

      const updateuserdb = {
        $set: {
          status: update.newstatus
        },
      };
      // Update the first document that matches the filter
      const result = await requestedfoodcollection.updateOne(query, updateuserdb);
      res.send(result)
    })

    // get all foods from database
    app.get('/foods', async (req, res) => {
      const cursor = foodcollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })
    // get all receipts from database
    app.get('/receipt', verifytoken, async (req, res) => {
      console.log('rgrst')

      let query = {}

      query = {
        donar_email: req.user.email
      }

      // console.log(req.user.email)
      const cursor = donatedmoneycollection.find(query);
      const result = await cursor.toArray();
      console.log(result)
      res.send(result)
    })
    // get all reviews from database
    app.get('/reviews', async (req, res) => {
      const cursor = reviewcollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })

    // get specific id data from mongodb
    app.get("/singlefood/:id", async (req, res) => {

      const id = req.params.id
      const query = {

        _id: new ObjectId(id)
      }
      const result = await foodcollection.findOne(query)

      res.send(result)
    })
    // get specific id data from mongodb
    app.get("/getmyonefood/:id", async (req, res) => {

      const id = req.params.id
      const query = {

        _id: new ObjectId(id)
      }
      const result = await foodcollection.findOne(query)

      res.send(result)
    })
    // get specific id data from mongodb
    app.get("/manage/:id", async (req, res) => {

      const id = req.params.id
      console.log(id)
      const query = {

        foodid: id
      }
      const result = await requestedfoodcollection.find(query).toArray()
      console.log(result)
      res.send(result)
    })
    // get specific user food
    app.get('/userfood', verifytoken, async (req, res) => {

      let query = {}

      query = {
        donar_email: req?.user?.email
      }
      console.log(query)
      const result = await foodcollection.find(query).toArray();
      res.send(result)
    })
    // get specific user requestedfood
    app.get('/requestedfood', verifytoken, async (req, res) => {

      let query = {}
      // if (req.query?.email) {
      //   query = {
      //     Requester_email: req.query.email
      //   }
      // }
      query = {
        Requester_email: req?.user?.email
      }
      console.log(query)
      const result = await requestedfoodcollection.find(query).toArray();
      res.send(result)
    })

    // delete data from table
    app.delete('/table/:id', async (req, res) => {
      const id = req.params.id

      const query = {
        _id: new ObjectId(id)
      }
      const result = await foodcollection.deleteOne(query)
      res.send(result)
    })
    // delete data from food if sttaus is delivered
    app.delete('/food/:id', async (req, res) => {
      const id = req.params.id

      const query = {
        _id: new ObjectId(id)
      }
      const result = await foodcollection.deleteOne(query)
      res.send(result)
    })

    // delete data from request
    app.delete('/requestedfood/:id', async (req, res) => {
      const id = req.params.id

      const query = {
        _id: new ObjectId(id)
      }
      const result = await requestedfoodcollection.deleteOne(query)
      res.send(result)
    })

    // update food
    app.put('/updateownfood', async (req, res) => {

      let query = {}
      if (req.query?.id) {
        query = {
          _id: new ObjectId(req.query.id)
        }
      }

      const options = {
        upsert: true
      };

      const updateproduct = req.body
      console.log(updateproduct)
      const updateproductdoc = {
        $set: {

          foodname: updateproduct.foodname,
          quantity: updateproduct.quantity,
          address: updateproduct.address,
          status: updateproduct.status,
          expiredate: updateproduct.expiredate,
          note: updateproduct.note,
          image: updateproduct.image,
          donar_name: updateproduct.donar_name,
          donar_email: updateproduct.donar_email,
          donar_image: updateproduct.donar_image

        },
      };

      // Update the first document that matches the filter
      const result = await foodcollection.updateOne(query, updateproductdoc, options);
      res.send(result)
    })

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})