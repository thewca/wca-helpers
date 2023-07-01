import { getEventName, getEventResultType } from '../src/helpers/event';

describe('Event Helper', function () {
  describe('getEventName', function () {
    it('Returns full event name for the given event id', function () {
      expect(getEventName('333')).toEqual('3x3x3 Cube');
      expect(getEventName('333mbf')).toEqual('3x3x3 Multi-Blind');
      expect(getEventName('mmagic')).toEqual('Master Magic');
    });
  });

  describe('getEventResultType', function () {
    it('Returns appropriate result type for the given event id', function () {
      expect(getEventResultType('333')).toEqual('time');
      expect(getEventResultType('sq1')).toEqual('time');
      expect(getEventResultType('333fm')).toEqual('number');
      expect(getEventResultType('333mbf')).toEqual('multi');
      expect(getEventResultType('333mbo')).toEqual('multi');
    });
  });
});
