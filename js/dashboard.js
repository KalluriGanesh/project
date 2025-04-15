document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const profileSection = document.querySelector('.profile-section');
    const profileDropdown = document.getElementById('profile-dropdown');
    const logoutLink = document.getElementById('logout-link');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    // Sample Data (Replace with actual API calls in production)
    const userData = {
        name: "Alex Johnson",
        role: "Student",
        email: "alex.johnson@example.com",
        profilePic: "images/profile-placeholder.png",
        activeCourses: 4,
        pendingAssignments: 3,
        upcomingClasses: 2
    };
    
    const todaySchedule = [
        {
            time: "09:00 AM",
            course: "Mathematics 101",
            instructor: "Prof. Smith",
            room: "Virtual Room A"
        },
        {
            time: "02:00 PM",
            course: "Computer Science",
            instructor: "Dr. Lee",
            room: "Virtual Room B"
        }
    ];
    
    const courses = [
        {
            name: "Mathematics 101",
            code: "MATH-101",
            progress: 65,
            instructor: "Prof. Smith",
            nextClass: "Tomorrow, 09:00 AM"
        },
        {
            name: "Computer Science",
            code: "CS-201",
            progress: 40,
            instructor: "Dr. Lee",
            nextClass: "Today, 02:00 PM"
        },
        {
            name: "English Literature",
            code: "ENG-105",
            progress: 80,
            instructor: "Dr. Williams",
            nextClass: "Wednesday, 11:00 AM"
        },
        {
            name: "Physics",
            code: "PHY-202",
            progress: 30,
            instructor: "Prof. Brown",
            nextClass: "Friday, 10:00 AM"
        }
    ];
    
    const announcements = [
        {
            title: "Exam Schedule Update",
            content: "The final exams for all courses have been rescheduled to next week. Please check the updated timetable in the resources section.",
            date: "2 hours ago",
            course: "All Courses"
        },
        {
            title: "Assignment Submission Deadline Extended",
            content: "The deadline for Programming Assignment 2 has been extended by 3 days. New deadline is Friday, 5 PM.",
            date: "1 day ago",
            course: "Computer Science"
        },
        {
            title: "New Learning Materials Added",
            content: "Additional reading materials for Week 5 have been uploaded to the course resources.",
            date: "3 days ago",
            course: "Mathematics 101"
        }
    ];
    
    // Initialize Dashboard
    function initDashboard() {
        loadUserData();
        loadSchedule();
        loadCourses();
        loadAnnouncements();
        updateDateTime();
        setupEventListeners();
    }
    
    // Load User Data
    function loadUserData() {
        document.getElementById('username').textContent = userData.name;
        document.getElementById('user-role').textContent = userData.role;
        document.getElementById('profile-image').src = userData.profilePic;
        document.getElementById('dropdown-username').textContent = userData.name;
        document.getElementById('dropdown-role').textContent = userData.role;
        document.getElementById('active-courses').textContent = userData.activeCourses;
        document.getElementById('pending-assignments').textContent = userData.pendingAssignments;
        document.getElementById('upcoming-classes').textContent = userData.upcomingClasses;
        
        // Set greeting based on time of day
        const hour = new Date().getHours();
        const greetingName = userData.name.split(' ')[0];
        let greeting;
        
        if (hour < 12) {
            greeting = `Good morning, ${greetingName}`;
        } else if (hour < 18) {
            greeting = `Good afternoon, ${greetingName}`;
        } else {
            greeting = `Good evening, ${greetingName}`;
        }
        
        document.getElementById('greeting-name').textContent = greeting;
    }
    
    // Load Today's Schedule
    function loadSchedule() {
        const scheduleContainer = document.getElementById('today-schedule');
        
        if (todaySchedule.length === 0) {
            scheduleContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-calendar-times"></i>
                    <p>No classes scheduled for today</p>
                </div>
            `;
            return;
        }
        
        scheduleContainer.innerHTML = '';
        
        todaySchedule.forEach((item, index) => {
            const scheduleItem = document.createElement('div');
            scheduleItem.className = 'schedule-item fade-in';
            scheduleItem.style.animationDelay = `${index * 0.1}s`;
            
            scheduleItem.innerHTML = `
                <div class="schedule-time">${item.time}</div>
                <div class="schedule-course">
                    <h4>${item.course}</h4>
                    <p>${item.instructor} • ${item.room}</p>
                </div>
                <button class="join-btn">Join Now</button>
            `;
            
            scheduleContainer.appendChild(scheduleItem);
        });
    }
    
    // Load Courses
    function loadCourses() {
        const coursesGrid = document.getElementById('courses-grid');
        
        coursesGrid.innerHTML = '';
        
        courses.forEach((course, index) => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card fade-in';
            courseCard.style.animationDelay = `${index * 0.1}s`;
            
            courseCard.innerHTML = `
                <div class="course-header">
                    <h3>${course.name}</h3>
                    <span class="course-code">${course.code}</span>
                </div>
                <p class="instructor">${course.instructor}</p>
                <p class="next-class"><i class="fas fa-clock"></i> ${course.nextClass}</p>
                <div class="course-progress">
                    <div class="progress-container">
                        <div class="progress-bar" style="width: ${course.progress}%"></div>
                    </div>
                    <span>${course.progress}% Complete</span>
                </div>
                <div class="course-actions">
                    <a href="course-${course.code.toLowerCase()}.html" class="course-btn enter-btn">Enter Course</a>
                    <button class="course-btn materials-btn"><i class="fas fa-book-open"></i> Materials</button>
                </div>
            `;
            
            coursesGrid.appendChild(courseCard);
        });
    }
    
    // Load Announcements
    function loadAnnouncements() {
        const announcementsList = document.getElementById('announcements-list');
        
        announcementsList.innerHTML = '';
        
        announcements.forEach((announcement, index) => {
            const announcementItem = document.createElement('div');
            announcementItem.className = 'announcement-item fade-in';
            announcementItem.style.animationDelay = `${index * 0.1}s`;
            
            announcementItem.innerHTML = `
                <h4><i class="fas fa-exclamation-circle"></i> ${announcement.title}</h4>
                <p>${announcement.content}</p>
                <div class="announcement-meta">
                    <span>${announcement.course}</span>
                    <span>${announcement.date}</span>
                </div>
            `;
            
            announcementsList.appendChild(announcementItem);
        });
    }
    
    // Update Date and Time
    function updateDateTime() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        document.getElementById('datetime').textContent = now.toLocaleDateString('en-US', options);
        
        // Update every minute
        setTimeout(updateDateTime, 60000);
    }
    
    // Setup Event Listeners
    function setupEventListeners() {
        // Mobile Menu Toggle
        mobileMenuBtn.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
        
        // Profile Dropdown Toggle
        profileSection.addEventListener('click', function(e) {
            e.stopPropagation();
            profileDropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            profileDropdown.classList.remove('show');
        });
        
        // Logout
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real app, you would call your logout API here
            alert('Logging out... Redirecting to login page.');
            window.location.href = 'index.html';
        });
        
        // Search Functionality
        searchBtn.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
        
        // Join Class Buttons
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('join-btn')) {
                const courseName = e.target.closest('.schedule-item').querySelector('h4').textContent;
                alert(`Joining ${courseName} class...`);
                // In a real app, this would launch your virtual classroom
                window.location.href = 'classroom.html';
            }
        });
    }
    
    // Search Function
    function performSearch(query) {
        if (query.trim() === '') return;
        
        alert(`Searching for: ${query}`);
        // In a real app, you would call your search API here
    }
    initDashboard();
});