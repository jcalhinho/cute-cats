

export default function Loader({ label = 'Chargement…' }: { label?: string }) {
  return (
    <div className="center" style={{ padding: 40 }}>
      <div aria-busy="true" aria-label={label} role="status" style={{
        width: 42, height: 42, border: '4px solid #fff3',
        borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite'
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}