import { readFileSync } from 'node:fs'

function date(value){
  if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))throw new Error('Invalid ISO date')
  const time=Date.parse(value)
  if(!Number.isFinite(time)||new Date(time).toISOString().slice(0,10)!==value)throw new Error('Invalid calendar date')
  return time/86400000
}
function analyze({capacity,stays}){
  if(!Number.isInteger(capacity)||capacity<1||!Array.isArray(stays))throw new Error('Invalid campground input')
  const counts=new Map()
  for(const [arrival,departure] of stays){
    const start=date(arrival),end=date(departure)
    if(end<=start||end-start>366)throw new Error('Stay must be 1–366 nights')
    for(let day=start;day<end;day++)counts.set(day,(counts.get(day)??0)+1)
  }
  const days=[...counts].sort(([a],[b])=>a-b).map(([day,occupied])=>({date:new Date(day*86400000).toISOString().slice(0,10),occupied}))
  const peak=days.reduce((highest,{occupied})=>Math.max(highest,occupied),0)
  return {peak,overflowDays:days.filter(day=>day.occupied>capacity).map(day=>day.date),days}
}

try {
  if (process.argv.length !== 3) throw new Error('Usage: node app.mjs input.json')
  console.log(JSON.stringify(analyze(JSON.parse(readFileSync(process.argv[2], 'utf8')))))
} catch (error) {
  console.error(error.message)
  process.exitCode = 2
}
