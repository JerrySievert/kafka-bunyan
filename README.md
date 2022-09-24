# Kafka-Bunyan

A very simple kafka stream implementation for bunyan.

## Usage

```
import { writableStream } from 'kafka-bunyan';

const stream = writableStream(['127.0.0.1:9092'], 'logs');

var log = bunyan.createLogger('myLogger');
log.addStream({
  stream,
  level: "debug"
});
```
