# TypeScript 勉強会

---

## 今回の方針

構文はほとんど JS と同じなので、  
**型**のことをメインにやっていきます

---

## 動作環境

```sh
$ npm init
$ npm install -D typescript
$ npm install -D ts-node
```

or

```sh
$ git clone git@github.com:uzimaru0000/typescript-study
$ npm i
```

---

## もくじ

1. 基本的な型
2. class と interface
3. ジェネリクス
4. 特殊な型

---

## 基本的な型

TypeScript には以下のような型が存在します。

Boolean, Number, String, Array, Tuple,  
Enum, Object, Void, Null and Undefined

+++

## 型の宣言

```ts
const name: string = "uzimaru";
```

_変数名_: _型名_ で宣言する

+++

## Boolean

真偽値を表現する型  
_true_ と _false_ がある

```ts
let t: boolean = true;
let f: boolean = false;
```

+++

## Number

数値を表現する型  
整数と少数のどっちも表す

```ts
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

+++

## String

文字列を表現する型  
_"_ か _'_ で囲って表す

```ts
let color: string = "blue";
color = "red";
```

\` で囲うと _\${ expr }_ で変数を埋め込める

```ts
let age: number = 20;
let intoro: string = `My name is uzimaru. I'm ${age} years old.`;
```

+++

## Array

配列型  
JS の配列と同じ  
２つの宣言方法がある

```ts
let arr1: number[] = [1, 2, 3];
let arr2: Array<number> = [1, 2, 3];
```

+++

## Tuple

タプル型  
任意の型の組み合わせを表現できる

```ts
let name_age: [string, number] = ["uzimaru", 20];
```

+++

## Enum

列挙型  
指定がないと最初の要素から順番に 0, 1, ... と数字が振られる

```ts
enum Color {
  Red,
  Green,
  Blue
}

let color: Color = Color.Red; // color's value is 0
```

+++

## Enum

値を指定すると要素がその値になる

```ts
enum Color {
  Red = "red",
  Green = "green",
  Blue = "blue"
}

let color: Color = Color.Red; // color's value is "red"
```

+++

## Object

任意のオブジェクトを表す型

```ts
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error
```

+++

## Void

何もないことを表す型  
undefined か null を代入することができる  
専ら返り値がない関数の返り値の型として使う

```ts
function example(): void {
  console.log("hello!");
}
```

+++

## Null and Undefined

_--strictNullChecks_ オプションをつけると明示的に _null_ と _undefined_ がないと代入できなくなります。

```ts
let n: null = null;
let u: undefined = undefined;

// --strictNullChecks
let num: number = null; // error!!
```

> 可能であれば--strictNullChecks を使用することをお勧めします

---

## Class と Interface

TypeScript には _Class_ と _Interface_ があります。  
他言語の _Class_ と _Interface_ とおおよそ同じです

---

## Class

```ts
class Greeter {
  greeting: string; // メンバ（アクセス修飾子がないとpublic)

  // コンストラクタ
  constructor(message: string) {
    this.greeting = message;
  }

  // メソッド
  greet(): string {
    return "Hello, " + this.greeting;
  }
}
```

上のような構文で定義する

+++

## 継承

```ts
class Animal {
  // デフォルト引数が0
  move(distanceInMeters: number = 0) {
    console.log(`Animal moved ${distanceInMeters}m.`);
  }
}

// Animalクラスを継承
class Dog extends Animal {
  bark() {
    console.log("Woof! Woof!");
  }
}
```

クラス名の後ろに _extends_ をつけるとそのクラスを継承する。

+++

## 修飾子

_public_, _private_, _protected_, _readonly_ がある

+++

## public

- どこからでもアクセスができる

```ts
class Sample {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }

  greet(): string {
    return `Hello, My name is ${this.name}.`;
  }
}

const sample = new Sample("uzimaru");
sample.name = "shuji";
console.log(sample.greet()); // output > Hello, My name is shuji.
```

+++

## private

- クラス内のみからアクセスができる

```ts
class Sample {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }

  greet(): string {
    return `Hello, My name is ${this.name}.`;
  }
}

const sample = new Sample("uzimaru");
sample.name = "shuji"; // error!
console.log(sample.greet()); // output > Hello, My name is uzimaru.
```

+++

## protected

- クラス内とそのクラスを継承したクラスからアクセスができる

```ts
class Sample {
  protected name: string;
  constructor(name: string) {
    this.name = name;
  }

  greet(): string {
    return `Hello, My name is ${this.name}.`;
  }
}

class ExSample extends Sample {
  sayName() {
    console.log(this.name);
  }
}

const sample = new ExSample("uzimaru");
sample.name = "shuji"; // error!
console.log(sample.sayName()); // output > uzimaru.
```

+++

## readonly

- 読み取り専用 宣言時かコンストラクタで初期化する

```ts
class Sample {
  readonly name: string;
  constructor(name: string) {
    this.name = name;
  }

  greet(): string {
    return `Hello, My name is ${this.name}.`;
  }
}

const sample = new Sample("uzimaru");
sample.name = "shuji"; // error!
console.log(sample.name); // output > uzimaru
```

+++

## アクセサ

メンバのアクセス方法として _getter/setter_ があります。

```ts
class Person {
  constructor(private firstName: string, private lastName: string) {}

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(name: string) {
    const [first, last] = name.split(" ");
    this.firstName = first;
    this.lastName = last;
  }
}
```

+++

## 静的プロパティ / メソッド

クラス上に現れる、メンバ / メソッド  
アクセスする際は  
_クラス名.(メンバ名 | メソッド名)_  
とする

```ts
class Grid {
  static origin = { x: 0, y: 0 };
  calculateDistanceFromOrigin(point: { x: number; y: number }) {
    let xDist = point.x - Grid.origin.x;
    let yDist = point.y - Grid.origin.y;
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }
  constructor(public scale: number) {}
}
```

+++

## 抽象クラス

継承するクラスのために用意される基底クラス  
直接インスタンス化できません  
インターフェースとの違いはメンバに詳細な実装を含めれます

```ts
abstract class Animal {
  abstract makeSound(): void;
  move(): void {
    console.log("roaming the earth...");
  }
}
```

+++

## 抽象クラスとインターフェースの違い

|        抽象クラス        | インターフェース |
| :----------------------: | :--------------: |
|      実装を含めれる      | 実装を含めれない |
| アクセス修飾子をつけれる |  すべて public   |

---

## Interface

```ts
function printLabel(labelledObj: { label: string }) {
  console.log(labelledObj.label);
}
```

を

```ts
interface LabelledValue {
  label: string;
}
function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}
```

のように書ける

+++

## 任意のプロパティ

```ts
interface SquareConfig {
  color?: string;
  width?: number;
}
```

任意にしたいプロパティの末尾に _?_ をつけます。  
使うことのできるプロパティを表すことができ  
無いプロパティが利用されるのを防ぎます。

+++

## 読み込み専用プロパティ

```ts
interface Point {
  readonly x: number;
  readonly y: number;
}
```

_readonly_ をつけることで読み込み専用のプロパティになります

+++

## Readonly vs Const

使い分けは _const_ は変数に、_readonly_ はプロパティにつかいます

+++

## Function 型

プロパティを持つオブジェクトを定義することに加え  
関数の型を定義することができる

```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}
```

型チェックにおいては引数の名前は一致しなくても大丈夫です

+++

## インターフェースの実装

クラスにインターフェースを実装させることができます

```ts
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date);
}
class Clock implements ClockInterface {
  currentTime: Date;
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) {}
}
```

**interface は必ず public です**
