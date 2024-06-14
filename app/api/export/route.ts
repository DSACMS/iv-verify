import { PDFDocument} from 'pdf-lib'
import { readFile } from 'fs/promises'

export const dynamic = 'force-dynamic'
export async function POST(request: Request) {
    const data = await request.formData()
    console.log(data)

    const arrayBuffer = await readFile('app/api/export/form2.pdf')
    const doc = await PDFDocument.load(arrayBuffer)
    const form = doc.getForm()

    const incomeField = form.getTextField("Total Self Employment Income")
    const expenseField = form.getTextField("Expenses From Self Employment Work")
    incomeField.setText(data.get("totalIncome")?.toString())
    expenseField.setText(data.get("totalExpense")?.toString())

    const pdfBytes = await doc.save()
    return new Response(pdfBytes, {
        headers: {
            'content-type': 'application/pdf',
        }
    })
}