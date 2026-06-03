export const API_BASE_URL = 'http://localhost:4000/api';
export const AI_SERVICE_URL = 'http://localhost:8000';

export const RISK_LEVELS = {
  LOW: { label: 'Nguy cơ thấp', color: 'success', min: 0, max: 30 },
  MEDIUM: { label: 'Nguy cơ trung bình', color: 'warning', min: 30, max: 60 },
  HIGH: { label: 'Nguy cơ cao', color: 'danger', min: 60, max: 100 },
};

export const getRiskLevel = (percent) => {
  if (percent < 30) return RISK_LEVELS.LOW;
  if (percent < 60) return RISK_LEVELS.MEDIUM;
  return RISK_LEVELS.HIGH;
};

export const PREDICTION_FIELDS = [
  { name: 'male', label: 'Giới tính', type: 'select', options: [{ value: 1, label: 'Nam' }, { value: 0, label: 'Nữ' }], tooltip: 'Giới tính sinh học của bệnh nhân' },
  { name: 'age', label: 'Tuổi', type: 'number', min: 1, max: 120, tooltip: 'Tuổi của bệnh nhân (năm)' },
  { name: 'education', label: 'Trình độ học vấn', type: 'select', options: [{ value: 1, label: 'Tiểu học' }, { value: 2, label: 'Trung học' }, { value: 3, label: 'Cao đẳng' }, { value: 4, label: 'Đại học+' }], tooltip: 'Cấp độ học vấn: 1-Tiểu học, 2-Trung học, 3-Cao đẳng, 4-Đại học trở lên' },
  { name: 'currentSmoker', label: 'Hút thuốc hiện tại', type: 'select', options: [{ value: 1, label: 'Có' }, { value: 0, label: 'Không' }], tooltip: 'Bệnh nhân có đang hút thuốc lá không?' },
  { name: 'cigsPerDay', label: 'Số điếu thuốc/ngày', type: 'number', min: 0, max: 100, tooltip: 'Số lượng điếu thuốc hút mỗi ngày (0 nếu không hút)' },
  { name: 'BPMeds', label: 'Thuốc huyết áp', type: 'select', options: [{ value: 1, label: 'Có dùng' }, { value: 0, label: 'Không dùng' }], tooltip: 'Bệnh nhân có đang dùng thuốc điều trị huyết áp không?' },
  { name: 'prevalentStroke', label: 'Tiền sử đột quỵ', type: 'select', options: [{ value: 1, label: 'Có' }, { value: 0, label: 'Không' }], tooltip: 'Bệnh nhân đã từng bị đột quỵ chưa?' },
  { name: 'prevalentHyp', label: 'Tăng huyết áp', type: 'select', options: [{ value: 1, label: 'Có' }, { value: 0, label: 'Không' }], tooltip: 'Bệnh nhân có bị tăng huyết áp không?' },
  { name: 'diabetes', label: 'Tiểu đường', type: 'select', options: [{ value: 1, label: 'Có' }, { value: 0, label: 'Không' }], tooltip: 'Bệnh nhân có bị tiểu đường không?' },
  { name: 'totChol', label: 'Cholesterol toàn phần', type: 'number', min: 100, max: 600, unit: 'mg/dL', tooltip: 'Mức cholesterol toàn phần trong máu (bình thường: < 200 mg/dL)' },
  { name: 'sysBP', label: 'Huyết áp tâm thu', type: 'number', min: 60, max: 300, unit: 'mmHg', tooltip: 'Huyết áp tâm thu - số trên (bình thường: < 120 mmHg)' },
  { name: 'diaBP', label: 'Huyết áp tâm trương', type: 'number', min: 40, max: 200, unit: 'mmHg', tooltip: 'Huyết áp tâm trương - số dưới (bình thường: < 80 mmHg)' },
  { name: 'BMI', label: 'Chỉ số BMI', type: 'number', min: 10, max: 60, step: 0.01, tooltip: 'Chỉ số khối cơ thể (bình thường: 18.5 - 24.9)' },
  { name: 'heartRate', label: 'Nhịp tim', type: 'number', min: 30, max: 250, unit: 'bpm', tooltip: 'Nhịp tim khi nghỉ ngơi (bình thường: 60-100 bpm)' },
  { name: 'glucose', label: 'Đường huyết', type: 'number', min: 30, max: 500, unit: 'mg/dL', tooltip: 'Nồng độ glucose trong máu (bình thường khi đói: 70-100 mg/dL)' },
];

