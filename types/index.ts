import { z } from "zod";

export interface IEventCard {
  id: string;
  title: string;
  posterUrl: string;
  venue: string;
  city: string;
  startTime: Date;
  endTime: Date;
}

export interface FAQ {
  answer: string;
  question: string;
}

export interface IEvent {
  id: string;
  title: string;
  posterUrl: string;
  description: string;
  venue: string;
  city: string;
  gmapUrl: string;
  startTime: Date;
  endTime: Date;
  vipAvailability: number;
  regulerAvailability: number;
  vipPrice: number;
  regulerPrice: number;
  questions: string[];
  answers: string[];
}

export type TicketVariant = "vip" | "reguler";

export type CheckoutData = {
  eventId: string;
  quantity: number;
  variant: TicketVariant;
};

export type SelectOption = {
  label: string;
  value: string;
};

interface TransactionDetail {
  order_id: string;
  gross_amount: number;
}

interface CustomerDetails {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  billing_address?: {
    first_name: string;
    last_name?: string;
    phone?: string;
    address: string;
    city: string;
    postal_code?: string;
    country_code?: string;
  };
  shipping_address?: {
    first_name: string;
    last_name?: string;
    phone?: string;
    address: string;
    city: string;
    postal_code?: string;
    country_code?: string;
  };
}

interface ItemDetails {
  id?: string;
  price: number;
  quantity: number;
  name: string;
  brand?: string;
  category?: string;
  merchant_name?: string;
  tenor?: number;
  code_plan?: number;
  mid?: number;
  url?: string;
}

interface QrisDetail {
  acquirer?: "gopay" | "airpay shopee";
}

interface GopayDetail {
  enable_callback?: boolean;
  callback_url?: string;
  account_id?: string;
  payment_option_token?: string;
  pre_auth?: boolean;
  recurring?: boolean;
  promotion_ids?: string[];
}

interface MandiriBill {
  bill_info1: string;
  bill_info2: string;
  bill_info3?: string;
  bill_info4?: string;
  bill_info5?: string;
  bill_info6?: string;
  bill_info7?: string;
  bill_info8?: string;
  bill_key?: string;
}

export type PaymentType =
  | "qris"
  | "gopay"
  | "bank_transfer"
  | "permata"
  | "echannel";

export type BankTransferType = "bca" | "bri" | "bni" | "cimb";

type BankTransfer = {
  bank: BankTransferType;
};

export interface OrderDetails {
  payment_type: PaymentType;
  transaction_details: TransactionDetail;
  customer_details?: CustomerDetails;
  item_details: ItemDetails[];
  qris?: QrisDetail;
  gopay?: GopayDetail;
  bank_transfer?: BankTransfer;
  echannel?: MandiriBill;
}

export interface OrderCard {
  orderId: string;
  title: string;
  startTime: string;
  endTime: string;
  posterUrl: string;
  ticketType: string;
  paymentMethod: string;
  qty: number;
  orderStatus: string;
  grossAmount: string;
  currency: string;
  transactionStatus: string;
}

export type OrderData = {
  eventId: string;
  qty: number;
  variant: TicketVariant;
  paymentMethod: string;
};

export const orderSchema = z.object({
  eventId: z.string(),
  qty: z.number(),
  variant: z.enum(["reguler", "vip"]),
  paymentMethod: z.string(),
});

export interface OrderResponse {
  data: OrderResponseData;
}

export interface OrderResponseData {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  merchant_id: string;
  gross_amount: string;
  currency: string;
  payment_type: string;
  transaction_time: Date;
  transaction_status: string;
  fraud_status: string;
  actions: OrderAction[];
  acquirer: string;
  qr_string: string;
  expiry_time: Date;
}

export interface OrderAction {
  name: string;
  method: string;
  url: string;
}

export interface EventList {
  events: IEventCard[];
  total: number;
  limit: number;
  totalPages: number;
  currentPage: number;
}

export interface PurchasedEvent {
  eventId: string;
  title: string;
  posterUrl: string;
  venue: string;
  city: string;
  startTime: Date;
  endTime: Date;
  totalQty: string;
}

export interface Ticket {
  id: string;
  orderId: string;
  eventId: string;
  eventTitle: string;
  participantName: string | null;
  whatsappNumber: string | null;
  ticketType: TicketVariant;
  startTime: Date;
  endTime: Date;
  eventLocation: string;
  ticketDesign: string;
  certificateId: string;
  presence: string;
}

export interface CertificateData {
  id: string;
  name: string;
  eventTitle: string;
  certificateImage: string;
  createdAt: string;
}

export type Purchases = {
  eventTitle: string;
  ticketCode: string;
  orderId: string;
  ticketType: "vip" | "reguler";
  name: string;
  whatsapp: string;
  presence: "waiting" | "present" | "absent";
};
