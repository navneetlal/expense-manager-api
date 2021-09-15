import { createHmac, pseudoRandomBytes, timingSafeEqual } from 'crypto';

function bufferEqual(a: Buffer, b: Buffer) {
  if (a.length !== b.length) {
    return false;
  }
  return timingSafeEqual(a, b);
}

function timeSafeCompare(a: string, b: string) {
  const sa = String(a);
  const sb = String(b);
  const key = pseudoRandomBytes(32);
  const ah = createHmac('sha256', key).update(sa).digest();
  const bh = createHmac('sha256', key).update(sb).digest();

  return bufferEqual(ah, bh) && a === b;
}

export default timeSafeCompare;