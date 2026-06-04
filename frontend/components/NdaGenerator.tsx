"use client";

import { useState } from "react";
import { generateNda, type NdaFormData } from "@/lib/generateNda";

const defaultForm: NdaFormData = {
  party1Company: "",
  party1Name: "",
  party1Title: "",
  party1Address: "",
  party2Company: "",
  party2Name: "",
  party2Title: "",
  party2Address: "",
  purpose: "Evaluating whether to enter into a business relationship with the other party.",
  effectiveDate: new Date().toISOString().split("T")[0],
  mndaTermType: "expires",
  mndaTermYears: "1",
  confidentialityTermType: "years",
  confidentialityTermYears: "1",
  governingLaw: "",
  jurisdiction: "",
  modifications: "",
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

export default function NdaGenerator() {
  const [form, setForm] = useState<NdaFormData>(defaultForm);

  function set<K extends keyof NdaFormData>(key: K, value: NdaFormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleDownload() {
    const content = generateNda(form);
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Mutual-NDA.md";
    a.click();
    URL.revokeObjectURL(url);
  }

  const preview = generateNda(form);

  return (
    <div className="flex h-[calc(100vh-73px)]">
      {/* Form */}
      <div className="w-1/2 overflow-y-auto border-r border-gray-200 bg-white p-6">
        <div className="flex flex-col gap-6">
          {/* Party 1 */}
          <section>
            <h2 className="mb-3 text-sm font-semibold text-gray-900 uppercase tracking-wide border-b pb-1">
              Party 1
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Company">
                <input className={inputCls} value={form.party1Company} onChange={(e) => set("party1Company", e.target.value)} placeholder="Acme Inc." />
              </Field>
              <Field label="Print Name">
                <input className={inputCls} value={form.party1Name} onChange={(e) => set("party1Name", e.target.value)} placeholder="Jane Smith" />
              </Field>
              <Field label="Title">
                <input className={inputCls} value={form.party1Title} onChange={(e) => set("party1Title", e.target.value)} placeholder="CEO" />
              </Field>
              <Field label="Notice Address">
                <input className={inputCls} value={form.party1Address} onChange={(e) => set("party1Address", e.target.value)} placeholder="jane@acme.com" />
              </Field>
            </div>
          </section>

          {/* Party 2 */}
          <section>
            <h2 className="mb-3 text-sm font-semibold text-gray-900 uppercase tracking-wide border-b pb-1">
              Party 2
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Company">
                <input className={inputCls} value={form.party2Company} onChange={(e) => set("party2Company", e.target.value)} placeholder="Beta Corp." />
              </Field>
              <Field label="Print Name">
                <input className={inputCls} value={form.party2Name} onChange={(e) => set("party2Name", e.target.value)} placeholder="John Doe" />
              </Field>
              <Field label="Title">
                <input className={inputCls} value={form.party2Title} onChange={(e) => set("party2Title", e.target.value)} placeholder="CTO" />
              </Field>
              <Field label="Notice Address">
                <input className={inputCls} value={form.party2Address} onChange={(e) => set("party2Address", e.target.value)} placeholder="john@betacorp.com" />
              </Field>
            </div>
          </section>

          {/* Agreement terms */}
          <section>
            <h2 className="mb-3 text-sm font-semibold text-gray-900 uppercase tracking-wide border-b pb-1">
              Agreement Terms
            </h2>
            <div className="flex flex-col gap-3">
              <Field label="Purpose">
                <textarea className={inputCls + " resize-none"} rows={2} value={form.purpose} onChange={(e) => set("purpose", e.target.value)} />
              </Field>
              <Field label="Effective Date">
                <input type="date" className={inputCls} value={form.effectiveDate} onChange={(e) => set("effectiveDate", e.target.value)} />
              </Field>
              <Field label="MNDA Term">
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="radio" checked={form.mndaTermType === "expires"} onChange={() => set("mndaTermType", "expires")} />
                    Expires after
                    <input
                      className={inputCls + " w-16"}
                      type="number"
                      min="1"
                      value={form.mndaTermYears}
                      onChange={(e) => set("mndaTermYears", e.target.value)}
                      disabled={form.mndaTermType !== "expires"}
                    />
                    year(s)
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="radio" checked={form.mndaTermType === "until-terminated"} onChange={() => set("mndaTermType", "until-terminated")} />
                    Continues until terminated
                  </label>
                </div>
              </Field>
              <Field label="Term of Confidentiality">
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="radio" checked={form.confidentialityTermType === "years"} onChange={() => set("confidentialityTermType", "years")} />
                    <input
                      className={inputCls + " w-16"}
                      type="number"
                      min="1"
                      value={form.confidentialityTermYears}
                      onChange={(e) => set("confidentialityTermYears", e.target.value)}
                      disabled={form.confidentialityTermType !== "years"}
                    />
                    year(s) from Effective Date
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="radio" checked={form.confidentialityTermType === "perpetuity"} onChange={() => set("confidentialityTermType", "perpetuity")} />
                    In perpetuity
                  </label>
                </div>
              </Field>
            </div>
          </section>

          {/* Jurisdiction */}
          <section>
            <h2 className="mb-3 text-sm font-semibold text-gray-900 uppercase tracking-wide border-b pb-1">
              Governing Law &amp; Jurisdiction
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Governing Law (State)">
                <input className={inputCls} value={form.governingLaw} onChange={(e) => set("governingLaw", e.target.value)} placeholder="Delaware" />
              </Field>
              <Field label="Jurisdiction">
                <input className={inputCls} value={form.jurisdiction} onChange={(e) => set("jurisdiction", e.target.value)} placeholder="courts located in New Castle, DE" />
              </Field>
            </div>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="mb-3 text-sm font-semibold text-gray-900 uppercase tracking-wide border-b pb-1">
              Modifications
            </h2>
            <Field label="MNDA Modifications (optional)">
              <textarea className={inputCls + " resize-none"} rows={3} value={form.modifications} onChange={(e) => set("modifications", e.target.value)} placeholder="List any modifications to the standard terms, or leave blank." />
            </Field>
          </section>
        </div>
      </div>

      {/* Preview */}
      <div className="w-1/2 flex flex-col overflow-hidden bg-gray-50">
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
          <span className="text-sm font-medium text-gray-700">Preview</span>
          <button
            onClick={handleDownload}
            className="rounded bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Download .md
          </button>
        </div>
        <pre className="flex-1 overflow-y-auto p-6 text-xs text-gray-800 leading-relaxed whitespace-pre-wrap font-mono">
          {preview}
        </pre>
      </div>
    </div>
  );
}
