// 状态
let currentStep = 0; // 0 = home
const totalSteps = 4;
let selectedBank = null;

// 从首页选择银行进入流程
function startBank(bank) {
    selectedBank = bank;
    const phoneTitle = document.getElementById('phoneTitle');
    if (bank === 'za') {
        phoneTitle.textContent = 'ZA Bank 众安银行';
    } else {
        phoneTitle.textContent = '象象银行 EleBank';
    }
    showStep(1);
}

// 返回首页
function goHome() {
    selectedBank = null;
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = cb.defaultChecked;
    });
    document.querySelectorAll('.form-input').forEach(input => {
        if (input.tagName === 'INPUT') input.value = '';
    });
    showStep(0);
}

// 切换步骤
function showStep(step) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));

    if (step === 0) {
        document.getElementById('stepHome').classList.add('active');
    } else {
        const targetStep = document.getElementById('step' + step);
        if (targetStep) {
            targetStep.classList.add('active');
        }
    }

    currentStep = step;
    updateProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 下一步
function nextStep() {
    if (currentStep < totalSteps) {
        showStep(currentStep + 1);
    }
}

// 上一步
function prevStep() {
    if (currentStep > 1) {
        showStep(currentStep - 1);
    } else if (currentStep === 1) {
        goHome();
    }
}

// 更新进度条
function updateProgress() {
    const fill = document.getElementById('progressFill');
    const text = document.getElementById('progressText');

    if (currentStep === 0) {
        fill.style.width = '0%';
        text.textContent = '选择银行';
    } else {
        const percent = (currentStep / totalSteps) * 100;
        fill.style.width = percent + '%';

        const bankName = selectedBank === 'za' ? '众安银行' : '象象银行';
        text.textContent = bankName + ' · 步骤 ' + currentStep + ' / ' + totalSteps;
    }
}

// 页面加载
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
});
