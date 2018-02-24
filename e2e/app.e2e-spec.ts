import { PaediactricsExpertPage } from './app.po';

describe('paediactrics-expert App', () => {
  let page: PaediactricsExpertPage;

  beforeEach(() => {
    page = new PaediactricsExpertPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
