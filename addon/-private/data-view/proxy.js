export default class Proxy {
  constructor(key, ref) {
    this.key = key; // string
    this.ref = ref;
    this.index = 0;
    this.begin_bound_offset = 0;
    this.end_bound_offset = 0;
    this.scalar = 0;
  }
}

const NULL_INT = 0;

class LazySkipList {
  constructor(data) {
    let size = this.length = data.length;
    this.keys = new Array(size);
    this.bounds = new Uint16Array(3 * size);
    this.data = data;
  }

  get() {

  }

  set() {

  }
}
