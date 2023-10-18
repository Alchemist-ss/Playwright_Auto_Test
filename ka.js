const handleGetServerResponse = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("response")
    }, 1000)
  })
}

const handleAwait = () => {
  handleGetServerResponse()
}