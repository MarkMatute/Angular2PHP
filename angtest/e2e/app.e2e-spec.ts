import { AngtestPage } from './app.po';

describe('angtest App', function() {
  let page: AngtestPage;

  beforeEach(() => {
    page = new AngtestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
