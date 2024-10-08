import { PDFDocument} from 'pdf-lib'
import { readFile } from 'fs/promises'

export const dynamic = 'force-dynamic'
export async function POST(request: Request) {
  const data = await request.formData()

  const arrayBuffer = await readFile('app/api/export/form3.pdf')
  const doc = await PDFDocument.load(arrayBuffer)
  const form = doc.getForm()

  // Totals
  const incomeField = form.getTextField("TotalSelfEmploymentIncome")
  const expenseField = form.getTextField("ExpensesFromSelfEmploymentWork")
  incomeField.setText(data.get("totalIncome")?.toString())
  expenseField.setText(data.get("totalExpense")?.toString())

  // Name
  // FIXME: The PDF has FirstName and LastName fields but the webapp only asks for a single name field
  form.getTextField("FirstName").setText(data.get("signedName")?.toString())

  // Income Details
  const incomeData = JSON.parse(data.get("incomeData")?.toString() ?? "[]")
  incomeData.forEach((incomeItem: any, i: number) => {
    const fieldNum = i + 1
    form.getTextField(`IncomeName${fieldNum}`).setText(incomeItem.name)
    form.getTextField(`IncomeDescription${fieldNum}`).setText(incomeItem.description)
    form.getTextField(`IncomeAmount${fieldNum}`).setText(incomeItem.amount.toString())
  })

  // Expense Details
  const expenseData = JSON.parse(data.get("expenseData")?.toString() ?? "[]")
  expenseData.forEach((expenseItem: any, i: number) => {
    const fieldNum = i + 1
    form.getTextField(`ExpenseName${fieldNum}`).setText(expenseItem.name)
    form.getTextField(`ExpenseDate${fieldNum}`).setText(expenseItem.date)
    form.getTextField(`ExpenseType${fieldNum}`).setText(expenseItem.expenseType)
    form.getTextField(`ExpenseAmount${fieldNum}`).setText(expenseItem.amount.toString())
  })

  // Sign form
  if (data.get("understood") == "true") {
    form.getCheckBox("AgreeCheckbox").check()
    form.getTextField("SignDate").setText(data.get("signedDate")?.toString())
  }

  const pdfBytes = await doc.save()
  return new Response(pdfBytes, {
    headers: {
      'content-type': 'application/pdf',
    }
  })
}