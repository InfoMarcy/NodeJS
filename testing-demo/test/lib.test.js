const lib = require("../lib");
const db = require("../db");
const mail = require("../mail");
//test('Our first test', ()=> {
//throw new Error('something failed');
//});

describe("absolute", () => {
  it(" -should return a positive number if input is positive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it(" -should return a positive number if input is negative", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it(" -should return a 0 number if input is 0", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });
});

describe("greet", () => {
  it("should return the greeting message", () => {
    const result = lib.greet("Marcy");
    expect(result).toMatch(/Marcy/);
    expect(result).toContain("Marcy");
  });
});

describe("getCurrencies", () => {
  it("should return supported currencies", () => {
    const result = lib.getCurrencies();

    //proper way
    expect(result).toContain("USD");

    //ideal way
    expect(result).toEqual(expect.arrayContaining(["EUR", "USD", "AUD"]));
  });
});

describe("getProducts", () => {
  it("should return the product with the given id", () => {
    const result = lib.getProduct(1);
    //  expect(result).toEqual({ id: 1, price: 10});
    expect(result).toMatchObject({ id: 1, price: 10 });
    expect(result).toHaveProperty("id", 1);
  });
});

// Testing exceptions
describe("registerUser", () => {
  it("should throw if username is falsy", () => {
    //Null  undefined NaN '' 0 false
    const args = [null, undefined, NaN, "", 0, false];

    args.forEach(a => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });

  it("should return a user object if valid username is passed", () => {
    const result = lib.registerUser("Marcy");
    expect(result).toMatchObject({ username: "Marcy" });
    expect(result.id).toBeGreaterThan(0);
  });
});

//Simple Mock unit test a function who talks to an external resourse
describe("applyDiscount", () => {
  it("should apply 10% discount if customer has more than 10 points", () => {
    // fake or mock function which replace the original function
    db.getCustomerSync = function(customerId) {
      console.log("Fake reading customer...");
      return { id: customerId, points: 20 };
    };

    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});
// https://jestjs.io/

describe("notifyCustomer", () => {
  it("should send an email to the customer", () => {
    //modify the getCustomerSync with anew function
    db.getCustomerSync = function(customerId) {
      return { email: "a" };
    };

    let mailSent = false;
    //modify the mail function for a fake one
    mail.send = function(email, message) {
      mailSent = true;
    };

    lib.notifyCustomer({ customerId: 1 });
    expect(mailSent).toBe(true);
  });
});

// Better way
describe("notifyCustomer", () => {
  it("should send an email to the customer", () => {
    const mockFunction = jest.fn();
    // mockFunction.mockReturnValue(1);
    // mockFunction.mockResolvedValue(1); // promise
    // mockFunction.mockRejectedValue(new Error('......')) // promise
    //const result = await mockFunction();

    //modify the getCustomerSync with anew function
    db.getCustomerSync = jest.fn().mockReturnValue({ email: "a" });
    //modify the mail function for a fake one
    mail.send = jest.fn();
    
    lib.notifyCustomer({ customerId: 1 });

     expect(mail.send).toHaveBeenCalled();
      expect(mail.send.mock.calls[0][0]).toBe('a');
      expect(mail.send.mock.calls[0][1]).toMatch(/order/);
  });
});
