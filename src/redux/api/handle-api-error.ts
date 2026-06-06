export function handleApiError(
    err: any,
    fields: string[] = [],
): Record<string, string> {
    const errors: Record<string, string> = {};

    const message = err?.data?.message;

    /* Network Error */
    if (
        err?.status === "FETCH_ERROR" ||
        err?.status === "PARSING_ERROR"
    ) {
        errors.global =
            "Cannot connect to server.";

        return errors;
    }

    /* Validation Error Array */
    if (Array.isArray(message)) {
        message.forEach((msg: string) => {
            const lower =
                msg.toLowerCase();

            const field =
                fields.find((f) =>
                    lower.includes(
                        f.toLowerCase(),
                    ),
                );

            if (field) {
                errors[field] = msg;
            } else {
                errors.global = msg;
            }
        });

        return errors;
    }

    /* Single Error Message */
    if (typeof message === "string") {
        const lower =
            message.toLowerCase();

        const field =
            fields.find((f) =>
                lower.includes(
                    f.toLowerCase(),
                ),
            );

        if (field) {
            errors[field] = message;
        } else {
            errors.global = message;
        }

        return errors;
    }

    errors.global =
        "Something went wrong.";

    return errors;
}