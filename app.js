const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.get('/', (req, res) => {

  res.render('index', { restaurants: restaurantList.results });
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword });
})

app.get('/restaurants/:restaurant_id', (req, res) => {

  //console.log('req.params.restaurant_id', req.params.restaurant_id)

  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant });
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})