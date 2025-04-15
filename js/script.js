// Login/Register functionality
document.addEventListener('DOMContentLoaded', function() {
    // Login form submission
    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            
            fetch('php/login.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = 'classroom.html';
                } else {
                    alert(data.message);
                }
            });
        });
    }
    
    // Register form submission
    if (document.getElementById('registerForm')) {
        document.getElementById('registerForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            
            fetch('php/register.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Registration successful! Please login.');
                    window.location.href = 'index.html';
                } else {
                    alert(data.message);
                }
            });
        });
    }
    
    // Classroom functionality
    if (document.getElementById('logout')) {
        // Logout button
        document.getElementById('logout').addEventListener('click', function() {
            fetch('php/logout.php')
                .then(() => {
                    window.location.href = 'index.html';
                });
        });
        
        // Chat functionality
        const chatMessages = document.getElementById('chatMessages');
        const messageInput = document.getElementById('messageInput');
        
        document.getElementById('sendMessage').addEventListener('click', sendMessage);
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        function sendMessage() {
            const message = messageInput.value.trim();
            if (message) {
                // In a real app, you would send this to the server
                const messageElement = document.createElement('div');
                messageElement.textContent = `You: ${message}`;
                chatMessages.appendChild(messageElement);
                messageInput.value = '';
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Simulate response
                setTimeout(() => {
                    const responseElement = document.createElement('div');
                    responseElement.textContent = 'Teacher: Thanks for your message!';
                    chatMessages.appendChild(responseElement);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000);
            }
        }
        
        // Whiteboard functionality
        const canvas = document.getElementById('whiteboard');
        const ctx = canvas.getContext('2d');
        let isDrawing = false;
        
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseout', stopDrawing);
        
        document.getElementById('clearWhiteboard').addEventListener('click', function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
        
        function startDrawing(e) {
            isDrawing = true;
            draw(e);
        }
        
        function draw(e) {
            if (!isDrawing) return;
            
            ctx.lineWidth = document.getElementById('brushSize').value;
            ctx.lineCap = 'round';
            ctx.strokeStyle = document.getElementById('colorPicker').value;
            
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(e.offsetX, e.offsetY);
        }
        
        function stopDrawing() {
            isDrawing = false;
            ctx.beginPath();
        }
        
        // Video controls
        document.getElementById('micToggle').addEventListener('click', function() {
            this.textContent = this.textContent.includes('Off') ? 'Mic On' : 'Mic Off';
        });
        
        document.getElementById('cameraToggle').addEventListener('click', function() {
            this.textContent = this.textContent.includes('Off') ? 'Camera On' : 'Camera Off';
        });
        
        document.getElementById('shareScreen').addEventListener('click', function() {
            alert('Screen sharing functionality would be implemented here');
        });
    }
});