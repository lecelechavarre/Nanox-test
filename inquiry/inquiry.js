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

// ===== PORTABLE CHAT BUTTON & MODAL JAVASCRIPT =====
(function() {
    // Get DOM elements
    const chatLogo = document.getElementById('chatLogo');
    const inquiryModal = document.getElementById('inquiryModal');
    const notificationBadge = document.querySelector('.notification-badge');
    
    // Create confirmation modal elements
    const confirmationModal = document.createElement('div');
    confirmationModal.id = 'confirmationModal';
    confirmationModal.className = 'chat-modal';
    confirmationModal.style.display = 'none';
    
    const confirmationContent = document.createElement('div');
    confirmationContent.className = 'chat-modal-content confirmation-content';
    confirmationContent.style.maxWidth = '500px';
    confirmationContent.style.height = 'auto';
    
    const confirmationBody = document.createElement('div');
    confirmationBody.className = 'chat-modal-body confirmation-body';
    confirmationBody.style.padding = '30px';
    confirmationBody.style.textAlign = 'center';
    
    // Add confirmation modal content
    confirmationBody.innerHTML = `
        <div class="confirmation-header" style="margin-bottom: 20px;">
            <h3 style="color: #0b192a; margin-bottom: 15px; font-weight: 600;">Privacy Policy Acknowledgement</h3>
            <p style="color: #5A6D7E; margin-bottom: 20px; line-height: 1.5;">
                Before proceeding to the inquiry form, please acknowledge that you have read and agree to our Privacy Policy.
            </p>
        </div>
        
        <div class="confirmation-checkbox" style="margin: 25px 0; text-align: left; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
            <div style="display: flex; align-items: flex-start; gap: 12px;">
                <input type="checkbox" id="privacyPolicyCheckbox" style="margin-top: 3px; width: 18px; height: 18px; cursor: pointer;">
                <div>
                    <label for="privacyPolicyCheckbox" style="cursor: pointer; font-weight: 500; color: #0b192a; margin-bottom: 5px; display: block;">
                        I have read and agree to the Privacy Policy
                    </label>
                    <p style="color: #5A6D7E; font-size: 14px; line-height: 1.4; margin: 0;">
                        By checking this box, you acknowledge that you have reviewed our 
                        <a href="policy.html" target="_blank" style="color: #0a3b7c; text-decoration: underline; font-weight: 500;">Privacy Policy</a> 
                        and consent to the collection and use of your personal information as described therein.
                    </p>
                </div>
            </div>
        </div>
        
        <div class="confirmation-buttons" style="display: flex; gap: 15px; justify-content: center; margin-top: 25px;">
            <button id="cancelButton" class="btn" style="
                padding: 10px 25px;
                background-color: #6c757d;
                color: white;
                border: none;
                border-radius: 5px;
                font-weight: 500;
                cursor: pointer;
                transition: background-color 0.3s ease;
            ">Cancel</button>
            <button id="proceedButton" class="btn" style="
                padding: 10px 25px;
                background-color: #0b192a;
                color: white;
                border: none;
                border-radius: 5px;
                font-weight: 500;
                cursor: not-allowed;
                opacity: 0.6;
                transition: all 0.3s ease;
            " disabled>Proceed to Form</button>
        </div>
        
        <div class="policy-link" style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e9ecef;">
            <p style="color: #5A6D7E; font-size: 14px; margin: 0;">
                Need to review the policy? 
                <a href="policy.html" target="_blank" style="color: #0a3b7c; text-decoration: underline; font-weight: 500;">
                    Read our full Privacy Policy here
                </a>
            </p>
        </div>
    `;
    
    confirmationContent.appendChild(confirmationBody);
    confirmationModal.appendChild(confirmationContent);
    document.body.appendChild(confirmationModal);
    
    // Get confirmation modal elements
    const privacyCheckbox = document.getElementById('privacyPolicyCheckbox');
    const proceedButton = document.getElementById('proceedButton');
    const cancelButton = document.getElementById('cancelButton');
    
    // Prevent body scroll when modal is open
    let expandTimer;
    let isExpanded = false;
    let isHovering = false;
    
    function preventBodyScroll(prevent) {
        if (prevent) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
    }
    
    // Function to expand the button
    function expandButton() {
        if (!isExpanded && !chatLogo.classList.contains('expanded')) {
            chatLogo.classList.add('expanded');
            isExpanded = true;
        }
    }
    
    // Function to shrink the button after delay
    function shrinkButton() {
        clearTimeout(expandTimer);
        expandTimer = setTimeout(function() {
            if (!isHovering) {
                chatLogo.classList.remove('expanded');
                isExpanded = false;
            }
        }, 2000); // 2-second delay
    }
    
    // Toggle proceed button state based on checkbox
    function updateProceedButton() {
        if (privacyCheckbox.checked) {
            proceedButton.disabled = false;
            proceedButton.style.cursor = 'pointer';
            proceedButton.style.opacity = '1';
            proceedButton.style.backgroundColor = '#0a3b7c';
        } else {
            proceedButton.disabled = true;
            proceedButton.style.cursor = 'not-allowed';
            proceedButton.style.opacity = '0.6';
            proceedButton.style.backgroundColor = '#0b192a';
        }
    }
    
    // Show confirmation modal
    function showConfirmationModal() {
        // Reset checkbox state
        privacyCheckbox.checked = false;
        updateProceedButton();
        
        // Show confirmation modal
        confirmationModal.style.display = 'flex';
        preventBodyScroll(true);
    }
    
    // Hide confirmation modal
    function hideConfirmationModal() {
        confirmationModal.style.display = 'none';
        preventBodyScroll(false);
    }
    
    // Open Microsoft Forms modal
    function openInquiryModal() {
        inquiryModal.style.display = 'flex';
        preventBodyScroll(true);
        
        // Remove notification badge after opening
        if (notificationBadge) {
            notificationBadge.style.display = 'none';
        }
    }
    
    // Event Listeners
    privacyCheckbox.addEventListener('change', updateProceedButton);
    
    proceedButton.addEventListener('click', function() {
        if (privacyCheckbox.checked) {
            hideConfirmationModal();
            openInquiryModal();
        }
    });
    
    cancelButton.addEventListener('click', function() {
        hideConfirmationModal();
    });
    
    // Close confirmation modal when clicking outside
    confirmationModal.addEventListener('click', function(e) {
        if (e.target === confirmationModal) {
            hideConfirmationModal();
        }
    });
    
    // Mouse enter event - expand immediately
    chatLogo.addEventListener('mouseenter', function() {
        isHovering = true;
        clearTimeout(expandTimer);
        expandButton();
    });
    
    // Mouse leave event - start delay before shrinking
    chatLogo.addEventListener('mouseleave', function() {
        isHovering = false;
        shrinkButton();
    });
    
    // Open confirmation modal when chat logo is clicked
    chatLogo.addEventListener('click', function(e) {
        e.stopPropagation();
        showConfirmationModal();
    });
    
    // Close Microsoft Forms modal when clicking outside
    inquiryModal.addEventListener('click', function(e) {
        if (e.target === inquiryModal) {
            inquiryModal.style.display = 'none';
            preventBodyScroll(false);
        }
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (confirmationModal.style.display === 'flex') {
                hideConfirmationModal();
            } else if (inquiryModal.style.display === 'flex') {
                inquiryModal.style.display = 'none';
                preventBodyScroll(false);
            }
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
    chatLogo.addEventListener('touchstart', function(e) {
        e.stopPropagation();
        this.style.transform = 'scale(0.95)';
    });

    chatLogo.addEventListener('touchend', function() {
        this.style.transform = '';
    });
    
    // Handle device orientation changes
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            if (confirmationModal.style.display === 'flex') {
                confirmationModal.style.display = 'none';
                setTimeout(function() {
                    confirmationModal.style.display = 'flex';
                }, 50);
            }
            if (inquiryModal.style.display === 'flex') {
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
            showConfirmationModal();
        },
        close: function() {
            hideConfirmationModal();
            inquiryModal.style.display = 'none';
            preventBodyScroll(false);
        },
        isOpen: function() {
            return confirmationModal.style.display === 'flex' || inquiryModal.style.display === 'flex';
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
    
    console.log('Chat inquiry system loaded successfully with privacy policy confirmation');
})();
