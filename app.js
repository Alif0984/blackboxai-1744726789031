// Global variables
let currentTransactionType = 'check-in';
let parkingSlots = Array(50).fill(null).map((_, index) => ({
    id: index + 1,
    status: Math.random() > 0.7 ? 'occupied' : 'available',
    vehicleNumber: null,
    entryTime: null
}));

// Utility Functions
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(amount);
};

const formatDateTime = (date) => {
    return new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(date));
};

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Initialize page-specific functionality
    const currentPage = window.location.pathname.split('/').pop();
    
    switch (currentPage) {
        case 'dashboard.html':
            initializeDashboard();
            break;
        case 'transaction.html':
            initializeTransaction();
            break;
        case 'history.html':
            initializeHistory();
            break;
    }
});

// Dashboard Page Functions
function initializeDashboard() {
    const parkingGrid = document.getElementById('parkingGrid');
    const refreshButton = document.getElementById('refreshButton');
    const errorMessage = document.getElementById('errorMessage');

    if (parkingGrid && refreshButton) {
        // Initial render
        renderParkingGrid();

        // Refresh button click handler
        refreshButton.addEventListener('click', () => {
            try {
                // Simulate API call delay
                refreshButton.disabled = true;
                refreshButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Memuat...';

                setTimeout(() => {
                    // Update some random slots
                    updateRandomSlots();
                    renderParkingGrid();
                    updateStatistics();
                    
                    refreshButton.disabled = false;
                    refreshButton.innerHTML = '<i class="fas fa-sync-alt mr-2"></i>Refresh';
                }, 1000);
            } catch (error) {
                errorMessage.classList.remove('hidden');
                setTimeout(() => errorMessage.classList.add('hidden'), 3000);
            }
        });
    }

    // Initialize recent activities
    initializeRecentActivities();
}

function renderParkingGrid() {
    const parkingGrid = document.getElementById('parkingGrid');
    if (!parkingGrid) return;

    parkingGrid.innerHTML = parkingSlots.map(slot => `
        <div class="bg-white p-4 rounded-lg border ${slot.status === 'occupied' ? 'border-red-200' : 'border-green-200'}">
            <div class="flex justify-between items-center">
                <span class="text-lg font-semibold">Slot ${slot.id}</span>
                <span class="px-2 py-1 rounded-full text-xs ${
                    slot.status === 'occupied' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-green-100 text-green-800'
                }">
                    ${slot.status === 'occupied' ? 'Terisi' : 'Kosong'}
                </span>
            </div>
            ${slot.status === 'occupied' ? `
                <div class="mt-2 text-sm text-gray-600">
                    <p>${slot.vehicleNumber || 'B 1234 CD'}</p>
                    <p>Masuk: ${formatDateTime(new Date())}</p>
                </div>
            ` : ''}
        </div>
    `).join('');
}

function updateRandomSlots() {
    parkingSlots.forEach(slot => {
        if (Math.random() > 0.8) {
            slot.status = slot.status === 'occupied' ? 'available' : 'occupied';
            slot.vehicleNumber = slot.status === 'occupied' ? generateRandomPlate() : null;
            slot.entryTime = slot.status === 'occupied' ? new Date() : null;
        }
    });
}

function updateStatistics() {
    const occupied = parkingSlots.filter(slot => slot.status === 'occupied').length;
    const available = parkingSlots.length - occupied;
    
    document.getElementById('totalSlots').textContent = parkingSlots.length;
    document.getElementById('availableSlots').textContent = available;
    document.getElementById('occupiedSlots').textContent = occupied;
}

function initializeRecentActivities() {
    const recentActivities = document.getElementById('recentActivities');
    if (!recentActivities) return;

    const activities = [
        {
            type: 'entry',
            plateNumber: 'B 1234 CD',
            slot: 'A12',
            time: '2 menit yang lalu'
        },
        {
            type: 'payment',
            plateNumber: 'D 5678 EF',
            amount: 15000,
            time: '15 menit yang lalu'
        }
    ];

    recentActivities.innerHTML = activities.map(activity => `
        <div class="flex items-center p-4 bg-gray-50 rounded-lg">
            <div class="p-3 rounded-full ${
                activity.type === 'entry' 
                ? 'bg-blue-100 text-blue-600' 
                : 'bg-green-100 text-green-600'
            }">
                <i class="fas ${activity.type === 'entry' ? 'fa-car-side' : 'fa-check'}"></i>
            </div>
            <div class="ml-4">
                <p class="text-sm font-medium text-gray-800">
                    ${activity.type === 'entry' ? 'Kendaraan Masuk' : 'Pembayaran Berhasil'}
                </p>
                <p class="text-sm text-gray-500">
                    ${activity.plateNumber}${activity.type === 'entry' ? ` - Slot ${activity.slot}` : ` - ${formatCurrency(activity.amount)}`}
                </p>
                <p class="text-xs text-gray-400">${activity.time}</p>
            </div>
        </div>
    `).join('');
}

