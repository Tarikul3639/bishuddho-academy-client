import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { type METHODS, stepV, makeRef, SENDER_REF } from "./types";

export default function TrxIdStep({
    method, price, trxId, error, copiedText,
    onTrxChange, onPhoneCopy,
}: {
    method:      typeof METHODS[number] & { number: string };
    price:       number;
    trxId:       string;
    error:       string;
    copiedText:  string | null;
    onTrxChange: (v: string) => void;
    onPhoneCopy:      (v: string) => void;
}) {
    const ref = makeRef(SENDER_REF);
    const isNumberCopied = copiedText === method.number;
    const isRefCopied = copiedText === ref;

    return (
        <motion.div key="trxid" variants={stepV} initial="hidden" animate="visible" exit="exit" className="px-6 py-5">

            {/* Step 1 — Send money */}
            <div className="mb-5 rounded-lg border p-4" style={{ background: method.bg, borderColor: method.border }}>
                <p className="mb-1 text-[11px] font-bold uppercase tracking-widest" style={{ color: method.color }}>
                    Step 1 — Send Money
                </p>
                <p className="mb-3 text-[13px] text-[#374151]">
                    Send <span className="font-bold text-[#0d1b3e]">৳{price.toLocaleString()}</span> to:
                </p>

                {/* Number copy */}
                <div className="mb-3 flex items-center justify-between rounded-sm bg-white px-3.5 py-2.5">
                    <div>
                        <p className="text-[11px] text-[#9ca3af]">{method.name} Number</p>
                        <p className="text-base font-bold text-[#0d1b3e]">{method.number}</p>
                    </div>
                    <button
                        onClick={() => onPhoneCopy(method.number)}
                        className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-colors cursor-pointer"
                        style={{
                            background: isNumberCopied ? "#dcfce7" : method.bg,
                            color:      isNumberCopied ? "#16a34a" : method.color,
                        }}
                    >
                        {isNumberCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        {isNumberCopied ? "Copied!" : "Copy"}
                    </button>
                </div>

                {/* Reference note */}
                <div className="rounded-sm border border-dashed px-3.5 py-2.5" style={{ borderColor: method.border }}>
                    <p className="mb-1 text-[11px] font-bold uppercase tracking-widest" style={{ color: method.color }}>
                        Reference / Note
                    </p>
                    <p className="mb-2 text-[12px] text-[#6b7280]">
                        Add this as the reference or note when sending money so we can identify your payment:
                    </p>
                    <div className="flex items-center justify-between rounded-sm bg-white px-3 py-2">
                        <span className="font-mono text-[13px] font-bold text-[#0d1b3e]">{ref}</span>
                        <button
                            onClick={() => onPhoneCopy(ref)}
                            className="flex items-center gap-1 text-[11px] font-semibold transition-colors cursor-pointer"
                            style={{ color: isRefCopied ? "#16a34a" : method.color }}
                        >
                            {isRefCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                            {isRefCopied ? "Copied!" : "Copy"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Step 2 — TrxID */}
            <div>
                <p className="mb-1.5 text-[11px] font-bold uppercase tracking-widest text-[#6b7280]">
                    Step 2 — Enter Transaction ID
                </p>
                <p className="mb-3 text-[13px] text-[#6b7280]">
                    After sending money, paste the Transaction ID you received.
                </p>
                <input
                    type="text"
                    value={trxId}
                    onChange={(e) => onTrxChange(e.target.value)}
                    placeholder="e.g. 8N5A2K9XQ3"
                    className={`w-full rounded-sm border-2 px-4 py-3 text-[14px] font-semibold text-[#0d1b3e] outline-none transition-colors placeholder:font-normal placeholder:text-[#9ca3af] ${
                        error
                            ? "border-[#ef4444] bg-[#fef2f2]"
                            : "border-[#e5e7eb] bg-[#f9fafb] focus:border-[#1a56db] focus:bg-white"
                    }`}
                />
                {error && <p className="mt-1.5 text-[12px] font-medium text-[#ef4444]">{error}</p>}
            </div>
        </motion.div>
    );
}
