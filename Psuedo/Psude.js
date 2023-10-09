
// USER STORY 3 och 19 och 23
router.post("/screenings", async (req, res) => { 
    // Med hjälp av jwt, kontrollera att role === ADMIN eller så gör vi det till en låst route
    /*plocka ut data från req.body */
    // Kolla så inget saknas i bodyn
    // Om någonting saknas, skicka tillbaka error till exempel (res.status(400))
    // fetcha våran screenings collection, och uppdatera eller skapa en ny screening (result = fetchcollection("screenings"))
    // Kontrollera att allting gick bra (kolla i result)
    // if / else error eller response 201?
})
router.delete("/screenings/:id", async (req, res) => {
    // hämta ut id (req.params.id)
    // EXEMPEL
    if (ObjectId.isValid(req.params.id)) {
        const channel = await fetchCollection('channels').deleteOne({_id: new ObjectId(req.params.id)})
            if(channel.deletedCount == 0) {
                res.status(404).send({error: 'Could not find the document'})
            } else {
                res.status(200).send({message: 'Channel deleted'})
                await fetch("http://localhost:5000/channel") // säger åt socketen att emitta till alla som är uppkopplade 
            }}
})

router.get("/screenings", async (req, res) => {
    // fetcha våran screening collection,
    // Kontrollera att allting gick bra (kolla i result)
    // if / else error eller responsen ska vara våran collection res.status(200).send(result)
})


// USER STORY 4 och 23

router.post("/movies", async (req, res) => { 
    // Med hjälp av jwt, kontrollera att role === ADMIN eller så gör vi det till en låst route
    /*plocka ut data från req.body */
    // Kolla så inget saknas i bodyn
    // Om någonting saknas, skicka tillbaka error till exempel (res.status(400))
    // fetcha våran movies collection, och uppdatera eller skapa en ny movie (result = fetchcollection("movies"))
    // Kontrollera att allting gick bra (kolla i result)
    // if / else error eller response 201?
})

router.delete("/movies/:id", async (req, res) => {
    // hämta ut id (req.params.id)
    // EXEMPEL
    if (ObjectId.isValid(req.params.id)) {
        const channel = await fetchCollection('channels').deleteOne({_id: new ObjectId(req.params.id)})
            if(channel.deletedCount == 0) {
                res.status(404).send({error: 'Could not find the document'})
            } else {
                res.status(200).send({message: 'Channel deleted'})
                await fetch("http://localhost:5000/channel") // säger åt socketen att emitta till alla som är uppkopplade 
            }}
})

router.get("/movies", async (req, res) => {
    // fetcha våran movies collection,
    // Kontrollera att allting gick bra (kolla i result)
    // if / else error eller responsen ska vara våran collection res.status(200).send(result)
})

// USER STORY 5 och 23.5
router.get("/bookings", async (req, res) => {
    // Med hjälp av jwt, kontrollera att role === ADMIN eller så gör vi det till en låst route
    // fetcha våran bookings collection,
    // Kontrollera att allting gick bra (kolla i result)
    // if / else error eller responsen ska vara våran collection res.status(200).send(result)
})

router.put("/screenings", async (req, res) => { 
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
})

// USER STORY 11

router.get("/movies/:id", async (req, res) => {
    // hämta ut sökord från req.params.id
    const id = new ObjectId(req.params.id) 
    // fetcha våran movies collection och filtrera med hjälp av sökord (datum, ålder + ev. eget sökord)
    // Kontrollera att allting gick bra (kolla i result)
    // if / else error om vi inte fick träffar eller resultatet ska om vi fick träffar
})

// USER STORY 15


router.patch("/bookings", async (req, res) => {
    // Plocka ut id ur req.body eller på det sättet som ni vill
    // Dubbelkolla så id faktiskt finns i bodyn
    // fetcha bokningen och kolla vilka stolar som kunden hade bokat och ändra status till avbokad
    // errorHantering
    // hämta screening med hjälp av screeningId i bokningen och "lås upp" dom tidigare bokade stolarna.
    //errorHantering
    // skicka tillbaka respons, ok eller error
})

// USER STORY 16

router.post("/register", async (req, res) => {
    // Plocka ut all userinfo från req.body
    // Kolla så allt är med och inget saknas (namn, efternamn, email, lösenord, telefon)
    // hasha lösenord
    //EXEMPEL
    const hash = bcrypt.hashSync(user.password, parseInt(process.env.saltRounds));
    user.password = hash
    // fetcha våran users collection och kolla så emailen inte redan är registerad och lägg till den nya usern
    //errorhantering (matchcount?)
    //Skicka tillbaka respons
})

// USER STORY 17

router.put("/login", async (req, res) => {
    // Hämta email och lösenord ur, const login = req.body
    // Kolla så ingenting saknades
    // Fetcha users collection med findOne och sök efter en user med emailen | const user = fetch
    // Kolla så userns hashade lösenord stämmer med lösenordet ut req.body
    // EXEMPEL
    const match = bcrypt.compareSync(login.password, user.password) // true or false
    // ErrorHantering
    // Om det gick bra, generera jwt token
    // Skicka respons med token eller error
})

// USER STORY 18

router.get("/user/:id", async (req, res) => {
    // Plocka ut all userID från req.params.id
    const id = new ObjectId(req.params.id)
    // errorHantering
    // fetcha users collection, findOne med hjälp av id:et du plocka ur queryn
    //errorHantering
    // I user.booking finns det bokningsIDn, använd dom för att hämta användaren bokningar
    //errorHantering
    //Skicka tillbaka bokningarna eller error
})