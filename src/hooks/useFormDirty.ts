import { useRef, useState, useCallback, useEffect } from "react";

function deepEqual(a: unknown, b: unknown): boolean {
    if (a === b) return true;
    if (a == null || b == null) return a === b;

    if (a instanceof File && b instanceof File) {
        return a.name === b.name && a.size === b.size && a.lastModified === b.lastModified;
    }

    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        return a.every((item, i) => deepEqual(item, b[i]));
    }

    if (typeof a === "object" && typeof b === "object") {
        const keysA = Object.keys(a as object);
        const keysB = Object.keys(b as object);
        if (keysA.length !== keysB.length) return false;
        return keysA.every((k) =>
            deepEqual(
                (a as Record<string, unknown>)[k],
                (b as Record<string, unknown>)[k]
            )
        );
    }

    return false;
}

interface UseFormDirtyOptions<T> {
    ignore?: (keyof T)[];
}

interface UseFormDirtyReturn<T> {
    isDirty: boolean;
    dirtyFields: Partial<Record<keyof T, boolean>>;
    getChangedValues: () => Partial<T>;
    resetBaseline: (newValues?: T) => void;
}

export function useFormDirty<T extends object>(
    values: T,
    options?: UseFormDirtyOptions<T>
): UseFormDirtyReturn<T> {
    const baseline = useRef<T>({ ...values });
    const ignored = useRef(new Set(options?.ignore ?? []));
    const [dirtyFields, setDirtyFields] = useState<Partial<Record<keyof T, boolean>>>({});

    useEffect(() => {
        const next: Partial<Record<keyof T, boolean>> = {};

        for (const key in values) {
            if (ignored.current.has(key)) continue;
            if (!deepEqual(values[key], baseline.current[key])) {
                next[key as keyof T] = true;
            }
        }

        setDirtyFields((prev) => {
            const prevKeys = Object.keys(prev);
            const nextKeys = Object.keys(next);
            const same =
                prevKeys.length === nextKeys.length &&
                nextKeys.every((k) => prev[k as keyof T] === next[k as keyof T]);
            return same ? prev : next;
        });
    }, [values]);

    const getChangedValues = useCallback((): Partial<T> => {
        const changed: Partial<T> = {};
        for (const key in values) {
            if (ignored.current.has(key)) continue;
            if (!deepEqual(values[key], baseline.current[key])) {
                changed[key as keyof T] = values[key];
            }
        }
        return changed;
    }, [values]);

    const resetBaseline = useCallback(
        (newValues?: T, syncState?: (v: T) => void) => {
            const next = newValues ?? values;

            baseline.current = { ...next };
            setDirtyFields({});

            // optional sync with actual state
            if (syncState) {
                syncState(next);
            }
        },
        [values]
    );

    return {
        isDirty: Object.keys(dirtyFields).length > 0,
        dirtyFields,
        getChangedValues,
        resetBaseline,
    };
}

/**
 * useFormDirty use Example:
 * 
 * const { isDirty, dirtyFields, getChangedValues, resetBaseline } = useFormDirty(formValues, {
 *   ignore: ["lastModified"] // if you want to ignore some fields from dirty check
 * });
 * 
 * // To get only changed values for PATCH request
 * const changedValues = getChangedValues();
 * // To reset baseline after successful save
 * resetBaseline();
 * 
 * // To reset baseline to new values (e.g. after loading new data)
 * resetBaseline(newFormValues);
 */