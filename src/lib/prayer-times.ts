import adhan from 'adhan'
import { Coordinates } from './types'

/**
 * Given a coordinate and a calculation method get the prayer times for this coordinate
 * @param coordinates Coordinates
 * @returns prayer times
 */
export const getPrayerTimes = (
  coordinates: Coordinates,
  calculationMethod: adhan.CalculationParameters = adhan.CalculationMethod.MuslimWorldLeague()
) => {
  const date = new Date()
  const prayerTimes = new adhan.PrayerTimes(
    new adhan.Coordinates(coordinates.latitude, coordinates.longitude),
    date,
    calculationMethod
  )

  return {
    fajrTime: prayerTimes.fajr,
    sunriseTime: prayerTimes.sunrise,
    dhuhrTime: prayerTimes.dhuhr,
    asrTime: prayerTimes.asr,
    maghribTime: prayerTimes.maghrib,
    ishaTime: prayerTimes.isha,
  }
}
