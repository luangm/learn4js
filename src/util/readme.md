# Logger

Similar API as Log4j

example code:

```javascript
import {Logger} from "learn4js";

let log = new Logger("ABC", Logger.Level.INFO);

class ABC {
  
   myMethod() {
     let x = {};
     
     log.info('Hello World');
     log.debug('This is Debug Message', x);
     log.error('What up');
     
   }
  
}


```