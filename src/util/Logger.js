/**
 *
 */
export default class Logger {

  constructor(category, level) {
    this._category = category;
    this._level = level || Logger.Level.INFO;
  }

  get category() {
    return this._category;
  }

  get level() {
    return this._level;
  }

  set level(val) {
    this._level = val;
  }

  debug(...message) {

  }

  error(...message) {

  }

  info(...message) {
    if (this.level === Logger.Level.INFO) {
      console.log('[ INFO] ' + this.category + ' - ' + message);
    }
  }
}

Logger.Level = class {

  constructor(value, title) {
    this._value = value;
    this._title = title;
  }

  get title() {
    return this.title;
  }

  valueOf() {
    return this._value;
  }
};

Logger.Level.INFO = new Logger.Level(100, 'INFO');
Logger.Level.DEBUG = new Logger.Level(200, 'DEBUG');
Logger.Level.TRACE = new Logger.Level(50, 'TRACE');
Logger.Level.WARN = new Logger.Level(300, 'WARN');
Logger.Level.ERROR = new Logger.Level(400, 'ERROR');
// Logger.Level = Object.freeze({
//   TRACE: Symbol('TRACE'),
//   INFO: Symbol('INFO'),
//   DEBUG: Symbol('DEBUG'),
//   WARN: Symbol('WARN'),
//   ERROR: Symbol('ERROR')
// });
