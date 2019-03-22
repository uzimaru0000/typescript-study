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
