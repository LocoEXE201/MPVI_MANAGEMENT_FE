export enum AccountRoleCode {
   SUPER_ADMIN = "D54C9BFA74772AA903F2B2E75B6F2E904CD78E211E84F0F5DC7CFDAF1EC8425E",
   WAREHOUSE_MANAGER = "035EFFEC9B01FEA585CE58965864F4BDA5A3B1F53875490BAD28B03FDA3F1A6B",
   ECONOMIC_LEAD = "DD3AAC2160E629D89A195477696BCD3CB6E7B6B4462A65C321783E9DBBB35DFA",
   MEMBER = "5FCDC8D522F265D0E4556A688F98270AA5B50C0D52ECCEBE17B371EA396A9424",
   CUSTOMER = "DE180E98F86B1D361913D97CF14966448CD57BEBc886710FC5A2CF1F6DA65222",
   ANYNOMOUS = "89A6CF1565A680AAC3F698C0D56DEBE9DF977E89DA38357651A648073AF825A4",
}

export enum AccountRoleString {
   SUPER_ADMIN = "MPVI_SUPER_ADMIN",
   WAREHOUSE_MANAGER = "MPVI_WAREHOUSE_MANAGER",
   ECONOMIC_LEAD = "MPVI_ECONOMIC_LEAD",
   MEMBER = "MPVI_MEMBER",
   CUSTOMER = "MPVI_CUSTOMER",
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
