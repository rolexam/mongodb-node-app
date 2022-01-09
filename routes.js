const express = require('express')
const {getSeries, searchSeries, insertSeries, deleteSeries, findSeries, updateSeries} = require("./db");

const router = express.Router()

router.get('/', async (req, res) => {
    const series =
        req.query.query
            ? await searchSeries(req.query.query)
            : await getSeries()

    const items = mapSeries(series)

    res.render('pages/index', {
        items: items,
        searchString: req.query.query ?? ''
    })
})

router.get('/series/add', (req, res) => {
    res.render('pages/addSeries')
})

router.get('/series/:id/edit', async (req, res) => {
    const series = await findSeries(req.params.id);

    res.render('pages/editSeries', series)
})

router.post('/series/:id/edit', async (req, res) => {
    updateSeries(req.params.id, req.body)
        .then((re) => {
            res.redirect('/')
        })
        .catch(err => {
            console.error(err)
        })
})

router.post('/series/add', (req, res) => {
    insertSeries(req.body)
        .then(r => {
            res.redirect('/');
        })
        .catch(err => {
            console.error(err)
        })
})

router.post('/series/:id/delete', (req, res) => {
    deleteSeries(req.params.id)
        .then(r => {
            res.redirect('/')
        })
        .catch(err => {
            console.error(err)
        })
})

const mapSeries = (series) => series.map(i => {
        let content = '';
        Object.entries(i).forEach(entry => {
            const [key, value] = entry;
            content += `<div><strong>${key}: </strong>${value}</div>`
        })

        return {
            id: i._id,
            content: content
        }
    }
);
module.exports = router