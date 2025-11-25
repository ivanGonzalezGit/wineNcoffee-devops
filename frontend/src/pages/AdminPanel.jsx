import { useState, useEffect } from "react";
import AdminUsers from "../components/AdminUsers.jsx";
import AdminProducts from "../components/AdminProducts.jsx";
import AdminCharts from "../components/AdminCharts.jsx";
import api from "../services/api"; // Usamos la instancia de Axios
import "./adminPanel.css";

function AdminPanel() {
  const [tab, setTab] = useState("charts");
  const [loading, setLoading] = useState(true);

  // Estado inicial seguro
  const [metrics, setMetrics] = useState({
    kpis: { totalAdmins: 0, totalProducts: 0, totalRevenue: 0 },
    salesSeries: []
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // Usamos Axios con baseURL de VITE_API_URL
        const { data } = await api.get("/metrics");
        setMetrics(data);
      } catch (error) {
        console.error("Error cargando métricas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className="admin-panel">
      {/* SIDEBAR IZQUIERDO */}
      <aside className="admin-sidebar">
        <h2 className="admin-sidebar__title">ADMIN MENU</h2>
        <nav className="admin-sidebar__nav">
          <button
            className={`admin-nav__item ${tab === "charts" ? "is-active" : ""}`}
            onClick={() => setTab("charts")}
          >
            Dashboard
          </button>
          <button
            className={`admin-nav__item ${tab === "users" ? "is-active" : ""}`}
            onClick={() => setTab("users")}
          >
            Usuarios
          </button>
          <button
            className={`admin-nav__item ${tab === "products" ? "is-active" : ""}`}
            onClick={() => setTab("products")}
          >
            Productos
          </button>
        </nav>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="admin-main">
        {/* TAB DASHBOARD */}
        {tab === "charts" && (
          <div className="dashboard-container">
            <div className="kpi-grid">
              <div className="kpi-card">
                <h3>Ingresos Totales</h3>
                <p className="kpi-number">
                  ${Number(metrics.kpis.totalRevenue).toLocaleString()}
                </p>
              </div>
              <div className="kpi-card">
                <h3>Productos Activos</h3>
                <p className="kpi-number">{metrics.kpis.totalProducts}</p>
              </div>
              <div className="kpi-card">
                <h3>Usuarios Admin</h3>
                <p className="kpi-number">{metrics.kpis.totalAdmins}</p>
              </div>
            </div>

            <div className="chart-section">
              <h3 className="chart-title">EVOLUCION DE VENTAS (Últimos 7 días)</h3>
              {loading ? (
                <p>Cargando gráfico...</p>
              ) : (
                <AdminCharts data={metrics.salesSeries} />
              )}
            </div>
          </div>
        )}

        {/* TAB USUARIOS */}
        {tab === "users" && (
          <div className="admin-content-card">
            <AdminUsers />
          </div>
        )}

        {/* TAB PRODUCTOS */}
        {tab === "products" && (
          <div className="admin-content-card">
            <AdminProducts />
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminPanel;
