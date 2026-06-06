import {
    useRef,
    useState,
    useCallback,
    useEffect,
} from "react";

function deepEqual(
    a: unknown,
    b: unknown,
): boolean {
    if (a === b) return true;

    if (a == null || b == null) {
        return a === b;
    }

    if (
        a instanceof File &&
        b instanceof File
    ) {
        return (
            a.name === b.name &&
            a.size === b.size &&
            a.lastModified === b.lastModified
        );
    }

    if (
        Array.isArray(a) &&
        Array.isArray(b)
    ) {
        if (a.length !== b.length) {
            return false;
        }

        return a.every((item, i) =>
            deepEqual(item, b[i]),
        );
    }

    if (
        typeof a === "object" &&
        typeof b === "object"
    ) {
        const keysA =
            Object.keys(a as object);

        const keysB =
            Object.keys(b as object);

        if (
            keysA.length !==
            keysB.length
        ) {
            return false;
        }

        return keysA.every((key) =>
            deepEqual(
                (
                    a as Record<
                        string,
                        unknown
                    >
                )[key],
                (
                    b as Record<
                        string,
                        unknown
                    >
                )[key],
            ),
        );
    }

    return false;
}

interface UseFormDirtyOptions<T> {
    ignore?: (keyof T)[];
}

interface UseFormDirtyReturn<T> {
    isDirty: boolean;

    dirtyFields:
    Partial<
        Record<keyof T, boolean>
    >;

    getChangedValues:
    () => Partial<T>;

    resetBaseline:
    (newValues?: T) => void;
}

export function useFormDirty<
    T extends object,
>(
    values: T | null,
    options?: UseFormDirtyOptions<T>,
): UseFormDirtyReturn<T> {

    const baseline =
        useRef<T | null>(
            values
                ? { ...values }
                : null,
        );

    const ignored =
        useRef(
            new Set(
                options?.ignore ?? [],
            ),
        );

    const [
        dirtyFields,
        setDirtyFields,
    ] = useState<
        Partial<
            Record<
                keyof T,
                boolean
            >
        >
    >({});

    useEffect(() => {
        if (!values) {
            setDirtyFields({});
            return;
        }

        if (!baseline.current) {
            baseline.current = {
                ...values,
            };

            setDirtyFields({});
            return;
        }

        const next:
            Partial<
                Record<
                    keyof T,
                    boolean
                >
            > = {};

        for (const key in values) {
            if (
                ignored.current.has(
                    key as keyof T,
                )
            ) {
                continue;
            }

            if (
                !deepEqual(
                    values[key],
                    baseline.current[key],
                )
            ) {
                next[
                    key as keyof T
                ] = true;
            }
        }

        setDirtyFields(
            (prev) => {
                const prevKeys =
                    Object.keys(prev);

                const nextKeys =
                    Object.keys(next);

                const same =
                    prevKeys.length ===
                    nextKeys.length &&
                    nextKeys.every(
                        (k) =>
                            prev[
                            k as keyof T
                            ] ===
                            next[
                            k as keyof T
                            ],
                    );

                return same
                    ? prev
                    : next;
            },
        );
    }, [values]);

    const getChangedValues =
        useCallback(
            (): Partial<T> => {

                if (
                    !values ||
                    !baseline.current
                ) {
                    return {};
                }

                const changed:
                    Partial<T> = {};

                for (const key in values) {
                    if (
                        ignored.current.has(
                            key as keyof T,
                        )
                    ) {
                        continue;
                    }

                    if (
                        !deepEqual(
                            values[key],
                            baseline.current[
                            key
                            ],
                        )
                    ) {
                        changed[
                            key as keyof T
                        ] =
                            values[key];
                    }
                }

                return changed;
            },
            [values],
        );

    const resetBaseline =
        useCallback(
            (
                newValues?: T,
            ) => {

                const next =
                    newValues ??
                    values;

                if (!next) {
                    return;
                }

                baseline.current = {
                    ...next,
                };

                setDirtyFields({});
            },
            [values],
        );

    return {
        isDirty:
            Object.keys(
                dirtyFields,
            ).length > 0,

        dirtyFields,

        getChangedValues,

        resetBaseline,
    };
}

/* Example usage:

const [course, setCourse] =
    useState<CourseDetails | null>(
        null,
    );

const {
    isDirty,
    dirtyFields,
    getChangedValues,
    resetBaseline,
} = useFormDirty(course, {
    ignore: ["courseId"],
});

*/