import { CalculationMethod, CalculationParameters } from 'adhan'
import type { NextRequest } from 'next/server'
import { DateData, getHijriDate, getHijriDateString } from '../../../lib/hijri-dates'
import { getPrayerTimes } from '../../../lib/prayer-times'
import { calculationMethodMappings, defaultCalculationMethod, madhabMappings } from '../../../lib/prayer-times-params-mapping'
import { Coordinates } from '../../../lib/types'

// return coordinate from request's querystring if available
// otherwise detect coordinate by IP
const getCoordinate = (req: NextRequest): Coordinates => {
  const { geo } = req

  const latitude = req.nextUrl.searchParams.get('latitude')
  const longitude = req.nextUrl.searchParams.get('longitude')

  if (latitude && longitude)
    return {
      latitude: Number(latitude),
      longitude: Number(longitude),
    }

  // @ts-ignore nextjs' typing is incorrect
  return { latitude: geo.latitude, longitude: geo.longitude }
}

const getPrayerTimesParams = (req: NextRequest):CalculationParameters => {
  const calculationMethodParams = req.nextUrl.searchParams.get('calculationMethod')
  const calculationMethod = calculationMethodMappings[calculationMethodParams] || defaultCalculationMethod

  const madhabParams = req.nextUrl.searchParams.get('madhab')
  const madhab = madhabMappings[madhabParams]
  if (madhab) {
    calculationMethod.madhab = madhab
  }

  return calculationMethod
}

const getDateData = (req: NextRequest): DateData => {
  const date = req.nextUrl.searchParams.get('date')
  const month = req.nextUrl.searchParams.get('month')
  const year = req.nextUrl.searchParams.get('year')

  return  {
    date: Number(date),
    month: Number(month),
    year: Number(year)
  }
}

export const middleware = (req: NextRequest) => {
  const { geo } = req
  const coordinates = getCoordinate(req)
  const prayerTimesParams = getPrayerTimesParams(req)
  const prayerTimes = getPrayerTimes(coordinates, prayerTimesParams)
  const hijriDateData = getHijriDate(getDateData(req))

  const data = {
    geo,
    prayerTimes,
    hijriDate: getHijriDateString(hijriDateData),
    hijriDateData: hijriDateData,
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Access-Control-Allow-Credentials":"true",
      "Access-Control-Allow-Origin":"*",
      "Access-Control-Allow-Methods":"GET,OPTIONS,PATCH,DELETE,POST,PUT",
      "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
      'Content-Type': 'application/json',
    },
  })
}
