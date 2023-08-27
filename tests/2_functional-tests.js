const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); // Update the path to your server file
const expect = chai.expect;

chai.use(chaiHttp);

describe('Functional Tests', function () {
  describe('Viewing and Liking Stocks', function () {
    it('Viewing one stock', function (done) {
      chai
        .request(server)
        .get('/api/stock-prices')
        .query({ stock: 'AAPL' })
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body.stockData).to.have.property('stock');
          expect(res.body.stockData.stock).to.equal('AAPL');
          done();
        });
    });

    it('Viewing one stock and liking it', function (done) {
      chai
        .request(server)
        .get('/api/stock-prices')
        .query({ stock: 'AAPL', like: true })
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body.stockData).to.have.property('stock');
          expect(res.body.stockData.stock).to.equal('AAPL');
          expect(res.body.stockData.likes).to.equal(1);
          done();
        });
    });

    it('Viewing the same stock and liking it again', function (done) {
      chai
        .request(server)
        .get('/api/stock-prices')
        .query({ stock: 'AAPL', like: true })
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body.stockData).to.have.property('stock');
          expect(res.body.stockData.stock).to.equal('AAPL');
          expect(res.body.stockData.likes).to.equal(1); // Likes should not increase
          done();
        });
    });

    it('Viewing two stocks', function (done) {
      chai
        .request(server)
        .get('/api/stock-prices')
        .query({ stock: ['AAPL', 'MSFT'] })
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body.stockData).to.be.an('array');
          expect(res.body.stockData).to.have.lengthOf(2);
          expect(res.body.stockData[0]).to.have.property('stock');
          expect(res.body.stockData[1]).to.have.property('stock');
          done();
        });
    });

    it('Viewing two stocks and liking them', function (done) {
      chai
        .request(server)
        .get('/api/stock-prices')
        .query({ stock: ['AAPL', 'MSFT'], like: true })
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body.stockData).to.be.an('array');
          expect(res.body.stockData).to.have.lengthOf(2);
          expect(res.body.stockData[0]).to.have.property('stock');
          expect(res.body.stockData[0].likes).to.equal(1);
          expect(res.body.stockData[1]).to.have.property('stock');
          expect(res.body.stockData[1].likes).to.equal(1);
          done();
        });
    });
  });
});

