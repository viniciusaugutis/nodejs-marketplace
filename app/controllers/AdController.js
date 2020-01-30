const Ad = require('../models/Ad')

class AdController {
  // index, show, store, update, destroy

  async index (req, res) {
    const ads = await Ad.paginate({}, {
      limit: req.query.limit || 10,
      page: req.query.page || 1,
      populate: ['author'],
      sort: '-createdAt'
    })
    return res.json(ads)
  }

  async show (req, res) {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ error: 'Id not provided' })
    }

    const ad = await Ad.findById(id)

    if (!ad) {
      return res.status(404).json({ error: 'Ad not found' })
    }

    return res.json(ad)
  }

  async store (req, res) {
    const { title, description, price } = req.body

    if (!title || !description || !price) {
      return res.status(400).json({ error: 'Fields not provided everything' })
    }

    const ad = await Ad.create({ ...req.body, author: req.userId })

    return res.json(ad)
  }

  async update (req, res) {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ error: 'Id not provided' })
    }

    const ad = await Ad.findById(id)

    if (!ad) {
      return res.status(404).json({ error: 'Ad not found' })
    }

    const adUpdated = await Ad.findByIdAndUpdate(id, req.body, {
      new: true
    })
    // new: true faz com que o objeto seja carregado para variavel de atribuição

    return res.json(adUpdated)
  }

  async destroy (req, res) {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ error: 'Id not provided' })
    }

    const ad = await Ad.findById(id)

    if (!ad) {
      return res.status(404).json({ error: 'Ad not found' })
    }

    await Ad.findByIdAndDelete(id)

    return res.send() // retorna nobody
  }
}

module.exports = new AdController()
