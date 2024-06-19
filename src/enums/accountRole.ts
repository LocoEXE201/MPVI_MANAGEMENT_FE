export enum AccountRoleCode {
   SUPER_ADMIN = "tTjEu2THQ4ByaQw",
   WAREHOUSE_MANAGER = "1wtugVFlv02cSXe",
   ECONOMIC_LEAD = "rYYN11bgVaSOUgX",
   MEMBER = "cNzPg1zavfka4sg",
   CUSTOMER = "He1IvaUw5je5FPk",
   ANYNOMOUS = "I3IUW7v9SjYkXxY",
}

export enum AccountRoleString {
   SUPER_ADMIN = "MPVI_SUPER_ADMIN",
   WAREHOUSE_MANAGER = "MPVI_WAREHOUSE_MANAGER",
   ECONOMIC_LEAD = "MPVI_ECONOMIC_LEAD",
   MEMBER = "MPVI_MEMBER",
   CUSTOMER = "MPVI_CUSTOMER",
   ANYNOMOUS = "ANYNOMOUS",
}

export enum AccountRoleName {
   SUPER_ADMIN = "SUPER ADMIN",
   WAREHOUSE_MANAGER = "QUẢN LÝ KHO",
   ECONOMIC_LEAD = "TRƯỞNG BAN KINH TẾ",
   MEMBER = "THÀNH VIÊN",
   CUSTOMER = "KHÁCH HÀNG",
   ANYNOMOUS = "ANYNOMOUS",
}

export const checkRoleCode = (role: any) => {
   switch(role) {
      case AccountRoleString.SUPER_ADMIN:
         return AccountRoleCode.SUPER_ADMIN;
      case AccountRoleString.WAREHOUSE_MANAGER:
         return AccountRoleCode.WAREHOUSE_MANAGER;
      case AccountRoleString.ECONOMIC_LEAD:
         return AccountRoleCode.ECONOMIC_LEAD;
      case AccountRoleString.MEMBER:
         return AccountRoleCode.MEMBER;
      case AccountRoleString.CUSTOMER:
         return AccountRoleCode.CUSTOMER;
      default:
      return AccountRoleCode.ANYNOMOUS
   }
}

export const checkRoleString = (role: any) => {
   switch(role) {
      case AccountRoleCode.SUPER_ADMIN:
         return AccountRoleName.SUPER_ADMIN;
      case AccountRoleCode.WAREHOUSE_MANAGER:
         return AccountRoleName.WAREHOUSE_MANAGER;
      case AccountRoleCode.ECONOMIC_LEAD:
         return AccountRoleName.ECONOMIC_LEAD;
      case AccountRoleCode.MEMBER:
         return AccountRoleName.MEMBER;
      case AccountRoleCode.CUSTOMER:
         return AccountRoleName.CUSTOMER;
      default:
      return AccountRoleName.ANYNOMOUS
   }
}
