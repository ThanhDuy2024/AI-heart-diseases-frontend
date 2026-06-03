export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const getPasswordStrength = (password) => {
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { level: 'weak', label: 'Yếu', color: '#DC2626', percent: 20 };
  if (score <= 2) return { level: 'fair', label: 'Trung bình', color: '#EAB308', percent: 40 };
  if (score <= 3) return { level: 'good', label: 'Khá', color: '#F59E0B', percent: 60 };
  if (score <= 4) return { level: 'strong', label: 'Mạnh', color: '#16A34A', percent: 80 };
  return { level: 'very-strong', label: 'Rất mạnh', color: '#059669', percent: 100 };
};

export const validatePredictionForm = (data) => {
  const errors = {};
  
  if (data.age === '' || data.age < 1 || data.age > 120) {
    errors.age = 'Tuổi phải từ 1 đến 120';
  }
  if (data.cigsPerDay === '' || data.cigsPerDay < 0) {
    errors.cigsPerDay = 'Số điếu thuốc không hợp lệ';
  }
  if (data.totChol === '' || data.totChol < 100 || data.totChol > 600) {
    errors.totChol = 'Cholesterol phải từ 100 đến 600 mg/dL';
  }
  if (data.sysBP === '' || data.sysBP < 60 || data.sysBP > 300) {
    errors.sysBP = 'Huyết áp tâm thu phải từ 60 đến 300 mmHg';
  }
  if (data.diaBP === '' || data.diaBP < 40 || data.diaBP > 200) {
    errors.diaBP = 'Huyết áp tâm trương phải từ 40 đến 200 mmHg';
  }
  if (data.BMI === '' || data.BMI < 10 || data.BMI > 60) {
    errors.BMI = 'BMI phải từ 10 đến 60';
  }
  if (data.heartRate === '' || data.heartRate < 30 || data.heartRate > 250) {
    errors.heartRate = 'Nhịp tim phải từ 30 đến 250 bpm';
  }
  if (data.glucose === '' || data.glucose < 30 || data.glucose > 500) {
    errors.glucose = 'Đường huyết phải từ 30 đến 500 mg/dL';
  }

  return errors;
};
