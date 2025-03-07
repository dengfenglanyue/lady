document.addEventListener('DOMContentLoaded', function() {
    // 花朵图案的SVG数据
    const flowerSVGs = [
        `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="#e77c8d" d="M50 0 C60 30 70 40 100 50 C70 60 60 70 50 100 C40 70 30 60 0 50 C30 40 40 30 50 0"></path></svg>`,
        `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="#b6c199"/><circle cx="50" cy="30" r="20" fill="#e77c8d"/><circle cx="70" cy="50" r="20" fill="#e77c8d"/><circle cx="50" cy="70" r="20" fill="#e77c8d"/><circle cx="30" cy="50" r="20" fill="#e77c8d"/><circle cx="50" cy="50" r="15" fill="#f9d5e5"/></svg>`,
        `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="#e8d5c8" d="M50 15 Q65 15 75 25 Q85 35 85 50 Q85 65 75 75 Q65 85 50 85 Q35 85 25 75 Q15 65 15 50 Q15 35 25 25 Q35 15 50 15 Z"></path><circle cx="50" cy="50" r="15" fill="#e77c8d"/></svg>`
    ];
    
    // 创建花朵元素
    const flowerContainer = document.querySelector('.flower-container');
    
    function createFlower() {
        const flower = document.createElement('div');
        flower.className = 'flower';
        
        // 随机选择一个花朵SVG
        const randomSVG = flowerSVGs[Math.floor(Math.random() * flowerSVGs.length)];
        const svgBlob = new Blob([randomSVG], {type: 'image/svg+xml'});
        const url = URL.createObjectURL(svgBlob);
        flower.style.backgroundImage = `url('${url}')`;
        
        // 随机位置和大小
        const size = Math.random() * 30 + 20;
        flower.style.width = `${size}px`;
        flower.style.height = `${size}px`;
        flower.style.left = `${Math.random() * 100}%`;
        
        // 随机动画持续时间
        const duration = Math.random() * 10 + 10;
        flower.style.animationDuration = `${duration}s`;
        
        flowerContainer.appendChild(flower);
        
        // 动画结束后移除元素
        setTimeout(() => {
            flower.remove();
            URL.revokeObjectURL(url);
        }, duration * 1000);
    }
    
    // 定期创建花朵
    setInterval(createFlower, 300);
    
    // 初始创建一些花朵
    for (let i = 0; i < 20; i++) {
        setTimeout(createFlower, i * 200);
    }
    
    // 添加鼠标移动效果
    document.addEventListener('mousemove', function(e) {
        const card = document.querySelector('.card');
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
    
    // 鼠标离开时恢复原状
    document.addEventListener('mouseleave', function() {
        const card = document.querySelector('.card');
        card.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
    
    // 在JavaScript文件中添加卡片点击效果
    const card = document.querySelector('.card');
    
    card.addEventListener('click', function(e) {
        // 创建爱心元素
        const heart = document.createElement('div');
        heart.className = 'click-heart';
        
        // 设置爱心位置在鼠标点击处
        heart.style.left = `${e.clientX - card.getBoundingClientRect().left}px`;
        heart.style.top = `${e.clientY - card.getBoundingClientRect().top}px`;
        
        // 添加到卡片中
        card.appendChild(heart);
        
        // 动画结束后移除
        setTimeout(() => {
            heart.remove();
        }, 1000);
    });
    
    // 在JavaScript文件中添加自定义消息功能
    function loadCustomMessage() {
        // 获取URL参数
        const urlParams = new URLSearchParams(window.location.search);
        const customMessage = urlParams.get('message');
        const customName = urlParams.get('name');
        
        // 如果有自定义消息，替换默认消息
        if (customMessage) {
            const messages = document.querySelectorAll('.message');
            // 保留第一个"亲爱的，"
            const customLines = customMessage.split('|');
            
            for (let i = 0; i < Math.min(customLines.length, messages.length - 1); i++) {
                messages[i + 1].textContent = customLines[i];
            }
        }
        
        // 如果有自定义名字，替换签名
        if (customName) {
            const signature = document.querySelector('.signature');
            signature.textContent = `爱你的${customName}`;
        }
    }
    
    // 加载自定义消息
    loadCustomMessage();
    
    // 音乐控制
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    
    if (musicToggle && bgMusic) {
        musicToggle.addEventListener('click', function() {
            if (bgMusic.paused) {
                bgMusic.play();
                musicToggle.classList.add('playing');
            } else {
                bgMusic.pause();
                musicToggle.classList.remove('playing');
            }
        });
        
        // 用户交互后自动播放音乐
        document.addEventListener('click', function() {
            if (bgMusic.paused && !window.musicInitiated) {
                bgMusic.play().then(() => {
                    musicToggle.classList.add('playing');
                    window.musicInitiated = true;
                }).catch(err => {
                    console.log('自动播放失败:', err);
                });
            }
        }, {once: true});
    }
    
    // 在JavaScript文件中添加加载动画控制
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader');
        if (loader) {
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 1500);
        }
    });

    //音乐自动播放
    window.addEventListener('DOMContentLoaded', function() {
        const bgMusic = document.getElementById('bgMusic');
        const musicToggle = document.getElementById('musicToggle');
        
        // 尝试自动播放
        const playPromise = bgMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // 自动播放成功
                console.log('音乐自动播放成功');
                musicToggle.classList.add('playing');
            })
            .catch(error => {
                // 自动播放失败，需要用户交互
                console.log('音乐自动播放失败，需要用户交互:', error);
                
                // 添加点击事件监听器到整个文档
                document.addEventListener('click', function autoPlayAfterInteraction() {
                    bgMusic.play().then(() => {
                        musicToggle.classList.add('playing');
                        // 移除事件监听器，避免重复触发
                        document.removeEventListener('click', autoPlayAfterInteraction);
                    });
                });
            });
        }
    });
});