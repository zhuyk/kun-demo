// 当前步骤
let currentStep = 1;
const totalSteps = 7;
let selectedBank = null;

// 切换步骤
function showStep(step) {
    // 隐藏所有步骤
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    
    // 显示目标步骤
    const targetStep = document.getElementById('step' + step);
    if (targetStep) {
        targetStep.classList.add('active');
        currentStep = step;
        updateProgress();
        window.scrollTo(0, 0);
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

// 检查材料
function checkMaterials() {
    const requiredItems = document.querySelectorAll('.check-input[data-required="true"]');
    let allChecked = true;
    
    requiredItems.forEach(item => {
        if (!item.checked) {
            allChecked = false;
        }
    });
    
    if (!allChecked) {
        // 高亮未勾选的必要项
        requiredItems.forEach(item => {
            if (!item.checked) {
                item.closest('.check-item').style.background = '#fff5f5';
                setTimeout(() => {
                    item.closest('.check-item').style.background = '';
                }, 2000);
            }
        });
        
        if (confirm('还有必要材料未勾选！\n\n标记为必带的材料（前4项）缺一不可。\n\n是否仍要继续？')) {
            nextStep();
        }
    } else {
        nextStep();
    }
}

// 选择银行
function selectBank(element, bank) {
    // 移除其他选中状态
    document.querySelectorAll('.bank-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // 选中当前
    element.classList.add('selected');
    selectedBank = bank;
}

// 确认银行选择
function confirmBank() {
    if (!selectedBank) {
        alert('请先选择一家银行');
        return;
    }
    nextStep();
}

// 显示对话结果
function showResult(btn, isCorrect) {
    const resultBox = document.getElementById('result4');
    
    // 移除之前的样式
    document.querySelectorAll('.option-btn').forEach(b => {
        b.classList.remove('chosen', 'wrong');
    });
    
    if (isCorrect) {
        btn.classList.add('chosen');
        resultBox.className = 'result-box success';
        resultBox.innerHTML = '✅ <strong>正确！</strong>直接说明开储蓄账户即可，简单明了，不会引起额外审核。';
    } else {
        btn.classList.add('wrong');
        // 高亮正确答案
        document.querySelector('.option-btn.correct').classList.add('chosen');
        resultBox.className = 'result-box fail';
        resultBox.innerHTML = '❌ <strong>不太合适。</strong>避免提及投资、炒股等敏感目的。只说"开储蓄账户"是最稳妥的回答。';
    }
    
    resultBox.style.display = 'block';
}

// 重新开始
function restart() {
    selectedBank = null;
    
    // 重置所有checkbox
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = cb.defaultChecked;
    });
    
    // 重置对话选项
    document.querySelectorAll('.option-btn').forEach(b => {
        b.classList.remove('chosen', 'wrong');
    });
    
    const resultBox = document.getElementById('result4');
    if (resultBox) {
        resultBox.style.display = 'none';
    }
    
    // 重置银行选择
    document.querySelectorAll('.bank-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // 回到第一步
    showStep(1);
}

// 页面加载完成
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
});
