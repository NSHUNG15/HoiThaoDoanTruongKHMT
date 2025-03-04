const showRulesBtn = document.getElementById('showRulesBtn');
const rulesModal = document.getElementById('rulesModal');
const closeModal = document.querySelector('.close-modal');
const downloadType = document.getElementById('downloadType');
const downloadSection = document.getElementById('downloadSection');
const downloadNote = document.getElementById('downloadNote');
const rulesDownload = document.getElementById('rulesDownload');
const templateDownload = document.getElementById('templateDownload');
const downloadTitle = document.getElementById('downloadTitle');


const downloadLinks = {
    football: {
        rules: 'export?format=pdf',
        template: '',
        title: 'Bóng đá'
    },
    athletics: {
        rules: '',
        template: '',
        title: 'Điền kinh'
    },
    badminton: {
        rules: '',
        template: '',
        title: 'Cầu lông'
    },
    chess: {
        rules: '',
        template: '',
        title: 'Đánh cờ'
    }
};

// Modal event listeners
showRulesBtn.addEventListener('click', () => {
    rulesModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    const selectedSport = sportType.value;
    if (selectedSport) {
        downloadType.value = selectedSport;
        updateDownloadSection(selectedSport);
    } else {
        // Reset modal về trạng thái chưa chọn
        downloadType.value = '';
        downloadSection.style.display = 'none';
        downloadNote.style.display = 'none';
    }
});
function nextPage() {
    document.querySelector(".next-btn").addEventListener("click", function () {
        const page = document.querySelector(".header"); 
        page.classList.add("fade-out"); 

        setTimeout(() => {
            window.location.href = "next-page.html"; 
        }, 600); 
    });
}
closeModal.addEventListener('click', closeModalHandler);
rulesModal.addEventListener('click', (e) => {
    if (e.target === rulesModal) {
        closeModalHandler();
    }
});

rulesModal.querySelector('.rules-modal-content').addEventListener('click', (e) => {
    e.stopPropagation();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && rulesModal.classList.contains('active')) {
        closeModalHandler();
    }
});

function closeModalHandler() {
    rulesModal.classList.remove('active');
    document.body.style.overflow = '';
}

function updateDownloadSection(sportValue) {
    if (sportValue) {
        const sportData = downloadLinks[sportValue];
        if (sportData) {
            downloadTitle.textContent = `Tài liệu cho môn ${sportData.title}`;
            rulesDownload.href = sportData.rules;
            templateDownload.href = sportData.template;
            downloadSection.style.display = 'block';
            downloadNote.style.display = 'flex';
        }
    } else {
        downloadSection.style.display = 'none';
        downloadNote.style.display = 'none';
    }
}

downloadType.addEventListener('change', function() {
    updateDownloadSection(this.value);
});

[rulesDownload, templateDownload].forEach(link => {
    link.addEventListener('click', function(e) {
        if (!downloadType.value) {
            e.preventDefault();
            alert('Vui lòng chọn môn thể thao trước khi tải');
        }
    });
});


const IMGBB_API_KEY = 'b2e87b23d104980a18640e76ee7a8738';
const IMGBB_UPLOAD_URL = 'https://api.imgbb.com/1/upload';

// Google Form Configuration
const GOOGLE_FORM = {
    URL: 'https://docs.google.com/forms/d/e/1FAIpQLSd7JacFgRgL1s3wDj9mVLYKBqjF-fMdM9Pcu8RXKOAcut6Lcw/formResponse',
    FIELDS: {
        timestamp: 'entry.430699177',
        sport: 'entry.1852553583',
        subType: 'entry.1150567096',
        teamName: 'entry.826148831',
        teamList: 'entry.1523621309',
        name: 'entry.753228178',
        studentId: 'entry.152397648',
        class: 'entry.1739780755',
        email: 'entry.1071456056',
        phone: 'entry.1118831544',
        price: 'entry.458820244',
        billUrl: 'entry.804108177'
    }
};
const sportType = document.getElementById('sportType');
const subTypeContainer = document.getElementById('subTypeContainer');
const subType = document.getElementById('subType');
const qrContainer = document.getElementById('qrContainer');
const qrText = document.getElementById('qrText');
const form = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const priceInfo = document.getElementById('priceInfo');
const priceAmount = document.getElementById('priceAmount');
const priceNote = document.getElementById('priceNote');
const teamListContainer = document.getElementById('teamListContainer');
const teamNameContainer = document.getElementById('teamNameContainer');
const rulesContainer = document.getElementById('rulesContainer');
const billInput = document.getElementById('bill');

const subTypeOptions = {
    badminton: [
        'Cá nhân nam',     
        'Cá nhân nữ',      
        'Đôi nam nữ'       
    ],
    football: ['Đội nam'],
    athletics: ['Chạy nhanh', 'Chạy bền'],
    chess: ['Cờ tướng', 'Cờ vua']
};

