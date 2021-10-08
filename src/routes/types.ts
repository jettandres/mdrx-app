import CollectionType from '@app/types/CollectionType'

export type RootStackParamList = {
  Login: undefined
  HomeDrawer: undefined
  ReviewExpenseReport: { expenseReportId: string }
  ReviewSalesReport: undefined
  ExpensesReportForm: { imagePath?: string; id: string; reportNumber: string }
  SalesReportForm: undefined
  SalesCollectionForm: { collectionType: CollectionType }
  CapturePhoto: undefined
  ConfirmPhoto: {
    path: string
  }
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
