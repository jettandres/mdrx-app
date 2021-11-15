import axios from 'axios'

import type { DineroSnapshot } from 'dinero.js'
const url =
  'https://fr5fx9hv77.execute-api.us-east-2.amazonaws.com/v1/compute-expense-report'

type Sections = {
  title: {
    label: string
    total: {
      netAmount: DineroSnapshot<number>
      vatAmount: DineroSnapshot<number>
      grossAmount: DineroSnapshot<number>
    }
    itemCount: number
  }
  data: Array<SectionData>
}

export type SectionData = {
  id: string
  supplierName: string
  supplierTin: string
  netAmount: DineroSnapshot<number>
  vatAmount: DineroSnapshot<number>
  grossAmount: DineroSnapshot<number>
  imageKey: string
  kmReading?: number
  litersAdded?: number
}

type YearToDateData = {
  id: string
  name: string
  gross: DineroSnapshot<number>
  net: DineroSnapshot<number>
  vat: DineroSnapshot<number>
}

export type ReportFooter = {
  totalReplenishable: {
    netAmount: DineroSnapshot<number>
    grossAmount: DineroSnapshot<number>
    vatAmount: DineroSnapshot<number>
  }
  yearToDate: Array<YearToDateData>
  totalYearToDate: {
    netAmount: DineroSnapshot<number>
    grossAmount: DineroSnapshot<number>
    vatAmount: DineroSnapshot<number>
  }
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
