/**
 * Minimalist loading fallback for i18n initialization
 */
const I18nLoadingFallback = () => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100vh",
      background: "#fafafa",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10001,
    }}
  >
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: "40px",
          height: "40px",
          border: "2px solid #e0e0e0",
          borderTopColor: "#4caf50",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          margin: "0 auto",
        }}
      />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  </div>
);

export default I18nLoadingFallback;
