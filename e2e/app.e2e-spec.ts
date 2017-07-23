import { Hbsis.SitePage } from './app.po';

describe('hbsis.site App', () => {
  let page: Hbsis.SitePage;

  beforeEach(() => {
    page = new Hbsis.SitePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
