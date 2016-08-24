describe('helloWorld', () => {
  it('returns "hello world"', (done) => {
    request
      .get('/')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.equal('Hello world');
        done(err);
      });
  });
});
