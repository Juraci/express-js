describe('Blocks resource', function() {

  describe('GET /blocks', function() {
    it('returns a list of blocks', function(done) {
      request
        .get('/blocks')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.length(3);
          expect(res.body).to.include('Fixed');
          expect(res.body).to.include('Movable');
          expect(res.body).to.include('Rotating');
          done(err);
        });
    });

    context('when passing "limit=1" as a query parameter', function() {
      it('returns the first block only', function(done) {
        request
          .get('/blocks?limit=1')
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.length(1);
            expect(res.body).to.include('Fixed');
            done(err);
          });
      });
    });
  });

  describe('GET /blocks/:name', function() {
    it('returns the block value', function(done) {
      request
        .get('/blocks/fixed')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.equal('Fastened securely in position');
          done(err);
        });
    });

    context('when the name does not exist', function() {
      it('returns 404 block not found', function(done) {
        request
          .get('/blocks/nonExistingBlock')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.equal('Block not found');
            done(err);
          });
      });
    });
  });

  describe('POST /blocks', function() {
    it('creates a new block', function(done) {
      request
        .post('/blocks')
        .send({ name: 'Flying', description: 'Moves into to the air' })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done(err);
        });
    });
  });

  describe('DELETE /blocks/:name', function() {
    it('deletes the given block', function(done) {
      request
        .del('/blocks/fixed')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          request
            .get('/blocks/fixed')
            .end((err, res) => {
              expect(res.status).to.equal(404);
              done(err);
            });
        });
    });

    context('when the block name does not exist', function() {
      it('returns 404', function(done) {
        request
          .del('/blocks/banana')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done(err);
          });
      });
    });
  });
});
