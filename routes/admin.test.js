const Routes=require("./admin");

const { getOrders, ordersStatus } = require("../controllers/adminService");
const { authCheck, adminCheck } = require("../middleware/authCheck");


jest.mock('express', () => ({
    Router: () => ({ get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn() }),
  }));
  
  describe('/admin', () => {
    it('should find get methods', () => {
      expect(Routes.get).toHaveBeenCalledTimes(1);
      expect(Routes.get).toHaveBeenCalledWith(
        '/admin/orders',
         authCheck,
         adminCheck,
         getOrders
      );
    })
    it('should find put method',()=>{
        expect(Routes.put).toHaveBeenCalledTimes(1);
        expect(Routes.put).toHaveBeenCalledWith(
            "/admin/order-status",
            authCheck,
            adminCheck,
            ordersStatus
        )
     })
  }) 