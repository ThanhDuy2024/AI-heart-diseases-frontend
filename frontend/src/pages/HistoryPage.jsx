import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  History, Search, Filter, Calendar, TrendingUp, Activity,
  Eye, FileDown, X, ChevronLeft, ChevronRight, AlertCircle,
  CheckCircle2, Clock, BarChart3
} from 'lucide-react';
import { getRiskLevel } from '../utils/constants';

/* ───── Mock History Data ───── */
const generateMockHistory = () => {
  const entries = [];
  const now = new Date();
  for (let i = 0; i < 15; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i * Math.floor(Math.random() * 7 + 1));
    const risk = Math.floor(Math.random() * 85 + 5);
    entries.push({
      id: `pred-${i + 1}`,
      date: date.toISOString(),
      riskPercent: risk,
      riskLevel: getRiskLevel(risk),
      data: {
        male: Math.round(Math.random()), age: Math.floor(Math.random() * 40 + 30),
        totChol: Math.floor(Math.random() * 150 + 150), sysBP: Math.floor(Math.random() * 60 + 100),
        diaBP: Math.floor(Math.random() * 40 + 60), BMI: +(Math.random() * 15 + 18).toFixed(1),
        heartRate: Math.floor(Math.random() * 40 + 60), glucose: Math.floor(Math.random() * 80 + 70),
        currentSmoker: Math.round(Math.random()), cigsPerDay: Math.floor(Math.random() * 20),
        BPMeds: Math.round(Math.random()), prevalentStroke: 0,
        prevalentHyp: Math.round(Math.random()), diabetes: Math.round(Math.random()),
        education: Math.floor(Math.random() * 4 + 1),
      },
    });
  }
  return entries.sort((a, b) => new Date(b.date) - new Date(a.date));
};

const MOCK_HISTORY = generateMockHistory();

