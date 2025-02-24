import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface MyDateInputProps {
    name: string;
    dateFormat?: string;
    showTimeSelect?: boolean;
    placeholderText?: string;
}

export default function MyDateInput({ name, ...props }: MyDateInputProps) {
    const [field, meta, helpers] = useField(name);

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <DatePicker
                {...props}
                // selected={field.value ? new Date(field.value) : null}
                selected={(field.value && new Date(field.value)) || null}
                onChange={(date: Date | null) => helpers.setValue(date)}
            />
            {meta.touched && meta.error ? (
                <Label basic color="red">{meta.error}</Label>
            ) : null}
        </Form.Field>
    );
}
