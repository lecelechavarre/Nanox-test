        document.addEventListener("scroll", () => {
            const chatLogo = document.querySelector(".chat-logo-container");
            if (!chatLogo) return;

            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;

            const isAtBottom = scrollTop + windowHeight >= docHeight - 1;

            if (isAtBottom) {
                chatLogo.style.transform = "translateY(-80px)";
            } else {
                chatLogo.style.transform = "translateY(0)";
            }
        });
        // Only for mobile devices
        const chatLogo = document.getElementById('chatLogo');

        if (window.innerWidth <= 768) {
            chatLogo.addEventListener('touchstart', () => {
                chatLogo.classList.add('mobile-expanded');
            });

            // Collapse after user taps outside
            document.addEventListener('touchstart', (e) => {
                if (!chatLogo.contains(e.target)) {
                    chatLogo.classList.remove('mobile-expanded');
                }
            });
        }



        // ===== PORTABLE CHAT BUTTON & MODAL JAVASCRIPT =====
        (function() {
            // Get DOM elements
            const chatLogo = document.getElementById('chatLogo');
            const inquiryModal = document.getElementById('inquiryModal');
            const notificationBadge = document.querySelector('.notification-badge');
            
            // Prevent body scroll when modal is open
            function preventBodyScroll(prevent) {
                if (prevent) {
                    document.body.style.overflow = 'hidden';
                    document.documentElement.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                }
            }
            
            // Open modal when chat logo is clicked
            chatLogo.addEventListener('click', function(e) {
                e.stopPropagation();
                inquiryModal.style.display = 'flex';
                preventBodyScroll(true);
                
                // Remove notification badge after opening
                if (notificationBadge) {
                    notificationBadge.style.display = 'none';
                }
            });
            
            // Close modal when clicking outside the modal content
            inquiryModal.addEventListener('click', function(e) {
                // Check if click is on the modal background (not the content)
                if (e.target === inquiryModal) {
                    inquiryModal.style.display = 'none';
                    preventBodyScroll(false);
                }
            });
            
            // Close modal with Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && inquiryModal.style.display === 'flex') {
                    inquiryModal.style.display = 'none';
                    preventBodyScroll(false);
                }
            });
            
            // Handle iframe loading
            const iframe = document.querySelector('.chat-modal-body iframe');
            if (iframe) {
                iframe.addEventListener('load', function() {
                    console.log('Chat form iframe loaded successfully');
                    
                    // Try to prevent iframe clicks from bubbling to parent
                    try {
                        iframe.contentWindow.document.addEventListener('click', function(e) {
                            e.stopPropagation();
                        });
                    } catch (e) {
                        // Cross-origin iframe may block this - that's okay
                    }
                });
            }
            
            // Add touch events for better mobile support
            chatLogo.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });

            chatLogo.addEventListener('touchend', function() {
                this.style.transform = '';
            });

            // Handle device orientation changes
            window.addEventListener('orientationchange', function() {
                setTimeout(function() {
                    if (inquiryModal.style.display === 'flex') {
                        // Refresh modal display after orientation change
                        inquiryModal.style.display = 'none';
                        setTimeout(function() {
                            inquiryModal.style.display = 'flex';
                        }, 50);
                    }
                }, 300);
            });
            
            // Expose public API for site integration
            window.ChatInquiry = {
                open: function() {
                    chatLogo.click();
                },
                close: function() {
                    inquiryModal.style.display = 'none';
                    preventBodyScroll(false);
                },
                isOpen: function() {
                    return inquiryModal.style.display === 'flex';
                },
                setNotificationCount: function(count) {
                    if (notificationBadge) {
                        if (count > 0) {
                            notificationBadge.textContent = count > 99 ? '99+' : count;
                            notificationBadge.style.display = 'flex';
                        } else {
                            notificationBadge.style.display = 'none';
                        }
                    }
                }
            };
            
            console.log('Chat inquiry system loaded successfully');
        })();