const prices = {
    football: {
        amount: 1500000,
        note: "Phí cho cả đội"
    },
    athletics: {
        'Chạy nhanh': {
            amount: 100000,
            note: "Phí theo người"
        },
        'Chạy bền': {
            amount: 100000,
            note: "Phí theo người"
        },
    },
    badminton: {
        'Cá nhân nam': {
            amount: 150000,
            note: "Phí theo người"
        },
        'Cá nhân nữ': {
            amount: 150000,
            note: "Phí theo người"
        },
        'Đôi nam nữ': {
            amount: 300000,
            note: "Phí theo đôi"
        }
    },
    chess: {
        'Cờ tướng': {
            amount: 50000,
            note: "Phí theo người"
        },
        'Cờ vua': {
            amount: 50000,
            note: "Phí theo người"
        },
    }
};

// Utility Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

async function uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('key', IMGBB_API_KEY);

    try {
        const response = await fetch(IMGBB_UPLOAD_URL, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Upload failed');
        }

        const data = await response.json();
        return data.data.url;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Failed to upload image');
    }
}

async function submitToGoogleForm(formData) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = GOOGLE_FORM.URL;

    // Chuyển đổi formData thành URLSearchParams (định dạng URL-encoded)
    const encodedData = new URLSearchParams();
    for (const [key, value] of Object.entries(formData)) {
        encodedData.append(GOOGLE_FORM.FIELDS[key], value);
    }

    try {
        // Gửi yêu cầu POST tới Google Form
        const response = await fetch(GOOGLE_FORM.URL, {
            method: 'POST',
            mode: 'no-cors', // Không cần đợi phản hồi từ Google
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: encodedData
        });

        return true;
    } catch (error) {
        console.error('Lỗi khi gửi form:', error);
        return false;
    }
}

// Bill Preview Handler
function handleBillPreview(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        // Remove existing preview
        const existingPreview = document.querySelector('.bill-preview');
        if (existingPreview) {
            existingPreview.remove();
        }

        // Create new preview
        const preview = document.createElement('div');
        preview.className = 'bill-preview';
        preview.style.cssText = 'margin-top: 10px; position: relative;';

        const img = document.createElement('img');
        img.src = e.target.result;
        img.style.cssText = 'max-width: 200px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);';

        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '×';
        removeBtn.style.cssText = `
            position: absolute;
            top: -10px;
            right: -10px;
            background: #ff4444;
            color: white;
            border: none;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        `;

        removeBtn.onclick = function() {
            preview.remove();
            billInput.value = '';
        };

        preview.appendChild(img);
        preview.appendChild(removeBtn);
        billInput.parentNode.appendChild(preview);
    };

    reader.readAsDataURL(file);
}

// Event Listeners
window.addEventListener('load', function() {
    // Hide all form fields except sport selection
    const formFields = document.querySelectorAll('.form-group:not(:first-child), .price-info, .qr-container');
    formFields.forEach(field => field.style.display = 'none');

    // Show rules container
    if (!sportType.value) {
        rulesContainer.classList.add('active');
    }
});

sportType.addEventListener('change', function() {
    const formFields = document.querySelectorAll('.form-group:not(:first-child), .price-info, .qr-container');
    formFields.forEach(field => field.style.display = this.value ? 'block' : 'none');

    if (this.value) {
        rulesContainer.classList.remove('active');
        
        // Handle team fields visibility
        const isTeamSport = ['football'].includes(this.value);
        teamListContainer.style.display = isTeamSport ? 'block' : 'none';
        teamNameContainer.style.display = isTeamSport ? 'block' : 'none';
        document.getElementById('teamList').required = isTeamSport;
        document.getElementById('teamName').required = isTeamSport;
        
        // Update price display
        if (this.value === 'chess' || this.value === 'badminton' || this.value === 'athletics') {
            const firstType = subTypeOptions[this.value][0];
            const price = prices[this.value][firstType];
            priceAmount.textContent = formatCurrency(price.amount);
            priceNote.textContent = price.note;
        } else {
            const price = prices[this.value];
            priceAmount.textContent = formatCurrency(price.amount);
            priceNote.textContent = price.note;
        }
        
        // Update subtype options
        subType.innerHTML = '<option value="">-- Chọn hình thức --</option>';
        subTypeOptions[this.value].forEach(option => {
            const optElement = document.createElement('option');
            optElement.value = option;
            optElement.textContent = option;
            subType.appendChild(optElement);
        });
    } else {
        rulesContainer.classList.add('active');
    }
    updateQRText();
});

