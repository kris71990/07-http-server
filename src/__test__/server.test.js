'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
const cowsay = require('cowsay');
const faker = require('faker');

beforeAll(() => server.start(5000));
afterAll(() => server.stop());

describe('GET request at cowsay/ with text string', () => {
  const cow = cowsay.say({ text: 'I am a test cow' });
  const html = `<!DOCTYPE html><html><head><title>cowsay</title></head><body><h1>cowsay</h1><pre>${cow}</pre></body></html>`;

  test('should return specified cow saying text', () => {
    return superagent.get(':5000/cowsay')
      .query({ text: 'I am a test cow' })
      .then((res) => {
        expect(res.status).toEqual(200);
        expect(res.text).toEqual(html);
      });
  });
});

describe('GET request at api/cowsay with text string', () => {
  const random = faker.random.words();
  test('should return JSON of random text', () => {
    return superagent.get(':5000/api/cowsay')
      .query({ text: random })
      .then((res) => {
        expect(res.status).toEqual(200);
        expect(JSON.parse(res.text).text).toEqual(random);
      });
  });
});

describe('POST request at api/cowsay', () => {
  test('should return 200 status and text', () => {
    return superagent.post(':5000/api/cowsay')
      .send({ text: 'this is a test' })
      .then((res) => {
        expect(res.body.text).toEqual('this is a test');
        expect(res.status).toEqual(200);
      });
  });
});

describe('GET of invalid path should return 404', () => {
  test('should return 404', () => {
    return superagent.get(':5000/error')
      .query('error')
      .then(() => {})
      .catch((err) => {
        expect(err.status).toEqual(404);
      });
  });
});
