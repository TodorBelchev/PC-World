import { HttpMixedContentPipe } from './http-mixed-content.pipe';

describe('HttpMixedContentPipe', () => {
  it('create an instance', () => {
    const pipe = new HttpMixedContentPipe();
    expect(pipe).toBeTruthy();
  });
});
