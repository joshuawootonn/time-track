import { getIn } from "formik"

export function getHelperText(form: any, fieldName: string): string {
    const emptyText = ` `

    const touched = getIn(form.touched, fieldName)
    if (touched != null) {
        return getIn(form.errors, fieldName) ?? emptyText
    }

    return emptyText
}