export const RECOMMENDATIONS = {
  high: [
    { icon: 'Activity', title: 'Tập thể dục đều đặn', desc: 'Tối thiểu 30 phút/ngày, 5 ngày/tuần. Chọn các bài tập nhẹ nhàng như đi bộ, bơi lội.' },
    { icon: 'Heart', title: 'Kiểm soát huyết áp', desc: 'Đo huyết áp thường xuyên, duy trì dưới 120/80 mmHg. Tuân thủ thuốc nếu có chỉ định.' },
    { icon: 'Apple', title: 'Chế độ ăn lành mạnh', desc: 'Giảm muối, chất béo bão hòa. Tăng rau xanh, trái cây, cá, ngũ cốc nguyên hạt.' },
    { icon: 'Calendar', title: 'Khám sức khỏe định kỳ', desc: 'Khám tim mạch mỗi 3-6 tháng, xét nghiệm máu, đo ECG theo chỉ định bác sĩ.' },
    { icon: 'Ban', title: 'Ngưng hút thuốc', desc: 'Hút thuốc lá tăng nguy cơ bệnh tim gấp 2-4 lần. Hãy tìm sự hỗ trợ cai thuốc.' },
    { icon: 'Moon', title: 'Ngủ đủ giấc', desc: 'Ngủ 7-8 tiếng mỗi đêm, duy trì thời gian ngủ đều đặn, hạn chế stress.' },
  ],
  medium: [
    { icon: 'Activity', title: 'Tăng cường vận động', desc: 'Duy trì hoạt động thể chất ít nhất 150 phút/tuần ở cường độ vừa phải.' },
    { icon: 'Heart', title: 'Theo dõi huyết áp', desc: 'Kiểm tra huyết áp định kỳ, ghi nhận các thay đổi bất thường.' },
    { icon: 'Apple', title: 'Cải thiện chế độ ăn', desc: 'Hạn chế thực phẩm chế biến sẵn, tăng cường rau xanh và omega-3.' },
    { icon: 'Calendar', title: 'Khám sức khỏe', desc: 'Khám sức khỏe tổng quát mỗi 6-12 tháng để theo dõi các chỉ số.' },
  ],
  low: [
    { icon: 'ThumbsUp', title: 'Duy trì lối sống lành mạnh', desc: 'Tiếp tục giữ thói quen tốt hiện tại về ăn uống và tập luyện.' },
    { icon: 'Activity', title: 'Vận động thường xuyên', desc: 'Duy trì hoạt động thể chất đều đặn để giữ sức khỏe tim mạch.' },
    { icon: 'Calendar', title: 'Khám định kỳ hàng năm', desc: 'Khám sức khỏe tổng quát mỗi năm một lần để phát hiện sớm bất thường.' },
  ],
};

export const CHATBOT_SUGGESTIONS = [
  'Dấu hiệu cảnh báo bệnh tim là gì?',
  'Làm thế nào để giảm cholesterol?',
  'Chỉ số huyết áp bình thường là bao nhiêu?',
  'Cách phòng ngừa bệnh tim mạch?',
  'Chỉ số BMI ảnh hưởng đến tim như thế nào?',
  'Thực phẩm nào tốt cho tim mạch?',
];

