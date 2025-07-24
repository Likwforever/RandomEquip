// 装备数据
const equipmentData = {
    map: [
        { name: "零号大级机", details: "07 18 00:00-07 21 23:59", image: "https://picsum.photos/120/80?random=1" },
        { name: "废弃工厂", details: "08 01 00:00-08 05 23:59", image: "https://picsum.photos/120/80?random=2" },
        { name: "沙漠基地", details: "08 10 00:00-08 15 23:59", image: "https://picsum.photos/120/80?random=3" },
        { name: "城市废墟", details: "08 20 00:00-08 25 23:59", image: "https://picsum.photos/120/80?random=4" },
        { name: "地下实验室", details: "09 01 00:00-09 07 23:59", image: "https://picsum.photos/120/80?random=5" }
    ],
    character: [
        { name: "战术角色", details: "精英战士", image: "https://picsum.photos/120/80?random=10" },
        { name: "狙击手", details: "远程专家", image: "https://picsum.photos/120/80?random=11" },
        { name: "突击队员", details: "近战专家", image: "https://picsum.photos/120/80?random=12" },
        { name: "医疗兵", details: "支援专家", image: "https://picsum.photos/120/80?random=13" },
        { name: "侦察兵", details: "情报专家", image: "https://picsum.photos/120/80?random=14" }
    ],
    weapon: [
        { name: "复合弓", details: "远程武器", image: "https://picsum.photos/120/80?random=20" },
        { name: "突击步枪", details: "自动武器", image: "https://picsum.photos/120/80?random=21" },
        { name: "狙击枪", details: "精确武器", image: "https://picsum.photos/120/80?random=22" },
        { name: "散弹枪", details: "近距离武器", image: "https://picsum.photos/120/80?random=23" },
        { name: "手枪", details: "便携武器", image: "https://picsum.photos/120/80?random=24" }
    ],
    helmet: [
        { name: "H70 精英头盔", details: "1,695,734", image: "https://picsum.photos/120/80?random=30" },
        { name: "战术头盔", details: "2,150,000", image: "https://picsum.photos/120/80?random=31" },
        { name: "夜视头盔", details: "3,200,000", image: "https://picsum.photos/120/80?random=32" },
        { name: "防弹头盔", details: "4,500,000", image: "https://picsum.photos/120/80?random=33" },
        { name: "指挥官头盔", details: "5,800,000", image: "https://picsum.photos/120/80?random=34" }
    ],
    armor: [
        { name: "HA-2重型防弹衣", details: "2,298,346", image: "https://picsum.photos/120/80?random=40" },
        { name: "轻型护甲", details: "1,500,000", image: "https://picsum.photos/120/80?random=41" },
        { name: "中型护甲", details: "3,000,000", image: "https://picsum.photos/120/80?random=42" },
        { name: "重型护甲", details: "4,500,000", image: "https://picsum.photos/120/80?random=43" },
        { name: "特种护甲", details: "6,000,000", image: "https://picsum.photos/120/80?random=44" }
    ]
};

// 获取DOM元素
const randomButton = document.getElementById('randomButton');
const equipmentBoxes = document.querySelectorAll('.equipment-box');
const obtainedContent = document.querySelector('.obtained-content');

// 随机装备功能
let isRunning = false;
let flashInterval;
let finalWinner = null;

function getRandomEquipment(category) {
    const items = equipmentData[category];
    return items[Math.floor(Math.random() * items.length)];
}

function updateEquipmentBox(box, equipment) {
    const image = box.querySelector('.equipment-image');
    const name = box.querySelector('.equipment-name');
    const details = box.querySelector('.equipment-details');
    
    // 设置图片加载错误处理
    image.onerror = function() {
        // 如果图片加载失败，使用占位符图片
        this.src = `https://via.placeholder.com/120x80/2F4F4F/FFFFFF?text=${encodeURIComponent(equipment.name)}`;
    };
    
    image.src = equipment.image;
    name.textContent = equipment.name;
    details.textContent = equipment.details;
}

function startFlashing() {
    equipmentBoxes.forEach(box => {
        box.classList.add('flashing');
    });
}

function stopFlashing() {
    equipmentBoxes.forEach(box => {
        box.classList.remove('flashing');
    });
}

function showWinner(winnerBox) {
    winnerBox.classList.add('winner');
    setTimeout(() => {
        winnerBox.classList.remove('winner');
    }, 1500);
}

function updateObtainedEquipmentSummary(obtainedEquipment) {
    const summaryText = Object.entries(obtainedEquipment)
        .map(([category, name]) => `${getCategoryName(category)}：${name}`)
        .join('  ');
    
    obtainedContent.innerHTML = `
        <div class="obtained-summary">
            <div class="summary-text">${summaryText}</div>
        </div>
    `;
}

function getCategoryName(category) {
    const names = {
        map: '地图',
        character: '人物',
        weapon: '枪械',
        helmet: '头盔',
        armor: '护甲'
    };
    return names[category] || category;
}

function randomEquipment() {
    if (isRunning) return;
    
    isRunning = true;
    randomButton.disabled = true;
    randomButton.textContent = '随机中...';
    
    // 开始闪烁
    startFlashing();
    
    // 3秒后停止
    setTimeout(() => {
        stopFlashing();
        
        // 为所有装备框随机选择新装备
        const obtainedEquipment = {};
        
        equipmentBoxes.forEach(box => {
            const category = box.dataset.category;
            const randomItem = getRandomEquipment(category);
            updateEquipmentBox(box, randomItem);
            
            // 记录获得的装备
            obtainedEquipment[category] = randomItem.name;
        });
        
        // 显示所有装备框的获胜效果
        equipmentBoxes.forEach(box => {
            showWinner(box);
        });
        
        // 更新获得装备区域，显示所有装备的汇总
        updateObtainedEquipmentSummary(obtainedEquipment);
        
        // 重置按钮状态
        randomButton.disabled = false;
        randomButton.textContent = '随机装备';
        isRunning = false;
        
    }, 3000);
}

// 事件监听
randomButton.addEventListener('click', randomEquipment);

// 页面加载时的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 为每个装备框设置初始数据
    equipmentBoxes.forEach(box => {
        const category = box.dataset.category;
        const initialEquipment = equipmentData[category][0];
        updateEquipmentBox(box, initialEquipment);
    });
});

// 添加音效（可选）
function playSound(type) {
    // 这里可以添加音效播放逻辑
    console.log(`播放${type}音效`);
}

// 添加键盘快捷键
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !isRunning) {
        event.preventDefault();
        randomEquipment();
    }
});

// 添加触摸支持
randomButton.addEventListener('touchstart', function(event) {
    event.preventDefault();
    if (!isRunning) {
        randomEquipment();
    }
}); 