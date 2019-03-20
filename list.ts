type Cons<T> = { readonly type_: "node"; next: List<T>; value: T };
class List<T> {
  static Nil: { readonly type_: "nil" } = { type_: "nil" };
  private list: typeof List.Nil | Cons<T>;

  constructor();
  constructor(value: T);
  constructor(value: T, next: List<T>);
  constructor(value?: T, next?: List<T>) {
    if (!value) {
      this.list = List.Nil;
    } else if (!next) {
      this.list = this.nodeInstance(new List<T>(), value);
    } else {
      this.list = this.nodeInstance(next, value);
    }
  }

  private nodeInstance(next: List<T>, value: T): Cons<T> {
    return { type_: "node", next, value };
  }

  push(value: T): List<T> {
    const newList = new List<T>();
    newList.list = this.nodeInstance(this, value);
    return newList;
  }

  pop(): [List<T>, T] {
    switch (this.list.type_) {
      case "nil":
        return [this, null];
      case "node":
        return [this.list.next, this.list.value];
    }
  }

  map<U>(func: (val: T) => U): List<U> {
    if (this.list.type_ === "nil") {
      return new List<U>();
    }

    return new List<U>(func(this.list.value), this.list.next.map<U>(func));
  }

  toArray(): Array<T> {
    switch (this.list.type_) {
      case "nil":
        return [];
      case "node":
        return [this.list.value].concat(this.list.next.toArray());
    }
  }

  static fromArray<T>(arr: Array<T>): List<T> {
    return arr.reduce((acc, x) => new List<T>(x, acc), new List<T>());
  }
}

const empty = new List<number>();
const numList = empty.push(10).push(11);
const listFromArray = List.fromArray<number>([0, 1, 2, 3, 4, 5, 6]);

console.log(numList);
console.log(numList.pop());
console.log(numList.map(x => x * 2));
console.log(numList.toArray());
console.log(listFromArray);
