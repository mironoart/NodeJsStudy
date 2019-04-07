const express = require('express')
const bodyParser = require('body-parser')

const Promo = require('../models/promotions')

const promoRouter = express.Router()
promoRouter.use(bodyParser.json())

promoRouter
	.route('/')
	.get((req, res, next) => {
		Promo.find({})
			.then(
				promo => {
					res.statusCode = 200
					res.setHeader('Content-Type', 'application/json')
					res.json(promo)
				},
				err => next(err)
			)
			.catch(err => next(err))
	})
	.post((req, res, next) => {
		Promo.create(req.body)
			.then(
				promo => {
					console.log('Promotion added ', promo)
					res.statusCode = 200
					res.setHeader('Content-Type', 'application/json')
					res.json(promo)
				},
				err => next(err)
			)
			.catch(err => next(err))
	})
	.put((req, res, next) => {
		res.statusCode = 403
		res.end('PUT operation not supported on /promo')
	})
	.delete((req, res, next) => {
		Promo.remove({})
			.then(
				resp => {
					res.statusCode = 200
					res.setHeader('Content-Type', 'application/json')
					res.json(resp)
				},
				err => next(err)
			)
			.catch(err => next(err))
	})

promoRouter
	.route('/:promoId')
	.get((req, res, next) => {
		Promo.findById(req.params.promoId)
			.then(
				promo => {
					console.log('promo:  ', promo)
					res.statusCode = 200
					res.setHeader('Content-Type', 'application/json')
					res.json(promo)
				},
				err => next(err)
			)
			.catch(err => next(err))
	})
	.post((req, res, next) => {
		res.statusCode = 403
		res.end('POST operation not supported on /promo ' + req.params.dishId)
	})
	.put((req, res, next) => {
		Promo.findByIdAndUpdate(
			req.params.promoId,
			{
				$set: req.body
			},
			{ new: true }
		)
			.then(
				promo => {
					console.log('promo updated ', promo)
					res.statusCode = 200
					res.setHeader('Content-Type', 'application/json')
					res.json(promo)
				},
				err => next(err)
			)
			.catch(err => next(err))
	})
	.delete((req, res, next) => {
		Promo.findByIdAndRemove(req.params.promoId)
			.then(
				resp => {
					res.statusCode = 200
					res.setHeader('Content-Type', 'application/json')
					res.json(resp)
				},
				err => next(err)
			)
			.catch(err => next(err))
	})

module.exports = promoRouter
