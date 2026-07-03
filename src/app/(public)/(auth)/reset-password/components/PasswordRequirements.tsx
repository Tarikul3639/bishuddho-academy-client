export function PasswordRequirements() {
    return (
        <div className="rounded-lg border border-amber-100 bg-amber-50 p-4">
            <p className="text-xs leading-6 text-amber-700">
                Your password should contain at least:
            </p>

            <ul className="mt-2 space-y-1 text-xs text-amber-700">
                <li>• Minimum 8 characters</li>
                <li>• One uppercase letter</li>
                <li>• One lowercase letter</li>
                <li>• One number</li>
                <li>• One special character</li>
            </ul>
        </div>
    );
}