// Transaction Page Functions
function initializeTransaction() {
    const form = document.getElementById('transactionForm');
    const checkInBtn = document.getElementById('checkInBtn');
    const checkOutBtn = document.getElementById('checkOutBtn');
    const captureBtn = document.getElementById('captureBtn');
    const paymentSection = document.getElementById('paymentSection');
    const exitTimeContainer = document.getElementById('exitTimeContainer');

    if (form) {
        form.addEventListener('submit', handleTransactionSubmit);
    }

    if (checkInBtn && checkOutBtn) {
        checkInBtn.addEventListener('click', () => switchTransactionType('check-in'));
        checkOutBtn.addEventListener('click', () => switchTransactionType('check-out'));
    }

    if (captureBtn) {
        captureBtn.addEventListener('click', simulateANPR);
    }

    // Initialize payment method buttons if they exist
    const paymentButtons = document.querySelectorAll('.payment-method-btn');
    paymentButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove selected class from all buttons
            paymentButtons.forEach(b => b.classList.remove('border-blue-500'));
            // Add selected class to clicked button
            btn.classList.add('border-blue-500');
        });
    });
}

function switchTransactionType(type) {
    currentTransactionType = type;
    const transactionBadge = document.getElementById('transactionBadge');
    const submitText = document.getElementById('submitText');
    const paymentSection = document.getElementById('paymentSection');
    const exitTimeContainer = document.getElementById('exitTimeContainer');
    const checkInBtn = document.getElementById('checkInBtn');
    const checkOutBtn = document.getElementById('checkOutBtn');

    if (type === 'check-in') {
        transactionBadge.textContent = 'Check In';
        transactionBadge.classList.remove('bg-green-100', 'text-green-600');
        transactionBadge.classList.add('bg-blue-100', 'text-blue-600');
        submitText.textContent = 'Proses Check In';
        paymentSection.classList.add('hidden');
        exitTimeContainer.classList.add('hidden');
        checkInBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
        checkInBtn.classList.remove('bg-gray-500');
        checkOutBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
        checkOutBtn.classList.add('bg-gray-500');
    } else {
        transactionBadge.textContent = 'Check Out';
        transactionBadge.classList.remove('bg-blue-100', 'text-blue-600');
        transactionBadge.classList.add('bg-green-100', 'text-green-600');
        submitText.textContent = 'Proses Check Out';
        paymentSection.classList.remove('hidden');
        exitTimeContainer.classList.remove('hidden');
        checkOutBtn.classList.add('bg-green-600', 'hover:bg-green-700');
        checkOutBtn.classList.remove('bg-gray-500');
        checkInBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
        checkInBtn.classList.add('bg-gray-500');
    }
}

function simulateANPR() {
    const plateNumber = document.getElementById('plateNumber');
    const anprStatus = document.getElementById('anprStatus');
    const captureBtn = document.getElementById('captureBtn');

    // Disable capture button and show loading state
    captureBtn.disabled = true;
    anprStatus.textContent = 'Status: Memproses gambar...';
    captureBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Memproses';

    // Simulate ANPR processing delay
    setTimeout(() => {
        const randomPlate = generateRandomPlate();
        plateNumber.value = randomPlate;
        anprStatus.textContent = 'Status: Plat nomor terdeteksi';
        
        // Reset capture button
        captureBtn.disabled = false;
        captureBtn.innerHTML = '<i class="fas fa-camera mr-2"></i>Capture Plat';

        // Show success message
        showToast('Plat nomor berhasil terdeteksi!', 'success');
    }, 1500);
}

function generateRandomPlate() {
    const areas = ['B', 'D', 'F', 'L', 'N', 'T'];
    const numbers = Math.floor(Math.random() * 9000) + 1000;
    const letters = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + 
                   String.fromCharCode(65 + Math.floor(Math.random() * 26));
    return `${areas[Math.floor(Math.random() * areas.length)]} ${numbers} ${letters}`;
}

