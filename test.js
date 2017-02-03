'option strict';

const { expect } = require('chai');
const sync = require('./');

const delay = () => new Promise(resolve => setTimeout(resolve, 10));

class Test {
  @sync
  method() {
    const call = { arguments: [...arguments], this: this };
    this.calls = 1 + (this.calls || 0);
    return delay().then(() => call);
  }
}

describe('sync', () => {
  it('is a function', () =>
    // const sync = require('sync-decorator');
    expect(sync).to.be.a('function')
  );

  it('throws TypeError if descriptor argument is not object', () =>
    expect(() => sync({}, '', 42)).to.throw(TypeError)
  );

  it('throws TypeError if value property of descriptor argument is not function', () =>
    expect(() => sync({}, '', {})).to.throw(TypeError)
  );
});

describe('@sync', () => {
  it('appends Sync suffix to name of decorated method', () =>
    /*
    class Test {
      @sync
      method() {
        const call = { arguments: [...arguments], this: this };
        this.calls = 1 + (this.calls || 0);
        return delay().then(() => call);
      }
    }
    */
    expect((new Test).method.name).to.equal('methodSync')
  );

  it('wraps result of decorated method into promise', () =>
    expect((new Test).method()).to.be.instanceof(Promise)
  );

  it('calls decorated method with arguments passed', () =>
    (new Test).method(42, 'test').then(call =>
      expect(call.arguments).to.include.members([42, 'test'])
    )
  );

  it('calls decorated method with this binding', () =>
    (new Test).method(42, 'test').then(call =>
      expect(call.this).to.be.instanceof(Test)
    )
  );

  it('does not call decorated method again until previous call finishes', () => {
    const test = new Test;
    const promise = test.method().then(() =>
      expect(test.calls).to.equal(1)
    );
    test.method();
    return promise;
  });

  it('calls decorated method again when previous call has finished', () => {
    const test = new Test;
    test.method();
    return test.method().then(() =>
      expect(test.calls).to.equal(2)
    );
  });
});
