import add from './add';

describe('第一個測試套件', function() {
    it('第一個測試案例: 1+1 === 2', function() {
        expect(1 + 1).toBe(2);
    });
    it('第二個測試案例: 1+1 === 2', function() {
        expect(1 + 1).toBe(2);
    });
});

describe('第二個測試套件', function() {
    it('第一個測試案例: 1+1 === 2', function() {
        expect(add(1, 1)).toBe(2);
    });
    it('第二個測試案例: 1+1 === 2', function() {
        expect(add()).toBe(0);
    });
    it('第二個測試案例: 1+1 === 2', function() {
        expect(add(1)).toBe(1);
    });
    it('第二個測試案例: 1+1 === 2', function() {
        expect(add(undefined, 1)).toBe(2);
    });
});