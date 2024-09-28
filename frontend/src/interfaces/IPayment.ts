export interface PaymentInterface {
    ID?: number;
    PaymentMethodName?: string //วิธีการชำระ
	Amount?:            number//จำนวนเงิน
    MemberID?:          number //รหัสสมา��ิก
    PackageID?: number
}
