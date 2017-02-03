# TOC
   - [sync](#sync)
   - [@sync](#sync)
<a name=""></a>
 
<a name="sync"></a>
# sync
is a function.

```js
// const sync = require('sync-decorator');
  expect(sync).to.be.a('function')
```

throws TypeError if descriptor argument is not object.

```js
expect(() => sync({}, '', 42)).to.throw(TypeError)
```

throws TypeError if value property of descriptor argument is not function.

```js
expect(() => sync({}, '', {})).to.throw(TypeError)
```

<a name="sync"></a>
# @sync
appends Sync suffix to name of decorated method.

```js
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
  expect(new Test().method.name).to.equal('methodSync')
```

wraps result of decorated method into promise.

```js
expect(new Test().method()).to.be.instanceof(Promise)
```

calls decorated method with arguments passed.

```js
new Test().method(42, 'test').then(call => expect(call.arguments).to.include.members([42, 'test']))
```

calls decorated method with this binding.

```js
new Test().method(42, 'test').then(call => expect(call.this).to.be.instanceof(Test))
```

does not call decorated method again until previous call finishes.

```js
const test = new Test();
const promise = test.method().then(() => expect(test.calls).to.equal(1));
test.method();
return promise;
```

calls decorated method again when previous call has finished.

```js
const test = new Test();
test.method();
return test.method().then(() => expect(test.calls).to.equal(2));
```

