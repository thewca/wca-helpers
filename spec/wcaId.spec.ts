import testCases from './support/utils';
import { isWcaId } from '../src/helpers/wcaId';

describe('wcaId Helper', function () {
  testCases(['2015mans', '2015mans0', 'mans04', 'mans'], function (val) {
    it('returns false when not WCA Id', function () {
      expect(isWcaId(val)).toBeFalsy();
    });
  });

  testCases(['2015mans04', '2015MANS04'], function (val) {
    it('returns true when WCA Id', function () {
      expect(isWcaId(val)).toBeTruthy();
    });
  });
});
