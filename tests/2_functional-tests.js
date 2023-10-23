suite('Functional Tests', function() {
  let stockSymbol; // Set this to your desired stock symbol for the tests

  suite('Viewing one stock', function() {
    test('GET request to /api/stock-prices/', function(done) {
      chai.request(server)
        .get('/api/stock-prices/')
        .query({ stock: stockSymbol })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'stockData');
          assert.isString(res.body.stockData.symbol);
          assert.isNumber(res.body.stockData.price);
          assert.isNumber(res.body.stockData.likes);
          done();
        });
    });

    test('GET request to /api/stock-prices/ and liking it', function(done) {
      chai.request(server)
        .get('/api/stock-prices/')
        .query({ stock: stockSymbol, like: true })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'stockData');
          assert.isString(res.body.stockData.symbol);
          assert.isNumber(res.body.stockData.price);
          assert.isNumber(res.body.stockData.likes);
          done();
        });
    });

    test('GET request to /api/stock-prices/ and liking it again', function(done) {
      chai.request(server)
        .get('/api/stock-prices/')
        .query({ stock: stockSymbol, like: true })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'stockData');
          assert.isString(res.body.stockData.symbol);
          assert.isNumber(res.body.stockData.price);
          assert.isNumber(res.body.stockData.likes);
          done();
        });
    });
  });

  suite('Viewing two stocks', function() {
    test('GET request to /api/stock-prices/', function(done) {
      chai.request(server)
        .get('/api/stock-prices/')
        .query({ stock: [stockSymbol, 'anotherStock'] })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body.stockData);
          res.body.stockData.forEach(stock => {
            assert.isString(stock.symbol);
            assert.isNumber(stock.price);
            assert.isNumber(stock.likes);
          });
          done();
        });
    });

    test('GET request to /api/stock-prices/ and liking them', function(done) {
      chai.request(server)
        .get('/api/stock-prices/')
        .query({ stock: [stockSymbol, 'anotherStock'], like: true })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body.stockData);
          res.body.stockData.forEach(stock => {
            assert.isString(stock.symbol);
            assert.isNumber(stock.price);
            assert.isNumber(stock.likes);
          });
          done();
        });
    });
  });
});
