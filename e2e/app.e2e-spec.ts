import { BeetpsitPage } from './app.po';

describe('beetpsit App', function() {
  let page: BeetpsitPage;

  beforeEach(() => {
    page = new BeetpsitPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
