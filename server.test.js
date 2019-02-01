const request = require('supertest');
const expect = require('expect');

var app = require('./server').app;

describe("HTTP SERVE", () => {

    describe('GET', () => {

        describe('/bad', () => {
            it("should return errorMessage", (done) => {
                request(app)
                    .get('/bad')
                    .expect((res) => {
                        expect(res.body).toInclude({ errorMessage: "une erreur est survenue !" })
                    })
                    .end(done);
            })

        })

        describe('/users', () => {
            it("should receive my username", (done) => {
                request(app)
                    .get('/users')
                    .expect(324)
                    .expect((res) => {
                        expect(res.body).toInclude({ name: 'jean marc', age: 46 })
                    })
                    .end(done)
            })
            it("should return my daughter user", (done) => {
                request(app)
                    .get('/users')
                    .expect(324)
                    .expect((res) => {
                        expect(res.body).toInclude({ name: 'erine', age: 8 })
                    })
                    .end(done);
            })
        })

    })


})

