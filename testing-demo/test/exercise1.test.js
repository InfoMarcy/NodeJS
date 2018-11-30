const lib = require('../exercises/exercise1');

describe('FizzBuzz', ()=> {
it('should throw an exception if input is not a number', () => {

    expect(() => {lib.fizzBuzz('a')});
    expect(() => {lib.fizzBuzz('null')});
    expect(() => {lib.fizzBuzz('undefined')});
});

it('should return FizzBuzz if input is divisible by 3 and 5', () => {
    const result = lib.fizzBuzz(15);
    expect(result).toBe('FizzBuzz');
});


it('should return Fizz if input is divisible by 3', () => {
    const result = lib.fizzBuzz(3);
    expect(result).toBe('Fizz');
});

it('should return FizzBuzz if input is divisible by 5', () => {
    const result = lib.fizzBuzz(5);
    expect(result).toBe('Buzz');
});



it('should return the input if input is not divisible by 5 or 5', () => {
    const result = lib.fizzBuzz(17);
    expect(result).toBe(17);
});


});