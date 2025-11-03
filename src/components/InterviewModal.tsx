import type { Interview } from "../types/content";

export function InterviewModal({
  open,
  interview,
  onClose,
}: {
  open: boolean;
  interview: Interview | null;
  onClose: () => void;
}) {
  if (!open || !interview) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Interview with ${interview.person}`}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          width: "min(720px, 92vw)",
          maxHeight: "85vh",
          overflow: "auto",
          padding: 20,
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0 }}>{interview.person}</h3>
          <button onClick={onClose} style={{ border: 0, background: "none", cursor: "pointer", fontSize: 16 }}>
            Close
          </button>
        </div>
        <p style={{ color: "#6b7280", marginTop: 8 }}>{interview.title}</p>
        <img src={interview.image} alt="" style={{ width: "100%", height: "auto", borderRadius: 12, marginTop: 12 }} />
        <p style={{ marginTop: 12 }}>{interview.excerpt}</p>
      </div>
    </div>
  );
}

