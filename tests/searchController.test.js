const searchRoute = require('../routes/searchRoute');
const request = require('supertest');

describe('GET /search', () => {

    describe("nom et adresse fournies", () => {
        test("doit repondre avec le statut 200", () => {
            request(searchRoute).get("/search").send({
                nom : "experdeco",
                adresse : "marignier"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
            });
        })
    })
})

