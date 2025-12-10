const escapeHtml = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

export const formatRichText = (text: string) => {
  const escaped = escapeHtml(text);
  const withBreaks = escaped.replace(/\n/g, "<br />");
  const withStrong = withBreaks.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  const withEmphasis = withStrong.replace(/\*(?!\*)(.+?)\*(?!\*)/g, "<em>$1</em>");
  return withEmphasis;
};
