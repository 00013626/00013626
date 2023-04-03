const { json } = require('express')
const express = require('express')
const req = require('express/lib/request')
const app = express()
const fs = require('fs')
const PORT=8000

//Localhost 8000
app.listen(PORT,err=>{
  if(err) throw err

  console.log('Server is running on port 8000...')
})

app.set('view engine','pug')

app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: false }))


app.get('/',(req,res)=>{

  fs.readFile('./data/data.json', (err, data)=>{
    const records = JSON.parse(data)

    res.render('home', { records: records })
    
    
  })
    
})

app.get('/recording', (req,res)=>{
  res.render('recording')
})


app.post('/recording', (req, res)=>{

  const name = req.body.name
  const level = req.body.level
  const faculty = req.body.faculty
  const feedback = req.body.feedback

  if (name.trim() === ''){
    res.render('recording', { nameerror: true })
  }
  else if ( level.value === ''){
    res.render('recording', { levelerror: true})
  }
  else if (faculty.value ===''){
    res.render('recording', { facultyerror: true })
  }
  else if ( feedback.trim() === ''){
    res.render('recording', { feedbackerror: true })
  }
  else{
    fs.readFile('./data/data.json', (err, data)=>{
      if (err) throw err
      const records = JSON.parse(data)
  
      const record = {
        id: id(),
        name: name,
        level: level,
        faculty: faculty,
        feedback: feedback,
  
      }
      records.push(record)
      fs.writeFile('./data/data.json', JSON.stringify(records), err=>{
        if (err) throw err
        
        res.render('home', { records: records })
      })
  
    })
  }

  
})

app.get('/recording/:id', (req,res) => {
  const id = req.params.id;

  fs.readFile('./data/data.json', (err, data) => {
    if (err) throw new Error(`Error in edit: ${err}`)

    const records = JSON.parse(data);

    const foundRecord = records.find(r => r.id == id);

    console.log("Record: ", foundRecord);

    res.render('updateRecord', { foundRecord });
  })

})


app.put('/recording/:id', (req,res) => {
  const recordingId = req.params.id;

  fs.readFile('./data/data.json', (err, data) => {
    if (err) throw new Error(`Error in edit: ${err}`)

    const records = json.parse(data);

    const updatedRecords = records.filter(r => r.id !== recordingId);
    
    console.log("Records: ", records);
    console.log("Updated Records: ", updatedRecords);

    res.json(updatedRecords);
  })
})

//Delete
app.get('/:id/delete', (req, res)=>{
  const id = req.params.id

  fs.readFile('./data/data.json', (err, data)=>{
    if (err) throw err
    const records = JSON.parse(data)
    const filteredRecords = records.filter(record => record.id != id)
    fs.writeFile('./data/data.json', JSON.stringify(filteredRecords), (err)=>{
      if (err) throw err
      res.render('home', { records: filteredRecords })
    })
  })
})



function id(){
  return '_' + Math.random().toString(36).substring(2, 9)
}