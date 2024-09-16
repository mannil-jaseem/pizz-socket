interface IOrder {
    ORDER_ID: string;
    ITEMS: IOrderItem[];
    STATUS: 'Pending' | 'In-progress' | 'Completed';
  }
  interface IOrderItem {
    MENU_ID: string;
    QUANTITY: number;
    TYPE: 'Food' | 'Drink';
  }
export class Preperation{
  // calculate prep time for an order
    public async getFoodprepTime(order:IOrder){
            let pizzaCount = 0;
            order.ITEMS.forEach(item => {
              if (item.TYPE === 'Food') { 
                pizzaCount += item.QUANTITY;
              }
            });
        
            return pizzaCount * 5 
    }
}