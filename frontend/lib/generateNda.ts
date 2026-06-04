export interface NdaFormData {
  party1Company: string;
  party1Name: string;
  party1Title: string;
  party1Address: string;
  party2Company: string;
  party2Name: string;
  party2Title: string;
  party2Address: string;
  purpose: string;
  effectiveDate: string;
  mndaTermType: "expires" | "until-terminated";
  mndaTermYears: string;
  confidentialityTermType: "years" | "perpetuity";
  confidentialityTermYears: string;
  governingLaw: string;
  jurisdiction: string;
  modifications: string;
}

export function generateNda(data: NdaFormData): string {
  const mndaTerm =
    data.mndaTermType === "expires"
      ? `- [x]     Expires ${data.mndaTermYears || "1"} year(s) from Effective Date.\n- [ ]     Continues until terminated in accordance with the terms of the MNDA.`
      : `- [ ]     Expires ${data.mndaTermYears || "1"} year(s) from Effective Date.\n- [x]     Continues until terminated in accordance with the terms of the MNDA.`;

  const confidentialityTerm =
    data.confidentialityTermType === "years"
      ? `- [x]     ${data.confidentialityTermYears || "1"} year(s) from Effective Date, but in the case of trade secrets until Confidential Information is no longer considered a trade secret under applicable laws.\n- [ ]     In perpetuity.`
      : `- [ ]     ${data.confidentialityTermYears || "1"} year(s) from Effective Date, but in the case of trade secrets until Confidential Information is no longer considered a trade secret under applicable laws.\n- [x]     In perpetuity.`;

  return `# Mutual Non-Disclosure Agreement

## USING THIS MUTUAL NON-DISCLOSURE AGREEMENT

This Mutual Non-Disclosure Agreement (the "MNDA") consists of: (1) this Cover Page ("**Cover Page**") and (2) the Common Paper Mutual NDA Standard Terms Version 1.0 ("**Standard Terms**") identical to those posted at [commonpaper.com/standards/mutual-nda/1.0](https://commonpaper.com/standards/mutual-nda/1.0). Any modifications of the Standard Terms should be made on the Cover Page, which will control over conflicts with the Standard Terms.

### Purpose

${data.purpose || "[Evaluating whether to enter into a business relationship with the other party.]"}

### Effective Date

${data.effectiveDate || "[Today's date]"}

### MNDA Term

${mndaTerm}

### Term of Confidentiality

${confidentialityTerm}

### Governing Law & Jurisdiction

Governing Law: ${data.governingLaw || "[Fill in state]"}

Jurisdiction: ${data.jurisdiction || "[Fill in city or county and state]"}

### MNDA Modifications

${data.modifications || "None."}

By signing this Cover Page, each party agrees to enter into this MNDA as of the Effective Date.

|| PARTY 1 | PARTY 2 |
|:--- | :----: | :----: |
| Signature | | |
| Print Name | ${data.party1Name} | ${data.party2Name} |
| Title | ${data.party1Title} | ${data.party2Title} |
| Company | ${data.party1Company} | ${data.party2Company} |
| Notice Address | ${data.party1Address} | ${data.party2Address} |
| Date | ${data.effectiveDate} | ${data.effectiveDate} |

---

Common Paper Mutual Non-Disclosure Agreement (Version 1.0) free to use under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
`;
}
