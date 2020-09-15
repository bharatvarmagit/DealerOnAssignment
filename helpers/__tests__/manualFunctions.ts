export {}
import {getQuantity} from './../manualFunctions'

jest.mock('prompt-sync');
const prompt = require('prompt-sync');

// reset prompt mock function
beforeEach(()=>{
  prompt.mockReset();
})
describe("test getQuantity",()=>{
  it("recieve wrong input first time then correct input second time",()=>{
    //return a string first time
    prompt.mockImplementationOnce(() => "abc");
    // return a number in string format second time
    prompt.mockImplementationOnce(() => "42");
    // prompt shoudnt be called third time
    prompt.mockImplementationOnce(() => "23");
    expect(getQuantity()).toEqual(42);
  })

  it("recieves", () => {
    prompt.mockImplementationOnce(() => "21");
    //shouldnt be called second time
    prompt.mockImplementationOnce(() => "42");
    expect(getQuantity()).toEqual(21);
  })
})
