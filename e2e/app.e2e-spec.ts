import { MusiclubAdminPage } from './app.po';

describe('musiclub-admin App', () => {
  let page: MusiclubAdminPage;

  beforeEach(() => {
    page = new MusiclubAdminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