/* ───── Detail Modal ───── */
const DetailModal = ({ entry, onClose }) => {
  if (!entry) return null;

  const fieldLabels = {
    male: 'Giới tính', age: 'Tuổi', education: 'Học vấn',
    currentSmoker: 'Hút thuốc', cigsPerDay: 'Số điếu/ngày', BPMeds: 'Thuốc HA',
    prevalentStroke: 'Đột quỵ', prevalentHyp: 'Tăng HA', diabetes: 'Tiểu đường',
    totChol: 'Cholesterol', sysBP: 'HA tâm thu', diaBP: 'HA tâm trương',
    BMI: 'BMI', heartRate: 'Nhịp tim', glucose: 'Đường huyết',
  };

  const formatValue = (key, val) => {
    if (key === 'male') return val ? 'Nam' : 'Nữ';
    if (['currentSmoker', 'BPMeds', 'prevalentStroke', 'prevalentHyp', 'diabetes'].includes(key))
      return val ? 'Có' : 'Không';
    if (key === 'education') return ['', 'Tiểu học', 'Trung học', 'Cao đẳng', 'Đại học+'][val] || val;
    return val;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-card-lg max-w-lg w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white rounded-t-2xl border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <h3 className="text-lg font-bold text-text-primary">Chi tiết dự đoán</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Summary */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-background">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
              entry.riskLevel.color === 'success' ? 'bg-success-light' :
              entry.riskLevel.color === 'warning' ? 'bg-warning-light' : 'bg-danger-light'
            }`}>
              <span className={`text-xl font-bold ${
                entry.riskLevel.color === 'success' ? 'text-success-dark' :
                entry.riskLevel.color === 'warning' ? 'text-warning-dark' : 'text-danger-dark'
              }`}>
                {entry.riskPercent}%
              </span>
            </div>
            <div>
              <p className="text-sm text-text-secondary">
                {new Date(entry.date).toLocaleDateString('vi-VN', {
                  year: 'numeric', month: 'long', day: 'numeric',
                  hour: '2-digit', minute: '2-digit'
                })}
              </p>
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold mt-1 ${
                entry.riskLevel.color === 'success' ? 'bg-success-light text-success-dark' :
                entry.riskLevel.color === 'warning' ? 'bg-warning-light text-warning-dark' : 'bg-danger-light text-danger-dark'
              }`}>
                {entry.riskLevel.label}
              </span>
            </div>
          </div>

          {/* Data Grid */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">Dữ liệu đầu vào</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(entry.data).map(([key, val]) => (
                <div key={key} className="flex justify-between p-2.5 rounded-lg bg-background text-sm">
                  <span className="text-text-secondary">{fieldLabels[key] || key}</span>
                  <span className="font-medium text-text-primary">{formatValue(key, val)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════ */
/*  HISTORY PAGE                                      */
/* ═══════════════════════════════════════════════════ */
const HistoryPage = () => {
  const [search, setSearch] = useState('');
  const [filterRisk, setFilterRisk] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const perPage = 8;

  const filtered = useMemo(() => {
    return MOCK_HISTORY.filter((e) => {
      if (filterRisk === 'low' && e.riskLevel.color !== 'success') return false;
      if (filterRisk === 'medium' && e.riskLevel.color !== 'warning') return false;
      if (filterRisk === 'high' && e.riskLevel.color !== 'danger') return false;
      if (search) {
        const dateStr = new Date(e.date).toLocaleDateString('vi-VN');
        return dateStr.includes(search) || e.riskPercent.toString().includes(search);
      }
      return true;
    });
  }, [search, filterRisk]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const avgRisk = MOCK_HISTORY.length
    ? (MOCK_HISTORY.reduce((s, e) => s + e.riskPercent, 0) / MOCK_HISTORY.length).toFixed(1)
    : 0;

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
            <History className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Lịch sử dự đoán</h1>
            <p className="text-text-secondary text-sm">Theo dõi kết quả dự đoán theo thời gian</p>
          </div>
        </div>
        <button onClick={handleExportPDF} className="btn-outline text-sm flex items-center gap-2 px-4 py-2">
          <FileDown className="w-4 h-4" />
          Export PDF
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-text-primary">{MOCK_HISTORY.length}</p>
            <p className="text-sm text-text-secondary">Tổng lần dự đoán</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-warning" />
          </div>
          <div>
            <p className="text-2xl font-bold text-text-primary">{avgRisk}%</p>
            <p className="text-sm text-text-secondary">Nguy cơ trung bình</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
            <Clock className="w-6 h-6 text-success" />
          </div>
          <div>
            <p className="text-2xl font-bold text-text-primary">
              {MOCK_HISTORY[0] ? new Date(MOCK_HISTORY[0].date).toLocaleDateString('vi-VN') : '-'}
            </p>
            <p className="text-sm text-text-secondary">Lần gần nhất</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder="Tìm theo ngày hoặc tỷ lệ..."
              className="input-field pl-10 py-2.5 text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-text-muted" />
            {[
              { value: 'all', label: 'Tất cả' },
              { value: 'low', label: 'Thấp' },
              { value: 'medium', label: 'Trung bình' },
              { value: 'high', label: 'Cao' },
            ].map((f) => (
              <button
                key={f.value}
                onClick={() => { setFilterRisk(f.value); setCurrentPage(1); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filterRisk === f.value
                    ? 'bg-secondary text-white'
                    : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-background">
                <th className="text-left text-xs font-semibold text-text-secondary uppercase tracking-wider px-6 py-3">Ngày</th>
                <th className="text-left text-xs font-semibold text-text-secondary uppercase tracking-wider px-6 py-3">Nguy cơ</th>
                <th className="text-left text-xs font-semibold text-text-secondary uppercase tracking-wider px-6 py-3">Mức độ</th>
                <th className="text-right text-xs font-semibold text-text-secondary uppercase tracking-wider px-6 py-3">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginated.map((entry, i) => (
                <motion.tr
                  key={entry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-text-muted" />
                      <span className="text-sm text-text-primary">
                        {new Date(entry.date).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 rounded-full bg-gray-200 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            entry.riskLevel.color === 'success' ? 'bg-success' :
                            entry.riskLevel.color === 'warning' ? 'bg-warning' : 'bg-danger'
                          }`}
                          style={{ width: `${entry.riskPercent}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-text-primary">{entry.riskPercent}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      entry.riskLevel.color === 'success' ? 'bg-success-light text-success-dark' :
                      entry.riskLevel.color === 'warning' ? 'bg-warning-light text-warning-dark' : 'bg-danger-light text-danger-dark'
                    }`}>
                      {entry.riskLevel.color === 'success' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      {entry.riskLevel.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedEntry(entry)}
                      className="inline-flex items-center gap-1 text-sm text-secondary hover:text-secondary-dark font-medium transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      Xem
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginated.length === 0 && (
          <div className="text-center py-12">
            <Activity className="w-12 h-12 text-text-muted mx-auto mb-3" />
            <p className="text-text-secondary">Không tìm thấy kết quả phù hợp</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-background">
            <p className="text-sm text-text-secondary">
              Hiển thị {(currentPage - 1) * perPage + 1}-{Math.min(currentPage * perPage, filtered.length)} / {filtered.length} kết quả
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                    p === currentPage ? 'bg-secondary text-white' : 'hover:bg-gray-100 text-text-secondary'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedEntry && (
          <DetailModal entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HistoryPage;
