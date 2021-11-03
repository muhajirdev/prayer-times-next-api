import type { NextRequest } from 'next/server'
import { getHijriDate } from '../../../lib/hijri-dates'
import { getPrayerTimes } from '../../../lib/prayer-times'
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

export const middleware = (req: NextRequest) => {
  const { geo } = req
  const coordinates = getCoordinate(req)
  const prayerTimes = getPrayerTimes(coordinates)
  const hijriDate = getHijriDate()

  const data = {
    geo,
    prayerTimes,
    hijriDate,
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
