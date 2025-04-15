<nav class="bg-white shadow-lg fixed w-full z-50">
    <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between items-center h-16">
            <div class="flex items-center">
                <a href="index.php" class="flex items-center">
                    <i class="fas fa-parking text-blue-600 text-2xl mr-2"></i>
                    <span class="text-xl font-semibold text-gray-800">SmartPark</span>
                </a>
            </div>
            <div class="hidden md:flex items-center space-x-4">
                <a href="index.php" class="<?php echo $currentPage === 'home' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'; ?> px-3 py-2 rounded-md font-medium">Home</a>
                <a href="dashboard.php" class="<?php echo $currentPage === 'dashboard' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'; ?> px-3 py-2 rounded-md font-medium">Dashboard</a>
                <a href="transaction.php" class="<?php echo $currentPage === 'transaction' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'; ?> px-3 py-2 rounded-md font-medium">Transaksi</a>
                <a href="history.php" class="<?php echo $currentPage === 'history' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'; ?> px-3 py-2 rounded-md font-medium">Riwayat</a>
                <?php if (isset($_SESSION['user_id'])): ?>
                    <div class="relative ml-3">
                        <button type="button" onclick="toggleUserMenu()" class="flex items-center text-gray-600 hover:text-blue-600">
                            <i class="fas fa-user-circle text-xl"></i>
                            <span class="ml-2"><?php echo htmlspecialchars($_SESSION['user_name']); ?></span>
                        </button>
                        <div id="userMenu" class="hidden absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div class="py-1">
                                <a href="profile.php" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                                <a href="logout.php" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
                            </div>
                        </div>
                    </div>
                <?php else: ?>
                    <a href="login.php" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Login</a>
                <?php endif; ?>
            </div>
            <div class="md:hidden flex items-center">
                <button class="mobile-menu-button">
                    <i class="fas fa-bars text-gray-600 text-xl"></i>
                </button>
            </div>
        </div>
    </div>
    <!-- Mobile menu -->
    <div class="mobile-menu hidden md:hidden">
        <a href="index.php" class="block <?php echo $currentPage === 'home' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'; ?> px-4 py-2 font-medium">Home</a>
        <a href="dashboard.php" class="block <?php echo $currentPage === 'dashboard' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'; ?> px-4 py-2 font-medium">Dashboard</a>
        <a href="transaction.php" class="block <?php echo $currentPage === 'transaction' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'; ?> px-4 py-2 font-medium">Transaksi</a>
        <a href="history.php" class="block <?php echo $currentPage === 'history' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'; ?> px-4 py-2 font-medium">Riwayat</a>
        <?php if (isset($_SESSION['user_id'])): ?>
            <a href="profile.php" class="block text-gray-600 hover:text-blue-600 px-4 py-2 font-medium">Profile</a>
            <a href="logout.php" class="block text-gray-600 hover:text-blue-600 px-4 py-2 font-medium">Logout</a>
        <?php else: ?>
            <a href="login.php" class="block text-gray-600 hover:text-blue-600 px-4 py-2 font-medium">Login</a>
        <?php endif; ?>
    </div>
</nav>

<script>
function toggleUserMenu() {
    const menu = document.getElementById('userMenu');
    menu.classList.toggle('hidden');
}

// Close the menu when clicking outside
document.addEventListener('click', function(event) {
    const menu = document.getElementById('userMenu');
    const button = event.target.closest('button');
    if (!menu.classList.contains('hidden') && !button) {
        menu.classList.add('hidden');
    }
});
</script>
