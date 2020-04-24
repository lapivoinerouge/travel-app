import { countDays } from "../client/js/dateProcessor";

test('should return 5', () => {
  let date = new Date();
  date.setDate(date.getDate()+5);

  const result = countDays(date);
  expect(result).toBe(5);
});