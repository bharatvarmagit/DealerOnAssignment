export {}
import {getQuantity,getName,getIsImported} from '../manualFunctions'

jest.mock('prompt-sync');
const prompt = require('prompt-sync');

// reset prompt mock function
beforeEach(()=>{
  prompt.mockReset();
})



// test getQuantity function
// note: getUnitPrice is similar. just have to replace funtion names.

describe("test getQuantity ", () => {
  it("recieve wrong input first time then correct input second time", () => {
    //return a string first time (wrong)
    prompt.mockImplementationOnce(() => "abc");
    //return empty string second time (wrong)
    prompt.mockImplementationOnce(() => "");
    // return a number in string format third time (correct)
    prompt.mockImplementationOnce(() => "42");
    // prompt shoudnt be called fourth time
    prompt.mockImplementationOnce(() => "23");
    expect(getQuantity()).toEqual(42);
  })

  it("recieves correct input first time", () => {
    prompt.mockImplementationOnce(() => "21");
    //shouldnt be called second time
    prompt.mockImplementationOnce(() => "42");
    expect(getQuantity()).toEqual(21);
  })
})


describe("test getName ", () => {
  it("recieve wrong input first time then correct input second time", () => {
    //return a empty string first time
    prompt.mockImplementationOnce(() => "");
    // prompt shoudnt be called third time
    prompt.mockImplementationOnce(() => "hello");
    expect(getName()).toEqual("hello");
  })

  it("recieves correct input first time", () => {
    prompt.mockImplementationOnce(() => "hello");
    //shouldnt be called second time
    prompt.mockImplementationOnce(() => "4afaf");
    expect(getName()).toEqual("hello");
  })
})



describe("test getIsImported input", () => {
  it("recieve wrong input first time then correct input second time", () => {
    //return a empty string first time
    prompt.mockImplementationOnce(() => "");
    //return wrong input i.e not nN/yY
    prompt.mockImplementationOnce(()=>"m")
    //y should return true
    prompt.mockImplementationOnce(() => "y");
    expect(getIsImported()).toBeTruthy();
    //Y should return true
    prompt.mockImplementationOnce(() => "Y");
    expect(getIsImported()).toBeTruthy();
    //n should return false
    prompt.mockImplementationOnce(() => "n");
    expect(getIsImported()).toBeFalsy();
    //N should return false
    prompt.mockImplementationOnce(() => "N");
    expect(getIsImported()).toBeFalsy()
  })
})



