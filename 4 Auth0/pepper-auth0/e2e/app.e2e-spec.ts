import { PepperAuth0Page } from './app.po';

describe('pepper-auth0 App', () => {
  let page: PepperAuth0Page;

  beforeEach(() => {
    page = new PepperAuth0Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
