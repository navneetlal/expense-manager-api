import { sign, verify } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import type { SignOptions, VerifyOptions } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'eW91IGdvdCBtZQ==';

function jwtSign(username: string) {
  return new Promise((resolve, reject) => {
    const jwtSignOptions: SignOptions = {
      jwtid: uuidv4(),
      issuer: process.env.JWT_ISSUER || 'Navneet',
      audience: process.env.JWT_AUDIENCE || 'web-app',
      notBefore: '-5s',
      expiresIn: '1h',
      algorithm: 'HS256'
    }
    sign({
      sub: '19827232-49fd-40ff-b42c-72ebeda06f00',
      name: 'Joseph D. Wright',
      given_name: 'Joseph',
      family_name: 'Wright',
      email: 'JosephDWright@jourrapide.com',
      email_verified: true,
      preferred_username: username,
      birthdate: '1997-07-03',
      gender: 'male',
      zoneinfo: 'America/Los_Angeles',
      website: 'shopcarpevita.com',
      locale: 'en-US'
    }, secret, jwtSignOptions, (err, token) => {
      if (err) reject(err)
      else resolve(token)
    });
  })
}

function jwtVerify(token: string) {
  return new Promise((resolve, reject) => {
    const jwtVerifyOptions: VerifyOptions = {
      issuer: process.env.JWT_ISSUER || 'Navneet',
      audience: process.env.JWT_AUDIENCE || 'web-app'
    }
    verify(token, secret, jwtVerifyOptions, (err, claims) => {
      if (err) reject(err)
      else resolve(claims)
    })
  })
}

export { jwtSign, jwtVerify }