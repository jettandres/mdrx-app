import CollectionType from '@app/types/CollectionType'

export type RootStackParamList = {
  Login: undefined
  HomeDrawer: undefined
  ReviewExpenseReport: undefined
  ReviewSalesReport: undefined
  ExpensesReportForm: undefined
  SalesReportForm: undefined
  SalesCollectionForm: { collectionType: CollectionType }
}

export type HomeStackParamList = {
  Expenses: undefined
  Sales: undefined
}

export type HomeDrawerParamList = {
  Home: undefined
  ExpenseReport: undefined
  SalesAndIncomeReport: undefined
  CollectionSummaryReport: undefined
}

export type SalesAndIncomeReportTabParamList = {
  Invoice: undefined
  DeliveryReceipt: undefined
  Cash: undefined
}

export type CollectionSummaryTabParamList = {
  Collections: undefined
  Remittance: undefined
}