export const MOCK_CHAT_RESPONSES = {
  'default': 'Tôi là trợ lý AI về sức khỏe tim mạch. Tôi có thể giúp bạn hiểu về nguy cơ bệnh tim, giải thích các chỉ số sức khỏe, và đưa ra lời khuyên phòng ngừa. Hãy đặt câu hỏi!',
  'dấu hiệu': 'Các dấu hiệu cảnh báo bệnh tim bao gồm:\n\n🔴 **Đau ngực** - Cảm giác tức, nặng, bóp nghẹt ở ngực\n🔴 **Khó thở** - Đặc biệt khi gắng sức hoặc nằm\n🔴 **Mệt mỏi bất thường** - Mệt nhiều hơn bình thường\n🔴 **Nhịp tim bất thường** - Tim đập nhanh, chậm hoặc không đều\n🔴 **Phù chân** - Sưng ở mắt cá chân, bàn chân\n🔴 **Chóng mặt** - Choáng váng, ngất xỉu\n\n⚠️ **Lưu ý**: Nếu có bất kỳ triệu chứng nào, hãy đến gặp bác sĩ ngay!',
  'cholesterol': 'Cách giảm cholesterol hiệu quả:\n\n✅ **Chế độ ăn**:\n- Giảm chất béo bão hòa (thịt đỏ, bơ, phô mai)\n- Tăng chất xơ (yến mạch, đậu, rau xanh)\n- Ăn cá giàu omega-3 (cá hồi, cá thu)\n- Sử dụng dầu ô liu thay bơ\n\n✅ **Tập luyện**:\n- Tập aerobic 30 phút/ngày, 5 ngày/tuần\n- Giảm cân nếu thừa cân\n\n✅ **Thay đổi lối sống**:\n- Ngưng hút thuốc\n- Hạn chế rượu bia\n- Quản lý stress\n\n📊 Chỉ số cholesterol tốt: < 200 mg/dL',
  'huyết áp': 'Chỉ số huyết áp bình thường:\n\n📊 **Phân loại huyết áp** (mmHg):\n\n| Phân loại | Tâm thu | Tâm trương |\n|---|---|---|\n| ✅ Bình thường | < 120 | < 80 |\n| ⚠️ Tăng nhẹ | 120-129 | < 80 |\n| 🟡 Tăng HA giai đoạn 1 | 130-139 | 80-89 |\n| 🔴 Tăng HA giai đoạn 2 | ≥ 140 | ≥ 90 |\n| 🚨 Cấp cứu | > 180 | > 120 |\n\n💡 **Mẹo kiểm soát huyết áp**: Giảm muối, tập thể dục, giảm stress, dùng thuốc đúng chỉ định.',
  'phòng ngừa': 'Cách phòng ngừa bệnh tim mạch:\n\n1️⃣ **Chế độ ăn DASH/Mediterranean**\n- Nhiều rau, trái cây, ngũ cốc nguyên hạt\n- Ít muối (< 2300mg/ngày)\n- Hạn chế đường và chất béo xấu\n\n2️⃣ **Vận động thể chất**\n- 150 phút/tuần hoạt động cường độ vừa\n- Hoặc 75 phút/tuần cường độ cao\n\n3️⃣ **Không hút thuốc**\n- Nguy cơ giảm 50% sau 1 năm ngưng thuốc\n\n4️⃣ **Kiểm soát cân nặng**\n- Duy trì BMI 18.5-24.9\n\n5️⃣ **Quản lý stress**\n- Thiền, yoga, hít thở sâu\n\n6️⃣ **Khám sức khỏe định kỳ**\n- Mỗi 6-12 tháng kiểm tra tim mạch',
  'bmi': 'Chỉ số BMI và ảnh hưởng đến tim:\n\n📊 **Phân loại BMI**:\n| BMI | Phân loại | Nguy cơ tim mạch |\n|---|---|---|\n| < 18.5 | Thiếu cân | Tăng nhẹ |\n| 18.5-24.9 | Bình thường | Thấp |\n| 25-29.9 | Thừa cân | Tăng |\n| 30-34.9 | Béo phì I | Cao |\n| 35-39.9 | Béo phì II | Rất cao |\n| ≥ 40 | Béo phì III | Cực cao |\n\n❤️ **Tác động đến tim**:\n- Thừa cân làm tim phải làm việc nhiều hơn\n- Tăng huyết áp, cholesterol, đường huyết\n- Gây viêm và xơ vữa động mạch\n\n🎯 **Mục tiêu**: Duy trì BMI 18.5-24.9',
  'thực phẩm': 'Thực phẩm tốt cho tim mạch:\n\n🐟 **Cá giàu Omega-3**: Cá hồi, cá thu, cá sardine (2 lần/tuần)\n\n🥬 **Rau xanh đậm**: Cải xoăn, rau bina, bông cải xanh\n\n🫐 **Trái cây giàu chất chống oxy hóa**: Việt quất, dâu tây, cam\n\n🥜 **Hạt và quả hạch**: Óc chó, hạnh nhân, hạt chia (30g/ngày)\n\n🫘 **Đậu và ngũ cốc nguyên hạt**: Yến mạch, quinoa, đậu lăng\n\n🫒 **Dầu ô liu**: Thay thế bơ và dầu mỡ động vật\n\n🍵 **Trà xanh**: 2-3 cốc/ngày, giàu catechin\n\n🥑 **Bơ**: Giàu chất béo không bão hòa đơn\n\n❌ **Hạn chế**: Thịt đỏ, thực phẩm chế biến sẵn, đường, muối, rượu bia',
};

export const STATS = {
  predictions: 12847,
  users: 3256,
  accuracy: 85.7,
  records: 45230,
};