subType.addEventListener('change', function() {
    const currentSport = sportType.value;
    const currentType = this.value;

    if (currentSport === 'badminton') {
        const isDoubleType = currentType.includes('Đôi');
        teamListContainer.style.display = isDoubleType ? 'block' : 'none';
        teamNameContainer.style.display = isDoubleType ? 'block' : 'none';
        document.getElementById('teamList').required = isDoubleType;
        document.getElementById('teamName').required = isDoubleType;
    }

    if ((currentSport === 'chess' || currentSport === 'badminton' || currentSport ==='athletics') && currentType) {
        const price = prices[currentSport][currentType];
        priceAmount.textContent = formatCurrency(price.amount);
        priceNote.textContent = price.note;
        
        if (nameInput.value) {
            updateQRText();
        }
    }
});

nameInput.addEventListener('input', function() {
    if (sportType.value) {
        updateQRText();
    }
});

billInput.addEventListener('change', function(e) {
    if (this.files && this.files[0]) {
        handleBillPreview(this.files[0]);
    }
});

// Form submission
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitButton = this.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';

    try {
        const sportValue = sportType.value;
        const subTypeValue = subType.value;
        
        if (!sportValue) {
            throw new Error('Vui lòng chọn môn thể thao!');
        }

        if (!subTypeValue) {
            throw new Error('Vui lòng chọn hình thức thi đấu!');
        }

        const isTeamSport = ['football'].includes(sportValue);
        const isBadmintonDouble = sportValue === 'badminton' && subTypeValue.includes('Đôi');
        
        if (isTeamSport || isBadmintonDouble) {
            const teamListUrl = document.getElementById('teamList').value;
            const teamName = document.getElementById('teamName').value;
            
            if (!teamListUrl.includes('docs.google.com/spreadsheets')) {
                throw new Error('Vui lòng nhập link Google Sheet hợp lệ!');
            }
            
            if (!teamName.trim()) {
                throw new Error('Vui lòng nhập tên đội!');
            }
        }

        // Bill upload
        const billFile = billInput.files[0];
        if (!billFile) {
            throw new Error('Vui lòng upload bill thanh toán!');
        }

        // Upload bill image
        const billUrl = await uploadImage(billFile);

        // Prepare form data
        const formData = {
            timestamp: new Date().toISOString(),
            sport: sportType.options[sportType.selectedIndex].text,
            subType: subTypeValue,
            name: nameInput.value,
            studentId: document.getElementById('studentId').value,
            class: document.getElementById('class').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            price: (sportValue === 'chess' || sportValue === 'badminton')
                ? prices[sportValue][subTypeValue].amount 
                : prices[sportValue].amount,
            billUrl: billUrl
        };

        // Add team info if applicable
        if (isTeamSport || isBadmintonDouble) {
            formData.teamName = document.getElementById('teamName').value;
            formData.teamList = document.getElementById('teamList').value;
        }

        // Submit to Google Form
        await submitToGoogleForm(formData);
        
        alert('Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
        
        // Reset form
        form.reset();
        const formFields = document.querySelectorAll('.form-group:not(:first-child), .price-info, .qr-container');
        formFields.forEach(field => field.style.display = 'none');
        rulesContainer.classList.add('active');
        
        // Remove bill preview
        const billPreview = document.querySelector('.bill-preview');
        if (billPreview) {
            billPreview.remove();
        }

        // Prevent further submission
        return false;

    } catch (error) {
        console.error('Error:', error);
        alert(error.message || 'Có lỗi xảy ra. Vui lòng thử lại sau!');
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }
});


// Sport icons click handler
document.querySelectorAll('.sport-icon').forEach(icon => {
    icon.addEventListener('click', function() {
        const sportText = this.querySelector('.title').textContent;
        const options = Array.from(sportType.options);
        const optionToSelect = options.find(item => item.text === sportText);
        if (optionToSelect) {
            sportType.value = optionToSelect.value;
            sportType.dispatchEvent(new Event('change'));
        }
        form.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Scroll animation
function reveal() {
    const reveals = document.querySelectorAll(".purpose-item, .timeline-item, .sport-icon");
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add("fade-in");
        }
    });
}

// Initialize animations
window.addEventListener("scroll", reveal);
reveal();

// Add loading indicator styles
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    .fa-spin {
        animation: spin 1s linear infinite;
    }
`;
document.head.appendChild(style);

// Helper function to update QR text
function updateQRText() {
    const sportName = sportType.options[sportType.selectedIndex].text;
    let price;
    
    if (sportType.value === 'chess' || sportType.value === 'badminton' || sportType.value === 'athletics') {
        if (subType.value) {
            price = prices[sportType.value][subType.value].amount;
        }
    } else {
        price = prices[sportType.value].amount;
    }

    if (sportType.value === 'football') {
        price = prices.football.amount;  
    } else if (sportType.value && subType.value) {
        price = prices[sportType.value]?.[subType.value]?.amount || 0;
    }
    if (price) {
        qrText.innerHTML = `
            <div style="margin-bottom: 10px;">${nameInput.value} - ${sportName}${subType.value ? ` - ${subType.value}` : ''}</div>
            <div style="color: var(--primary-red);">
                ${formatCurrency(price)}
            </div>
        `;
    }
}

