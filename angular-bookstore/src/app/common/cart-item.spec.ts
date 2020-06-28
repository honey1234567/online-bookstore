import { CartItem } from './cart-item';
const book:any={
    id: 1,
    name: "python",
    imageUrl: "assets/images/python.png",
    unitPrice: 100,
    quantity: 1
}
describe('CartItem', () => {
  it('should create an instance', () => {
    expect(new CartItem(book)).toBeTruthy();
  });
});