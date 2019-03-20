# TypeScript 勉強会

---

## 今回の方針

構文はほとんど JS と同じなので、  
型のことをメインにやっていきます

---

## 動作環境

```sh
$ npm install -D typescript
$ npm install -D ts-node
```

---

## もくじ

1. 基本的な型
2. リテラル型
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

`変数名`: `型名` で宣言する

+++

## Boolean

真偽値を表現する型  
`true` と `false` がある

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
`"` か `'` で囲って表す

```ts
let color: string = "blue";
color = "red";
```

\` で囲うと `${ expr }` で変数を埋め込める

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

`null` と `undefined` を表す型  
`null` と `undefined` はすべての型のサブタイプなのでどの変数にも代入可能です。  
しかし、`--strictNullChecks` オプションをつけると明示的に`null`と`undefined` がないと代入できなくなります。

```ts
let n: null = null;
let undefined: undefined = undefined;

// --strictNullChecks
let num: number = null; // error!!
```

---
