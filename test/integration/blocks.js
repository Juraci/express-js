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
});
