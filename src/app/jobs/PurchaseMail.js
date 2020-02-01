const Mail = require('../services/Mail')

class PurchaseMail {
  get key () {
    return 'PurchaseMail'
  }

  async handle (job, done) {
    // job é o job em si e done é chamada quando terminar de executar o job

    const { ad, user, content } = job.data

    await Mail.sendMmail({
      from: '"Vinicius Augutis" <vinicius_augutis@hotmail.com>',
      to: ad.author.email,
      subject: `Solicitação de compra: ${ad.title}`,
      template: 'purchase',
      context: { user, content, ad }
    })

    return done()
  }
}

module.exports = new PurchaseMail()
