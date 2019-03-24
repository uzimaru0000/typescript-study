const failed = (msg: string): never => {
  throw new Error(msg);
};

const foo = (arg: string | number): boolean => {
  switch (typeof arg) {
    case "string":
      return true;
  }

  return failed("error");
};

console.log(foo(0));
