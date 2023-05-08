export function getBusIds(buses) {
    const busIds = []
    buses.forEach((bus) => {
        busIds.push(bus.id)
    })
    return busIds.join(',')
}