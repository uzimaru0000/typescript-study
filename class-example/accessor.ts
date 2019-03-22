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
