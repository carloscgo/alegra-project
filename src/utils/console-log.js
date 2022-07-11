export default function consoleLog({...args}) {
  const isProduction = process.env.NODE_ENV === "production"

  if (!isProduction) {
    console.log({...args})
  }
}
