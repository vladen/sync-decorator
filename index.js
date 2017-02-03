'option strict';

const promise = Symbol;

function sync(method, $this, $arguments) {
  return $this[promise] = ($this[promise] || Promise.resolve()).then(() =>
    method.apply($this, $arguments)
  );
}

function wrap(method) {
  return Function(
    'method', 'sync',
    `return function ${method.name}Sync() { return sync(method, this, arguments); }`
  )(method, sync);
}

module.exports = function syncDecorator(target, key, descriptor) {
  descriptor.value = wrap(descriptor.value);
  return descriptor;
};
