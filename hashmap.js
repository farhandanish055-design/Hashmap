class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.buckets = new Array(this.capacity).fill(null);
    this.size = 0; // berapa data ada
  }

  // utk hash function
  hash(key) {
    let hashCode = 0;
    const prime = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (prime * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
  const index = this.hash(key);

  if (!this.buckets[index]) {
    this.buckets[index] = [];
  }

  // overwrite kalau key sama
  for (let pair of this.buckets[index]) {
    if (pair[0] === key) {
      pair[1] = value;
      return;
    }
  }

  // tambah baru
  this.buckets[index].push([key, value]);
  this.size++;

  // 🔥 CHECK LOAD FACTOR
  if (this.size / this.capacity > this.loadFactor) {
    this.resize();
  }
}

get(key) {
  const index = this.hash(key);
  const bucket = this.buckets[index];

  if (!bucket) return null;

  for (let pair of bucket) {
    if (pair[0] === key) {
      return pair[1];
    }
  }

  return null;
}

has(key) {
  return this.get(key) !== null;
}

remove(key) {
  const index = this.hash(key);
  const bucket = this.buckets[index];

  if (!bucket) return false;

  for (let i = 0; i < bucket.length; i++) {
    if (bucket[i][0] === key) {
      bucket.splice(i, 1);
      this.size--;
      return true;
    }
  }

  return false;
}

length() {
  return this.size;
}

clear() {
  this.buckets = new Array(this.capacity).fill(null);
  this.size = 0;
}

keys() {
  let result = [];

  for (let bucket of this.buckets) {
    if (bucket) {
      for (let pair of bucket) {
        result.push(pair[0]);
      }
    }
  }

  return result;
}

values() {
  let result = [];

  for (let bucket of this.buckets) {
    if (bucket) {
      for (let pair of bucket) {
        result.push(pair[1]);
      }
    }
  }

  return result;
}

entries() {
  let result = [];

  for (let bucket of this.buckets) {
    if (bucket) {
      for (let pair of bucket) {
        result.push(pair);
      }
    }
  }

  return result;
}

resize() {
  const oldBuckets = this.buckets;

  this.capacity *= 2;
  this.buckets = new Array(this.capacity).fill(null);
  this.size = 0;

  for (let bucket of oldBuckets) {
    if (bucket) {
      for (let pair of bucket) {
        this.set(pair[0], pair[1]);
      }
    }
  }
}

}

module.exports = HashMap;