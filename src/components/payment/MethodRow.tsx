import { METHODS } from "./types";

export default function MethodRow({
    method, selected, onSelect,
}: {
    method: typeof METHODS[number];
    selected: boolean;
    onSelect: () => void;
}) {
    return (
        <button
            onClick={onSelect}
            className={`flex w-full items-center gap-4 rounded-sm border-2 px-4 py-3.5 text-left transition-all duration-150 cursor-pointer ${
                selected
                    ? "border-[#1a56db] bg-[#eef3ff]"
                    : "border-[#e5e7eb] bg-white hover:border-[#d1d5db]"
            }`}
        >
            <div className="shrink-0">{method.icon}</div>
            <div className="min-w-0 flex-1">
                <p className="font-semibold text-[#0d1b3e]">{method.name}</p>
                <p className="mt-0.5 text-xs text-[#6b7280]">{method.description}</p>
            </div>
            <div
                className={selected ? `flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors border-[#1a56db] bg-[#1a56db]` : `flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors`}

            >
                {selected && <div className="h-2 w-2 rounded-full bg-white" />}
            </div>
        </button>
    );
}
