class JaspeError extends Error {
  constructor ({code, from, message}) {
    super(message || code)
    this.code = code
    this.from = from || ''
  }

  longMessage () {
    return this.from ? `${this.message} from: ${this.from}` : this.message
  }
}

module.exports = JaspeError