function handleTransactionSubmit(e) {
    e.preventDefault();

    // Basic form validation
    const plateNumber = document.getElementById('plateNumber').value;
    const vehicleType = document.getElementById('vehicleType').value;
    const ownerName = document.getElementById('ownerName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;

    if (!plateNumber || !vehicleType || !ownerName || !phoneNumber) {
        showToast('Mohon lengkapi semua field yang diperlukan', 'error');
        return;
    }

    // Simulate processing
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Memproses...';

    setTimeout(() => {
        // Show success modal
        const successModal = document.getElementById('successModal');
        const successMessage = document.getElementById('successMessage');
        
        successMessage.textContent = currentTransactionType === 'check-in' 
            ? 'Kendaraan berhasil check in.' 
            : 'Pembayaran berhasil dan kendaraan dapat meninggalkan area parkir.';
        
        successModal.classList.remove('hidden');

        // Reset form
        e.target.reset();
        
        // Reset submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fas fa-save mr-2"></i>${
            currentTransactionType === 'check-in' ? 'Proses Check In' : 'Proses Check Out'
        }`;
    }, 1500);
}

// History Page Functions
function initializeHistory() {
    // Sample transaction data
    const transactions = generateSampleTransactions();
    
    // Populate table
    const tableBody = document.getElementById('transactionTableBody');
    if (tableBody) {
        tableBody.innerHTML = transactions.map(transaction => `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${transaction.id}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">${transaction.plateNumber}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${transaction.vehicleType}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${formatDateTime(transaction.entryTime)}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${formatDateTime(transaction.exitTime)}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${transaction.duration}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${formatCurrency(transaction.cost)}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.status === 'Selesai' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }">
                        ${transaction.status}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onclick="showTransactionDetail('${transaction.id}')" 
                            class="text-blue-600 hover:text-blue-900">
                        Detail
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // Initialize export button
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportTransactions);
    }

    // Initialize filters
    initializeFilters();
}

function generateSampleTransactions() {
    return Array(10).fill(null).map((_, index) => ({
        id: `TRX${String(index + 1).padStart(3, '0')}`,
        plateNumber: generateRandomPlate(),
        vehicleType: Math.random() > 0.5 ? 'Mobil' : 'Motor',
        entryTime: new Date(Date.now() - Math.random() * 86400000),
        exitTime: new Date(),
        duration: '2 jam',
        cost: Math.floor(Math.random() * 50000) + 10000,
        status: Math.random() > 0.2 ? 'Selesai' : 'Dalam Proses'
    }));
}

function showTransactionDetail(transactionId) {
    const detailModal = document.getElementById('detailModal');
    if (detailModal) {
        // In a real application, we would fetch the transaction details from the server
        // For now, we'll just show the modal with some sample data
        document.getElementById('modalTransactionId').textContent = transactionId;
        detailModal.classList.remove('hidden');
    }
}

function closeDetailModal() {
    const detailModal = document.getElementById('detailModal');
    if (detailModal) {
        detailModal.classList.add('hidden');
    }
}

function closeSuccessModal() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.classList.add('hidden');
    }
}

function initializeFilters() {
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');
    const vehicleTypeFilter = document.getElementById('vehicleTypeFilter');
    const searchPlate = document.getElementById('searchPlate');

    // Set default dates
    if (startDate && endDate) {
        const today = new Date();
        const thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
        
        startDate.valueAsDate = thirtyDaysAgo;
        endDate.valueAsDate = today;
    }

    // Add event listeners
    [startDate, endDate, vehicleTypeFilter, searchPlate].forEach(element => {
        if (element) {
            element.addEventListener('change', filterTransactions);
        }
    });

    if (searchPlate) {
        searchPlate.addEventListener('input', filterTransactions);
    }
}

function filterTransactions() {
    // In a real application, this would make an API call with the filter parameters
    console.log('Filtering transactions...');
}

function exportTransactions() {
    // In a real application, this would generate and download an Excel file
    alert('Ekspor data ke Excel akan tersedia segera!');
}

// Utility Functions
function showToast(message, type = 'success') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg text-white ${
        type === 'success' ? 'bg-green-600' : 'bg-red-600'
    }`;
    toast.textContent = message;

    // Add to document
    document.body.appendChild(toast);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}
