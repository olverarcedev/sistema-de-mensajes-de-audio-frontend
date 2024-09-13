import counterReducer, {
  initializeCount,
  increment,
  decrement,
  incrementByAmount,
} from "../../lib/features/counter/counterSlice";

describe("counter reducer", () => {
  const initialState = { value: 0 };

  it("should handle initial state", () => {
    expect(counterReducer(undefined, { type: "unknown" })).toEqual({
      value: 0,
    });
  });

  it("should handle initializeCount", () => {
    const actual = counterReducer(initialState, initializeCount(10));
    expect(actual.value).toEqual(10);
  });

  it("should handle increment", () => {
    const actual = counterReducer(initialState, increment());
    expect(actual.value).toEqual(1);
  });

  it("should handle decrement", () => {
    const actual = counterReducer({ value: 1 }, decrement());
    expect(actual.value).toEqual(0);
  });

  it("should handle incrementByAmount", () => {
    const actual = counterReducer(initialState, incrementByAmount(5));
    expect(actual.value).toEqual(5);
  });
});
