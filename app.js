// 当前步骤
let currentStep = 1;
const totalSteps = 6;
let selectedBank = null;

// 切换步骤
function showStep(step) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    const targetStep = document.getElementById('step' + step);
    if (targetStep) {
        targetStep.classList.add('active');
        currentStep = step;
        updateProgress();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
    }
}

// 更新进度条
function updateProgress() {
    const fill = document.getElementById('progressFill');
    const text = document.getElementById('progressText');
    const percent = (currentStep / totalSteps) * 100;
    fill.style.width = percent + '%';
    text.textContent = '步骤 ' + currentStep + ' / ' + totalSteps;
}

// 选择银行
function selectBank(element, bank) {
    document.querySelectorAll('.bank-select-card').forEach(card => {
        card.classList.remove('selected');
    });
    element.classList.add('selected');
    selectedBank = bank;

    // 更新后续步骤中的银行名称
    const phoneTitle = document.getElementById('phoneTitle');
    if (bank === 'za') {
        phoneTitle.textContent = 'ZA Bank 众安银行';
    } else {
        phoneTitle.textContent = 'Airstar Bank 天星银行';
    }
}

// 确认银行选择
function confirmBank() {
    if (!selectedBank) {
        // 高亮提示选择
        document.querySelectorAll('.bank-select-card').forEach(card => {
            card.style.animation = 'shake 0.3s';
            setTimeout(() => { card.style.animation = ''; }, 300);
        });
        alert('请先选择一家银行（也可以之后两个都开）');
        return;
    }
    nextStep();
}

// 重新开始
function restart() {
    selectedBank = null;
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = cb.defaultChecked;
    });
    document.querySelectorAll('.bank-select-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.querySelectorAll('.form-input').forEach(input => {
        if (input.tagName === 'INPUT') input.value = '';
    });
    showStep(1);
}

// 页面加载
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
});
