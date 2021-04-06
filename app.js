const express = require('express')
const app = express()
const PORT = 8000

app.set('view engine', 'pug')

app.listen(PORT, err => {
	if(err) throw err

	console.log(`App is running on port ${ PORT } ...`)
})
