// 모바일 메뉴 토글 기능
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMobile = document.querySelector('.nav-mobile');
    const navClose = document.querySelector('.nav-close');
    const navLinks = document.querySelectorAll('.nav-mobile-list a');
    
    // 모바일 메뉴 열기
    mobileMenuToggle.addEventListener('click', function() {
        navMobile.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // 모바일 메뉴 닫기
    navClose.addEventListener('click', function() {
        navMobile.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // 네비게이션 링크 클릭 시 메뉴 닫기
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMobile.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // 모바일 메뉴 외부 클릭 시 닫기
    navMobile.addEventListener('click', function(e) {
        if (e.target === navMobile) {
            navMobile.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// FAQ 토글 기능
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // 다른 모든 FAQ 아이템 닫기
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // 현재 아이템 토글
            item.classList.toggle('active');
        });
    });
});

// 부드러운 스크롤 효과
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = 70;
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 플로팅 버튼 기능
document.addEventListener('DOMContentLoaded', function() {
    // 전화 버튼 클릭 이벤트
    const phoneBtn = document.querySelector('.phone-btn');
    if (phoneBtn) {
        phoneBtn.addEventListener('click', function() {
            // 실제 전화번호로 변경 필요
            alert('전화상담으로 연결됩니다.');
            // window.location.href = 'tel:전화번호';
        });
    }
    
    // 맨 위로 버튼 클릭 이벤트
    const topBtn = document.querySelector('.top-btn');
    if (topBtn) {
        topBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 스크롤 시 맨 위로 버튼 표시/숨김
    window.addEventListener('scroll', function() {
        const topBtn = document.querySelector('.top-btn');
        if (topBtn) {
            if (window.scrollY > 300) {
                topBtn.style.opacity = '1';
                topBtn.style.visibility = 'visible';
            } else {
                topBtn.style.opacity = '0';
                topBtn.style.visibility = 'hidden';
            }
        }
    });
});

// 신청하기 버튼 클릭 이벤트
document.querySelector('.cta-button').addEventListener('click', function() {
    // 실제 신청 페이지로 이동
    alert('대출 신청 페이지로 이동합니다.');
    // window.location.href = '신청 페이지 URL';
});

// 숫자 카운트 애니메이션
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = stat.textContent;
        const isPercentage = target.includes('%');
        const isMoney = target.includes('₩') || target.includes('억');
        const isTime = target.includes('분');
        
        let finalNumber;
        if (isPercentage) {
            finalNumber = parseInt(target.replace('%', ''));
        } else if (isMoney) {
            finalNumber = parseInt(target.replace(/[₩억,]/g, ''));
        } else if (isTime) {
            finalNumber = parseInt(target.replace('분', ''));
        } else {
            finalNumber = parseInt(target.replace(/[,+]/g, ''));
        }
        
        let current = 0;
        const increment = finalNumber / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= finalNumber) {
                current = finalNumber;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (isPercentage) {
                stat.textContent = displayValue + '%';
            } else if (isMoney) {
                if (target.includes('억')) {
                    stat.textContent = '₩' + displayValue + '억+';
                } else {
                    stat.textContent = '₩' + displayValue.toLocaleString() + '+';
                }
            } else if (isTime) {
                stat.textContent = displayValue + '분';
            } else {
                stat.textContent = displayValue.toLocaleString() + '+';
            }
        }, 30);
    });
}

// 자동 스크롤 리뷰 기능
document.addEventListener('DOMContentLoaded', function() {
    const reviewsTrack = document.querySelector('.reviews-track');
    if (reviewsTrack) {
        // 리뷰 카드들을 복제하여 무한 스크롤 효과 생성
        const reviewCards = reviewsTrack.querySelectorAll('.review-card');
        reviewCards.forEach(card => {
            const clone = card.cloneNode(true);
            reviewsTrack.appendChild(clone);
        });
        
        // 2초마다 다음 카드로 이동하는 기능
        let currentIndex = 0;
        const cardWidth = 330; // 카드 너비 + gap
        
        function moveToNextCard() {
            currentIndex++;
            if (currentIndex >= reviewCards.length) {
                currentIndex = 0;
            }
            reviewsTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }
        
        // 2초마다 자동으로 다음 카드로 이동
        setInterval(moveToNextCard, 2000);
        
        // 마우스 호버 시 애니메이션 일시정지
        reviewsTrack.addEventListener('mouseenter', function() {
            reviewsTrack.style.animationPlayState = 'paused';
        });
        
        reviewsTrack.addEventListener('mouseleave', function() {
            reviewsTrack.style.animationPlayState = 'running';
        });
    }
});

// Intersection Observer로 애니메이션 트리거
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('stats')) {
                animateNumbers();
            }
        }
    });
}, observerOptions);

// 통계 섹션 관찰 시작
const statsSection = document.querySelector('.stats');
if (statsSection) {
    observer.observe(statsSection);
}
