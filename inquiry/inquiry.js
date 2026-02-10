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
    
    // Create confirmation modal
    const confirmationModal = document.createElement('div');
    confirmationModal.className = 'confirmation-modal';
    confirmationModal.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.85);
        z-index: 10000000;
        justify-content: center;
        align-items: center;
    `;
    
    const confirmationContent = document.createElement('div');
    confirmationContent.className = 'confirmation-content';
    confirmationContent.style.cssText = `
        background: url('./dist/assets/Exterior.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        padding: 0;
        border-radius: 15px;
        max-width: 600px;
        width: 90%;
        text-align: center;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        border: none;
        position: relative;
        overflow: hidden;
    `;
    
    // Create content container with semi-transparent background
    const contentContainer = document.createElement('div');
    contentContainer.style.cssText = `
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 249, 250, 0.98) 100%);
        padding: 40px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `;
    
    // Header section
    const headerSection = document.createElement('div');
    headerSection.style.cssText = `
        text-align: center;
        margin-bottom: 30px;
        width: 100%;
    `;
    
    const confirmationIcon = document.createElement('div');
    confirmationIcon.innerHTML = '🔒';
    confirmationIcon.style.cssText = `
        font-size: 48px;
        margin-bottom: 15px;
        color: #0a3b7c;
    `;
    
    const confirmationTitle = document.createElement('h3');
    confirmationTitle.textContent = 'Privacy Policy Agreement';
    confirmationTitle.style.cssText = `
        margin: 0 0 10px 0;
        color: #0a3b7c;
        font-family: 'Arial', sans-serif;
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 0.5px;
    `;
    
    const titleDivider = document.createElement('div');
    titleDivider.style.cssText = `
        width: 60px;
        height: 3px;
        background: linear-gradient(to right, #0a3b7c, #1e88e5);
        margin: 0 auto 15px auto;
        border-radius: 2px;
    `;
    
    const confirmationSubtitle = document.createElement('p');
    confirmationSubtitle.textContent = 'Please review and accept our privacy terms to continue';
    confirmationSubtitle.style.cssText = `
        margin: 0;
        color: #5a6d7e;
        font-family: 'Arial', sans-serif;
        font-size: 14px;
        font-weight: 400;
    `;
    
    headerSection.appendChild(confirmationIcon);
    headerSection.appendChild(confirmationTitle);
    headerSection.appendChild(titleDivider);
    headerSection.appendChild(confirmationSubtitle);
    
    // Message section
    const messageSection = document.createElement('div');
    messageSection.style.cssText = `
        background: white;
        padding: 25px;
        border-radius: 12px;
        margin-bottom: 25px;
        width: 100%;
        border-left: 5px solid #0a3b7c;
        box-shadow: 0 5px 15px rgba(10, 59, 124, 0.1);
    `;
    
    const confirmationText = document.createElement('p');
    confirmationText.innerHTML = 'To ensure the protection of your personal information, we require you to acknowledge that you have read and agree to our <a href="policy.html" target="_blank" style="color: #0a3b7c; text-decoration: underline; font-weight: 600;">Privacy Policy</a> before proceeding to the inquiry form.';
    confirmationText.style.cssText = `
        margin: 0;
        color: #333;
        line-height: 1.7;
        font-family: 'Arial', sans-serif;
        font-size: 15px;
        text-align: left;
    `;
    
    messageSection.appendChild(confirmationText);
    
    // Checkbox section
    const checkboxSection = document.createElement('div');
    checkboxSection.style.cssText = `
        background: #f8f9fa;
        padding: 25px;
        border-radius: 10px;
        margin-bottom: 30px;
        width: 100%;
        border: 1px solid #e9ecef;
        text-align: left;
    `;
    
    const checkboxContainer = document.createElement('div');
    checkboxContainer.style.cssText = `
        display: flex;
        align-items: flex-start;
        gap: 15px;
    `;
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'privacyPolicyCheckbox';
    checkbox.style.cssText = `
        width: 22px;
        height: 22px;
        cursor: pointer;
        margin-top: 3px;
        flex-shrink: 0;
    `;
    
    const checkboxLabelContainer = document.createElement('div');
    
    const checkboxLabel = document.createElement('label');
    checkboxLabel.htmlFor = 'privacyPolicyCheckbox';
    checkboxLabel.innerHTML = '<strong>I have read and agree to the Privacy Policy</strong><br><span style="color: #6c757d; font-size: 13px; margin-top: 5px; display: block;">By checking this box, you acknowledge that you understand how your data will be processed.</span>';
    checkboxLabel.style.cssText = `
        font-family: 'Arial', sans-serif;
        color: #0a3b7c;
        cursor: pointer;
        user-select: none;
        font-size: 16px;
        line-height: 1.5;
        display: block;
    `;
    
    checkboxLabelContainer.appendChild(checkboxLabel);
    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(checkboxLabelContainer);
    checkboxSection.appendChild(checkboxContainer);
    
    // Button section
    const buttonSection = document.createElement('div');
    buttonSection.style.cssText = `
        display: flex;
        justify-content: center;
        gap: 15px;
        width: 100%;
        margin-top: 10px;
    `;
    
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.style.cssText = `
        padding: 14px 32px;
        background: white;
        color: #6c757d;
        border: 2px solid #dee2e6;
        border-radius: 8px;
        cursor: pointer;
        font-family: 'Arial', sans-serif;
        font-size: 15px;
        font-weight: 600;
        transition: all 0.3s ease;
        min-width: 130px;
    `;
    cancelButton.onmouseover = () => cancelButton.style.cssText = `
        padding: 14px 32px;
        background: #f8f9fa;
        color: #495057;
        border: 2px solid #adb5bd;
        border-radius: 8px;
        cursor: pointer;
        font-family: 'Arial', sans-serif;
        font-size: 15px;
        font-weight: 600;
        transition: all 0.3s ease;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        min-width: 130px;
    `;
    cancelButton.onmouseout = () => cancelButton.style.cssText = `
        padding: 14px 32px;
        background: white;
        color: #6c757d;
        border: 2px solid #dee2e6;
        border-radius: 8px;
        cursor: pointer;
        font-family: 'Arial', sans-serif;
        font-size: 15px;
        font-weight: 600;
        transition: all 0.3s ease;
        min-width: 130px;
    `;
    
    const proceedButton = document.createElement('button');
    proceedButton.textContent = 'Proceed to Form';
    proceedButton.style.cssText = `
        padding: 14px 32px;
        background: #0a3b7c;
        color: white;
        border: 2px solid #0a3b7c;
        border-radius: 8px;
        cursor: not-allowed;
        font-family: 'Arial', sans-serif;
        font-size: 15px;
        font-weight: 600;
        transition: all 0.3s ease;
        opacity: 0.6;
        min-width: 150px;
    `;
    
    // Initially disable proceed button
    proceedButton.disabled = true;
    
    // Store original styles for hover effect when enabled
    const originalProceedStyle = proceedButton.style.cssText;
    const hoverProceedStyle = `
        padding: 14px 32px;
        background: #08306b;
        color: white;
        border: 2px solid #08306b;
        border-radius: 8px;
        cursor: pointer;
        font-family: 'Arial', sans-serif;
        font-size: 15px;
        font-weight: 600;
        transition: all 0.3s ease;
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(10, 59, 124, 0.3);
        min-width: 150px;
    `;
    
    const enabledProceedStyle = `
        padding: 14px 32px;
        background: #0a3b7c;
        color: white;
        border: 2px solid #0a3b7c;
        border-radius: 8px;
        cursor: pointer;
        font-family: 'Arial', sans-serif;
        font-size: 15px;
        font-weight: 600;
        transition: all 0.3s ease;
        opacity: 1;
        min-width: 150px;
    `;
    
    buttonSection.appendChild(cancelButton);
    buttonSection.appendChild(proceedButton);
    
    // Assemble the content
    contentContainer.appendChild(headerSection);
    contentContainer.appendChild(messageSection);
    contentContainer.appendChild(checkboxSection);
    contentContainer.appendChild(buttonSection);
    confirmationContent.appendChild(contentContainer);
    confirmationModal.appendChild(confirmationContent);
    document.body.appendChild(confirmationModal);
    
    // Toggle proceed button based on checkbox
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            proceedButton.disabled = false;
            proceedButton.style.cssText = enabledProceedStyle;
            
            // Add hover effect when enabled
            proceedButton.onmouseover = () => {
                proceedButton.style.cssText = hoverProceedStyle;
            };
            proceedButton.onmouseout = () => {
                proceedButton.style.cssText = enabledProceedStyle;
            };
        } else {
            proceedButton.disabled = true;
            proceedButton.style.cssText = originalProceedStyle;
            proceedButton.onmouseover = null;
            proceedButton.onmouseout = null;
        }
    });
    
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
        
        // Reset checkbox state
        checkbox.checked = false;
        proceedButton.disabled = true;
        proceedButton.style.cssText = originalProceedStyle;
        proceedButton.onmouseover = null;
        proceedButton.onmouseout = null;
        
        // Show confirmation modal
        confirmationModal.style.display = 'flex';
        preventBodyScroll(true);
    });
    
    // Cancel button handler
    cancelButton.addEventListener('click', function() {
        confirmationModal.style.display = 'none';
        preventBodyScroll(false);
    });
    
    // Proceed button handler - only works when checkbox is checked
    proceedButton.addEventListener('click', function() {
        if (!checkbox.checked) return;
        
        // Close confirmation modal
        confirmationModal.style.display = 'none';
        
        // Open Microsoft Forms modal
        inquiryModal.style.display = 'flex';
        
        // Remove notification badge after opening
        if (notificationBadge) {
            notificationBadge.style.display = 'none';
        }
    });
    
    // Close confirmation modal when clicking outside the content
    confirmationModal.addEventListener('click', function(e) {
        if (e.target === confirmationModal) {
            confirmationModal.style.display = 'none';
            preventBodyScroll(false);
        }
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (confirmationModal.style.display === 'flex') {
                confirmationModal.style.display = 'none';
                preventBodyScroll(false);
            }
            if (inquiryModal.style.display === 'flex') {
                inquiryModal.style.display = 'none';
                preventBodyScroll(false);
            }
        }
    });
    
    // Close Microsoft Forms modal when clicking outside
    inquiryModal.addEventListener('click', function(e) {
        if (e.target === inquiryModal) {
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
            if (inquiryModal.style.display === 'flex') {
                // Refresh modal display after orientation change
                inquiryModal.style.display = 'none';
                setTimeout(function() {
                    inquiryModal.style.display = 'flex';
                }, 50);
            }
            if (confirmationModal.style.display === 'flex') {
                confirmationModal.style.display = 'none';
                setTimeout(function() {
                    confirmationModal.style.display = 'flex';
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
            confirmationModal.style.display = 'none';
            preventBodyScroll(false);
        },
        isOpen: function() {
            return inquiryModal.style.display === 'flex' || confirmationModal.style.display === 'flex';
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
    
    console.log('Chat inquiry system with confirmation modal loaded successfully');
})();
