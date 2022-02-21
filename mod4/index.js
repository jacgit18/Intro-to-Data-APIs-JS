const express = require('express');
const Prod =[
  {
      id: 1,
      name: 'Soap'
  },
  {
      id: 2,
      name: 'brush'
  },
  {
      id: 3,
      name: 'shoe'
  }


];

function cusMidWare(req, res, next) {
  // console.log(req.body)
  console.log(req.query)
  console.log(req.params)
  next();
}


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// app.get('/', (request, response) => {
//   // response.send("hello")
//   response.json(Prod)
// });

app.get('/Prod/:name', cusMidWare,(request, response) => {
  response.json(Prod.find((prod)=>{
    return request.params.name === prod.name;
  }))
  // response.send(request.params.name)
});

app.post('/add', (req, res) => {
  console.log(req.body.title);
  res.sendStatus(200)
})


app.listen(3000, () => console.log('listening at 3000'));
