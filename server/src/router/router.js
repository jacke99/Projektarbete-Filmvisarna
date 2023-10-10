import express from 'express';
import { fetchCollection } from '../mongo/mongoClient.js';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { ObjectId } from 'mongodb';
import jwtUtil from '../util/jwtUtil.js';
dotenv.config();

const router = express.Router();

// USER STORY 3 och 19 och 23
router.post('/screenings', async (req, res) => {
  const body = req.body;
  if (
    Object.values(body).every((value) => value !== '' && value !== undefined)
  ) {
    try {
      const result = await fetchCollection('screenings').insertOne(body);
      res.status(201).send(result);
    } catch (error) {
      res.status(400).send({ error: 'Could not create screening' });
    }
  } else {
    res.status(400).send({ error: 'Could not create screening' });
  }
});


router.get("/screenings", async (req, res) => {

    let screenings = [];

    fetchCollection('screenings')
    .find()
    .forEach(oneScreening => screenings.push(oneScreening))
    .then(()=>{
        res.status(200).json({ message: "Screenings fetched successfully", screenings: screenings });
    })
    .catch(()=>{
        res.status(400).json({error: "Could not fetch documents of Screenings"});
    })
})


router.delete('/screenings/:id', async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const screening = await fetchCollection('screenings').deleteOne({
      _id: new ObjectId(req.params.id),
    });
    if (screening.deletedCount == 0) {
      res.status(404).send({ error: 'Could not find the document' });
    } else {
      res.status(200).send({ message: 'Screening deleted' });
    }
  } else {
    res.status(404).send({ error: 'unvalid screening id' });
  }
});



// USER STORY 4 och 23

router.post('/movies', async (req, res) => {
  // Med hjälp av jwt, kontrollera att role === ADMIN eller så gör vi det till en låst route
  const movie = req.body;
  const {
    title,
    img,
    name,
    trailer,
    director,
    actors,
    length,
    genre,
    speech,
    subtitles,
    ageRestriction,
  } = req.body;
  if (
    !title ||
    !img ||
    !trailer ||
    !director ||
    !actors ||
    !length ||
    !genre ||
    !speech ||
    !subtitles ||
    !ageRestriction
  ) {
    return res.status(400).json({
      error: 'Missing required properties, pls check your request body',
    });
  }

  if (
    Object.values(movie).every((value) => value !== '' && value !== undefined)
  ) {
    try {
      const result = await fetchCollection('movies')
        .insertOne(movie)
        .then((result) => {
          res.status(201).json(result);
        });
    } catch (error) {
      res
        .status(500)
        .json({ err: 'Could not create a new document in collection movies' });
    }
  } else {
    res.status(500).json({ err: 'Incorrect movie input' });
  }
});

//for admin to delete one movie task 23.2
router.delete("/movies/:id", async (req, res) => {
  
    if (ObjectId.isValid(req.params.id)) {
        const movie = await fetchCollection('movies').deleteOne({_id: new ObjectId(req.params.id)})
            if(movie.deletedCount == 0) {
                res.status(404).send({error: 'Could not find the movie'})
            } else {
                res.status(200).send({message: 'The movie is deleted'})
                
            }}
    else{
        res.status(404).send({error: "unvalid movie id"})
    }       
})



//get all the documentes from movies collection task 4.2
router.get('/movies', async (req, res) => {
  let movies = [];
  fetchCollection('movies')
    .find()
    .forEach((movie) => movies.push(movie))
    .then(() => {
      res.status(200).json(movies);
    })
    .catch(() => {
      res.status(500).json({ error: 'Could not fetch movies collection' });
    });
});



// USER STORY 5 och 23.5
router.get('/bookings', async (req, res) => {
  // Med hjälp av jwt, kontrollera att role === ADMIN eller så gör vi det till en låst route
  // fetcha våran bookings collection,
  // Kontrollera att allting gick bra (kolla i result)
  // if / else error eller responsen ska vara våran collection res.status(200).send(result)
});

router.put('/screenings', async (req, res) => {
  /*plocka ut data från req.body och kolla om användaren är inloggad */
  // Kolla så inget saknas i bodyn
  // fetcha våran screening collection,
  // kollar så sätena som vi plockat från bodyn är lediga (false)
  // "bokar" sätena, ändrar false till true (findmany eller toArray för att ändra flera sammtidigt)
  // errorHantering för booleans, se till att allt blev rätt
  // räkna ut totala priset adult * 140 | child * 120 | senior * 80 och + ihop
  // fetch på bookings och skapar en ny bokning (insertOne ?)
  // mera errorhantering
  // om allt gick bra och användaren var inloggad, fetch på usern, lägg till bokningsId i user.booking
  //errorhantering
  // if result.mathedCount från ny bokning !== 0 skicka tillbka status 201 och result (bokningsinformation)
  // else status dålig expempel 400
});

// USER STORY 11

router.get('/movies/:id', async (req, res) => {
  // hämta ut sökord från req.params.id
  const id = new ObjectId(req.params.id);
  // fetcha våran movies collection och filtrera med hjälp av sökord (datum, ålder + ev. eget sökord)
  // Kontrollera att allting gick bra (kolla i result)
  // if / else error om vi inte fick träffar eller resultatet ska om vi fick träffar
});

// USER STORY 15

router.patch('/bookings', async (req, res) => {
  // Plocka ut id ur req.body eller på det sättet som ni vill
  // Dubbelkolla så id faktiskt finns i bodyn
  // fetcha bokningen och kolla vilka stolar som kunden hade bokat och ändra status till avbokad
  // errorHantering
  // hämta screening med hjälp av screeningId i bokningen och "lås upp" dom tidigare bokade stolarna.
  //errorHantering
  // skicka tillbaka respons, ok eller error
});

// USER STORY 16

router.post('/register', async (req, res) => {
  const { email, lastname, name, password, phone } = req.body;
  const user = req.body;
  // Check if all required properties are present
  if (!email || !lastname || !name || !password || !phone) {
    return res.status(400).json({ error: 'Missing required properties' });
  }
  // hasha lösenord
  //EXEMPEL
  const hash = bcrypt.hashSync(user.password, parseInt(process.env.saltRounds));
  user.password = hash;
  console.log(user);
  const result = await fetchCollection('users').updateOne(
    { email: user.email },
    { $setOnInsert: user },
    { upsert: true }
  );

  if (result.matchedCount !== 0) {
    return res.status(400).send('User allready exists');
  } else {
    return res.status(201).send('Account was created');
  }
});

// USER STORY 17

router.put('/login', async (req, res) => {
  const login = req.body;
  if (!login.email || !login.password) {
    return res.status(400).send('Bad Request');
  }
  const user = await fetchCollection('users').findOne({ email: login.email });
  const match = bcrypt.compareSync(login.password, user.password); // true or false

  if (match == false) {
    res.status(400).send('Bad Request');
  } else {
    if (user != null) {
      const token = jwtUtil.generate(user);
      res.send(token);
    } else {
      res.sendStatus(400);
    }
  }
});

// USER STORY 18

router.get('/user/:id', async (req, res) => {
  // Plocka ut all userID från req.params.id
  const id = new ObjectId(req.params.id);
  // errorHantering
  // fetcha users collection, findOne med hjälp av id:et du plocka ur queryn
  //errorHantering
  // I user.booking finns det bokningsIDn, använd dom för att hämta användaren bokningar
  //errorHantering
  //Skicka tillbaka bokningarna eller error
});

export default router;
