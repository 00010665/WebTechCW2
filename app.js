const express = require('express')
const app = express()
const fs = require('fs')
const PORT = 8000

app.set('view engine', 'pug')

const DB = './database/employee.json' 


app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: false }))
const generateID = require("./public/javascript/script").generateID;

const employeesRouter = require('./routes/employees.js')

app.use('/employees', employeesRouter)

app.get('/', (req, res) => {
	res.render('home')
})

app.get('/create', (req, res) => {
	res.render('create')
})

app.post('/create', (req, res) => {
	const name = req.body.EmpName
	const surname = req.body.EmpSurname
    const position = req.body.EmpPosition
    const dob = req.body.EmpDoB
    const address = req.body.EmpAddress
    const passport = req.body.EmpPassport
    const phone = req.body.EmpPhone
    const education = req.body.EmpEdu
    const mstatus = req.body.EmpStatus
    
	if (name.trim() !== '' && surname.trim() !== '' && position.trim() !== '' && dob.trim() !== '' && address.trim() !== '' && passport.trim() !== ''  && phone.trim() !== '998'  && education.trim() !== ''  && mstatus.trim() !== '') {
		
		fs.readFile(DB, (err, data) => {
			if (err) throw err

			const employees = JSON.parse(data)

			employees.push({
				id: generateID(),
				name: name,
				surname: surname,
                position: position,
                dob: dob,
                address: address,
                passport: passport,
                phone: phone,
                education: education,
                mstatus: mstatus,                
			})

			fs.writeFile(DB, JSON.stringify(employees), err => {
				if (err) throw err

				res.render('create', { success: true })
			})

		})

	} else {
		res.render('create', { error: true })
	}	
})




app.get('/api/v1/employees', (req, res) => {

	fs.readFile(DB, (err, data) => {
		if (err) throw err

		const employees = JSON.parse(data)

		res.json(employees)
	})
})

app.listen(PORT, err => {
	if(err) throw err

	console.log('App is running on port 8000...')
})