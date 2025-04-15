<!-- Footer -->
    <footer class="bg-gray-800 text-white py-8">
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <div class="flex items-center mb-4 md:mb-0">
                    <i class="fas fa-parking text-blue-400 text-2xl mr-2"></i>
                    <span class="text-xl font-semibold">SmartPark</span>
                </div>
                <div class="flex space-x-4">
                    <a href="#" class="hover:text-blue-400">
                        <i class="fab fa-facebook"></i>
                    </a>
                    <a href="#" class="hover:text-blue-400">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#" class="hover:text-blue-400">
                        <i class="fab fa-instagram"></i>
                    </a>
                </div>
            </div>
            <div class="mt-4 text-center text-gray-400 text-sm">
                &copy; <?php echo date('Y'); ?> SmartPark. All rights reserved.
            </div>
        </div>
    </footer>

    <!-- Toast Notification -->
    <div id="toast" class="fixed bottom-4 right-4 px-6 py-3 rounded-lg text-white hidden"></div>

    <script>
    // Show toast notification
    function showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg text-white ${
            type === 'success' ? 'bg-green-600' : 'bg-red-600'
        }`;
        toast.classList.remove('hidden');
        
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }

    // Mobile menu toggle
    document.addEventListener('DOMContentLoaded', () => {
        const mobileMenuButton = document.querySelector('.mobile-menu-button');
        const mobileMenu = document.querySelector('.mobile-menu');

        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
    });
    </script>

    <?php if (isset($pageScript)): ?>
    <script src="<?php echo $pageScript; ?>"></script>
    <?php endif; ?>

</body>
</html>
