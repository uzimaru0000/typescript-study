# TypeScript 勉強会

---

## 今回の方針

構文はほとんど JS と同じなので、  
**型** のことをメインにやっていきます

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
const add = (a: number, b: number): number => a + b;
function sub(a: number, b: number): number {
  return a - b;
}
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

+++

## Never 型

- 全体に return されない関数（無限ループ）
- 常に throw する関数

の戻り値の型に使われるなど

+++

## 利用例

```ts
function foo(x: string | number): boolean {
  if (typeof x === "string") {
    return true;
  } else if (typeof x === "number") {
    return false;
  }

  return fail("Unexhaustive!");
}

function fail(message: string): never {
  throw new Error(message);
}
```

網羅チェックに使う  
引数に対して網羅的なチャックがされていなかったらエラーを返す

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

---

## ジェネリクス

1 つの型ではなく様々な型で動作する関数 ・クラス・インターフェイスを作成できる仕組み

+++

## ジェネリクスの書き方

```ts
function identity<T>(arg: T): T {
  return arg;
}
const identity = <T>(arg: T): T => arg;
```

_function_ のときは _function_ _関数名<型名>(引数)..._  
_アロー関数_ のときは _<型名>(引数)..._  
で宣言する

+++

## ジェネリクスを使う理由

Collection 型 (List や Array) を考えてみる

+++

## ジェネリクスを使う理由

### ジェネリクスがないとき

```ts
// number用のリスト
class NumList { ... }
// string用のリスト
class StringList { ... }
// Hogeクラスのリスト
class HogeList { ... }
// 最終手段
class AnyList { ... }
```

リストを作りたい型が増えるたび  
_~~List_ を実装しないと行けない...

+++

## ジェネリクスを使う理由

### ジェネリクスを使う

```ts
class MyList<T> { ... }
```

ジェネリクスを使うことで任意の型に対し抽象化できる!

+++

## ジェネリクスの制約

渡された引数の _length_ を返す関数を考える

```ts
const getLength = <T>(arg: T): number => arg.length;
```

+++

## ジェネリクスの制約

### 問題点

型 _T_ に _length_ というプロパティがなかったらランタイムエラーが発生してしまう。

+++

## ジェネリクスの制約

### 改善策

```ts
interface HasLength {
  length: number;
}

const getLength = <T extends HasLength>(arg: T): number => arg.length;
```

- インターフェイスで _length_ があることを保証する
- それを実装している型という制約をつける

+++

## クラスの型で有ることを規制する

ファクトリ関数を作ることを考えると  
型はクラス（コンストラクタがある）ことを保証しないといけない

```ts
// cにconstructorが定義されているか判断する
function create<T>(c): T {
  return new c();
}
```

+++

## クラスの型で有ることを規制する

```ts
function create<T>(c: { new(): T }) => new c();
```

コンストラクタがあるということは  
_{new(): T}_ を実装しているということ

---

## 特殊な型

- Intersection 型
- Union 型
- 型エイリアス
- 文字列リテラル型
- 代数的データ型

+++

## Intersection 型

複数の型を１つに連結したもの  
_A かつ B_ という型

```ts
interface Hoge {
  foo: string;
  bar: number;
}
interface Tag {
  tag: string;
}

const Obj: Hoge & Tag = {
  foo: "examle",
  bar: 42,
  tag: "test"
};
```

+++

## Union 型

_A または B_ という型

```ts
function padLeft(value: string, padding: any) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}
padLeft("Hello world", 4);
padLeft("Hello world", true); // run time error!!
```

+++

## Union 型

_any_ を使うとなんでも渡せてしまうのでランタイムエラーの心配がある

```ts
function padLeft(value: string, padding: number | string) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
}
padLeft("Hello world", 4);
padLeft("Hello world", true); // compile error!!
```

+++

## 型の保護と識別

```ts
interface Fish {
  swim();
  layEggs();
}
interface Bird {
  fly();
  layEggs();
}

const getPet = (): Fish | Bird => { ... }

const pet = getPet();
pet.layEggs();
pet.swim(); // Error
```

ランタイムで _pet_ が _Bird_ だったらエラーになってしまうのでコンパイルエラー

+++

## 型の保護と識別

```ts
const pet = getPet();

// if (pet.swim) <- エラー
if ((<Fish>pet).swim) {
  (<Fish>pet).swim();
} else {
  (pet as Bird).fly();
}
```

型注釈をして判定する

+++

## 型の保護と識別

ユーザー定義の型の保護をする関数を作る  
「型述語」を返す関数を定義する

```ts
function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined;
}

if (isFish(pet)) {
  // pet type's is Fish
  pet.swim();
} else {
  // pet type's is Bird
  pet.fly();
}
```

+++

## 型エイリアス

既存の型に別の型名をつけることが可能  
コードの可読性が上がる

+++

## 型エイリアス

```ts
type FirstName = string;
type LastName = string;
type FullName = [string, string];
type Name = FirstName | LastName | FullName;

const callName = (name: Name): void => {
  if (typeof name === "string") {
    console.log(name);
  } else {
    console.log(name.join(" "));
  }
};
```

名前を表す型として _FirstName_, _LastName_, _FullName_, _Name_ を作る

+++

## 文字列リテラル型

文字列が持たなければいけない厳密な値を強制できる

+++

## 利用例

```ts
type Easing
  = 'ease-in'
  | 'ease-out'
  | 'ease-in-out'

function EaseAnimation(func: Easing) { ... }
```

_Easing_ という型は、 _'ease-in'_, _'ease-out'_, _'ease-in-out'_ という  
３つの文字列の値しか受け付けない型

+++

## 利用例

```ts
function createElement(tagName: "img"): HTMLImageElement;
function createElement(tagName: "input"): HTMLInputElement;
// ... その他のオーバーロード ...
function createElement(tagName: string): Element {
  // ... 処理コード ...
}
```

オーバーロードを区別する方法として利用

+++

## 代数的データ型

1 個以上のオブジェクトがあり、各オブジェクトには 0 個以上の要素がある型  
３つの要素で表現できる

1. 文字列リテラル型
2. Union 型
3. 型の保護

+++

## 利用例

形を表現する型を考える

```ts
interface Square {
  //正方形
  kind: "square";
  size: number; //サイズ
}
interface Rectangle {
  //長方形
  kind: "rectangle";
  width: number; //幅
  height: number; //高さ
}
interface Circle {
  //円
  kind: "circle";
  radius: number; //半径
}
```

+++

## 利用例

```ts
type Shape = Square | Rectangle | Circle;

function area(s: Shape) {
  //面積
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.height * s.width;
    case "circle":
      return Math.PI * s.radius ** 2;
  }
}
```

各 interface を UnionType で _Shape_ 型にして _kind_ で「型の保護」をしている

---

## 質問タイム
