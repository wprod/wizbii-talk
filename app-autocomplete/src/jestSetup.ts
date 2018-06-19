import 'jest-preset-angular';

let storage = {};

Object.defineProperty(window, 'localStorage', {
  value: {
    get length() {
      return Object.keys(storage).length;
    },
    key: index => Object.keys(storage)[index],
    getItem: key => (key in storage ? storage[key] : null),
    setItem: (key, value) => (storage[key] = value || ''),
    removeItem: key => delete storage[key],
    clear: () => (storage = {}),
  },
});
