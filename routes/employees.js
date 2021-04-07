const express = require('express')
const router = express.Router()

const fs = require('fs')
const path = require('path')

const rootFolder = path.dirname(
    require.main.filename || process.require.main.filename
)

const DB = `${ rootFolder }/database/employee.json`

router.get('/', (req, res) => {

	fs.readFile(DB, (err, data) => {
		if (err) throw err

		const employees = JSON.parse(data)

		res.render('employees', { employeeList: employees.length == 0 ? false: employees })
	})
})



router.get('/:id', (req, res) => {

	const id = req.params.id

	fs.readFile(DB, (err, data) => {
		if (err) throw err

		const employees = JSON.parse(data)

		const employee = employees.filter(employee => employee.id == id)[0]
	
        res.render('detail', { employeeDetail: employee })

		
	})
})

router.get('/:id/delete', (req, res) =>{

	const id = req.params.id

	fs.readFile(DB, (err, data) =>{
		if (err) throw err

		const employees = JSON.parse(data)

		const filteredEmployees = employees.filter(employee => employee.id != id)

		fs.writeFile(DB, JSON.stringify(filteredEmployees), err =>{
			if (err) throw err

			res.render('employees', { employeeList: filteredEmployees, deletedEmployee: id })
		})
	} )

})

router.get('/:id/update', (req, res) =>{

	const id = req.params.id

	fs.readFile(DB, (err, data) =>{
		if (err) throw err

		const employees = JSON.parse(data)

		const filteredEmployee = employees.filter(employee => employee.id == id)[0]

		res.render('update', { emp: filteredEmployee })
	} )

})

router.post('/:id/update', (req, res) =>{

	const id = req.params.id
	const form = req.body

	fs.readFile(DB, (err, data) =>{
		if (err) throw err

		const employees = JSON.parse(data)

		const filteredEmployee = employees.filter(employee => employee.id == id)[0]

		const idx = employees.indexOf(filteredEmployee)

		employees[idx].name = form.name

		fs.writeFile(DB, JSON.stringify(employees), err =>{
			if (err) throw err

			res.render('employees', { employeeList: employees })
		})

	} )

})


module.exports = router