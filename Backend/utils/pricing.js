const PEAK_HOUR_RANGES = [
    {start: 9, end:11},
    {start:17, end:20},
]

const PEAK_MULTIPLIER = 1.5;
const NORMAL_MULTIPLIER = 1;

const isPeakHour = (hour) => {
    return PEAK_HOUR_RANGES.some((range) => hour >=range.start && hour < range.end);
};

const getPeakMultiplier = (bookingStartHour) => {
  return isPeakHour(bookingStartHour) ? PEAK_MULTIPLIER : NORMAL_MULTIPLIER;
};

const calculateFinalPrice = ({ pricePerHour, hours, bookingStartHour }) => {
  let totalPrice = 0;
  let peakHoursCount = 0;

  for (let i = 0; i < hours; i++) {
    const hour = bookingStartHour + i;
    const multiplier = isPeakHour(hour) ? PEAK_MULTIPLIER : NORMAL_MULTIPLIER;
    totalPrice += pricePerHour * multiplier;
    if (isPeakHour(hour)) peakHoursCount++;
  }

  const finalPrice = Math.round(totalPrice);
  const peakMultiplier = peakHoursCount > 0 ? (peakHoursCount / hours) * PEAK_MULTIPLIER + ((hours - peakHoursCount) / hours) * NORMAL_MULTIPLIER : NORMAL_MULTIPLIER;

  return { finalPrice, peakMultiplier };
};

module.exports = { calculateFinalPrice, getPeakMultiplier, isPeakHour };