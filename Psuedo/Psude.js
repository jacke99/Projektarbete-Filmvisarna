
// USER STORY 3
router.post("/screenings", async (req, res) => { 
    // Med hjälp av jwt, kontrollera att role === ADMIN eller så gör vi det till en låst route
    /*plocka ut data från req.body */
    // Kolla så inget saknas i bodyn
    // Om någonting saknas, skicka tillbaka error till exempel (res.status(400))
    // fetcha våran screenings collection, och uppdatera eller skapa en ny screening (result = fetchcollection("screenings"))
    // Kontrollera att allting gick bra (kolla i result)
    // if / else error eller response 201?
})

router.get("/screenings", async (req, res) => {
    // fetcha våran screening collection,
    // Kontrollera att allting gick bra (kolla i result)
    // if / else error eller responsen ska vara våran collection res.status(200).send(result)
})


// USER STORY 4

router.post("/movies", async (req, res) => { 
    // Med hjälp av jwt, kontrollera att role === ADMIN eller så gör vi det till en låst route
    /*plocka ut data från req.body */
    // Kolla så inget saknas i bodyn
    // Om någonting saknas, skicka tillbaka error till exempel (res.status(400))
    // fetcha våran movies collection, och uppdatera eller skapa en ny movie (result = fetchcollection("movies"))
    // Kontrollera att allting gick bra (kolla i result)
    // if / else error eller response 201?
})

router.get("/movies", async (req, res) => {
    // fetcha våran movies collection,
    // Kontrollera att allting gick bra (kolla i result)
    // if / else error eller responsen ska vara våran collection res.status(200).send(result)
})

// USER STORY 5
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

router.get("/movies/filter", async (req, res) => {
    // hämta ut sökord från req.query 
    // fetcha våran movies collection och filtrera med hjälp av sökord (datum, ålder + ev. eget sökord)
    // Kontrollera att allting gick bra (kolla i result)
    // if / else error om vi inte fick träffar eller resultatet ska om vi fick träffar
})

// Fortsättning på måndag eller tisdag