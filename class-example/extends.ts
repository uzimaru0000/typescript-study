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
