const utils = require('./utils');
const expect = require('expect');

describe('UTILS ASYNC', () => {
    it('should async add two numbers', (done) => {
        utils.asyncAdd(4, 5, (sum) => {
            expect(sum).toBeA('number').toBe(9);
            done();
        });
    });
    it('should asyncSquare a^2', (done) => {
        utils.asyncSquare(5, (sum) => {
            expect(sum).toBeA('number').toBe(25);
            done();

        });
    })

})



describe('UTILS SYNC', () => {

    it('should add two numbers', () => {
        var res = utils.add(4, 5);

        expect(res).toBe(9).toBeA('number');
    })

    it('should sub two numbers', () => {
        var res = utils.sub(4, 5);

        expect(res).toBe(-1).toBeA('number');
    })

    it('should return a^2', () => {
        let res = utils.square(5);

        expect(res).toBeA('number').toBe(25);
    })

    it("should have firstName and lastName", () => {
        let user = {};
        let res = utils.setName(user, 'Jean-Marc Pourchel');
        expect(res).toInclude({ firstName: "Jean-Marc", lastName: "Pourchel" })
    })
})
