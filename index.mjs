'use strict';

import { CompressionTypes, Kafka } from 'kafkajs';
import { Writable } from 'stream';

const writableStream = async (
  brokers,
  topic,
  { clientId } = {
    clientId: 'kafka-bunyan'
  }
) => {
  const kafka = new Kafka({
    clientId,
    brokers: brokers
  });

  const producer = kafka.producer();
  await producer.connect();

  const stream = new Writable();
  stream._write = (chunk, encoding, next) => {
    const msg = {
      value: chunk.toString()
    };

    producer.send({
      topic,
      compression: CompressionTypes.GZIP,
      messages: [msg]
    });

    next();
  };

  return stream;
};

export { writableStream };
