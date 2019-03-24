interface Fish {
  swim();
  layEggs();
}
interface Bird {
  fly();
  layEggs();
}

const getPet = (): Fish | Bird => {
  if (Math.random() > 0.5) {
    return {
      swim() {
        console.log("Swimming...");
      },
      layEggs() {
        console.log("laying eggs...");
      }
    };
  } else {
    return {
      fly() {
        console.log("flying...");
      },
      layEggs() {
        console.log("laying eggs...");
      }
    };
  }
};

const isFish = (pet: Fish | Bird): pet is Fish => {
  return (<Fish>pet).swim !== undefined;
};

const pet = getPet();
pet.layEggs();

if ((<Fish>pet).swim) {
  (<Fish>pet).swim();
} else {
  (pet as Bird).fly();
}

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}
