'use strict'

const config = {
  aws: {
    accessKey: process.env.AWS_ACCESS_KEY,
    secretKey: process.env.AWS_SECRET_KEY
  },
  client: {
    endpoints: {
      client: 'http://api.sertvveterinary.com/client',
      users: 'http://api.sertvveterinary.com/users',
      auth: 'http://api.sertvveterinary.com/auth',
      appointment: 'http://api.sertvveterinary.com/appointment',
      aprecord: 'http://api.sertvveterinary.com/aprecord',
      billdetail: 'http://api.sertvveterinary.com/billdetail',
      bills: 'http://api.sertvveterinary.com/bills',
      ethnicities: 'http://api.sertvveterinary.com/ethnicities',
      interecord: 'http://api.sertvveterinary.com/interecord',
      internment: 'http://api.sertvveterinary.com/internment',
      laboratory: 'http://api.sertvveterinary.com/laboratory',
      medicine: 'http://api.sertvveterinary.com/medicine',
      race: 'http://api.sertvveterinary.com/race',
      pet: 'http://api.sertvveterinary.com/pet',
      products: 'http://api.sertvveterinary.com/products'
    }
  },
  auth: {
    facebook: {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: 'http://sertvveterinary.com/auth/facebook/callback'
    }
  },
  secret: process.env.SertvSecret || 'nomorecrueltytoanimals' // never use default
}

// For development use local micro instances
if (process.env.NODE_ENV !== "production") {
  config.client.endpoints = {
    client: 'http://localhost:5000',
    users: 'http://localhost:5001',
    auth: 'http://localhost:5002',
    appointment: 'http://localhost:5003',
    aprecord: 'http://localhost:5004',
    billdetail: 'http://localhost:5005',
    bills: 'http://localhost:5006',
    ethnicities: 'http://localhost:5007',
    interecord: 'http://localhost:5008',
    internment: 'http://localhost:5009',
    laboratory: 'http://localhost:5010',
    medicine: 'http://localhost:5011',
    race: 'http://localhost:5012',
    pet: 'http://localhost:5013',
    products: 'http://localhost:5014',
  }

  config.auth.facebook.callbackURL = 'http://sertvveterinary.test:5050/auth/facebook/callback'
}

module.exports = config
