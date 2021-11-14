import axios from 'axios'

import type { DineroSnapshot } from 'dinero.js'
const url =
  'https://fr5fx9hv77.execute-api.us-east-2.amazonaws.com/v1/compute-expense-report'

type Sections = {
  title: {
    label: string
    total: DineroSnapshot<number>
    itemCount: number
  }
  data: Array<SectionData>
}

type SectionData = {
  id: string
  supplierName: string
  supplierTin: string
  netAmount: DineroSnapshot<number>
  kmReading?: number
  imageKey: string
}

type YearToDateData = {
  id: string
  name: string
  amount: DineroSnapshot<number>
}

export type ReportFooter = {
  totalReplenishable: DineroSnapshot<number>
  yearToDate: Array<YearToDateData>
  totalYearToDate: DineroSnapshot<number>
  totalKmReadingConsumption: number
  avgKmPerLiter: string
}

type ReportHeader = {
  createdAt: string
}

type Response = {
  reportHeader: ReportHeader
  reportBody: Array<Sections>
  reportFooter: ReportFooter
}

const computeExpenseReport = async (expenseReportId: string) => {
  try {
    const response = await axios.get<Response>(`${url}?id=${expenseReportId}`)
    return response.data
  } catch (e) {
    console.log(e)
  }
}

export default computeExpenseReport
