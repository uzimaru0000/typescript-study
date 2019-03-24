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
